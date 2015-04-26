var express = require('express');
var room = express.Router();
var utils = require('../utils');
var rc = require('../controllers/RoomCtrl');
var auth = require('../controllers/AuthCtrl');

/*
* GET rooms for discover page
* TODO:
* Query the DB for rooms within range
*/
room.get('/discover', function(req,res) {
    var lat = req.query.lat;
    var lng = req.query.lng;

    rc.discover(lat, lng)
    .then(function(rooms) {
        res.status(200).json(utils.envelope(rooms, null));
    })
    .fail(function(err) {
        res.status(err.code).json(null, err);
    });
});

/*
* GET room
* TODO:
* Query the DB
* Validate the user
* Check if user is within valid range
* Return new comments if valid auth tokens
*/
room.get('/:id', function(req, res) {
    var authToken = req.get('authorization');
    var rid = req.params.id;

    /* Auth and long lat check */
    auth.validByAuthToken(authToken)
    .then(function(user) {
        rc.getById(rid)
        .then(function(room) {
            res.json(utils.envelope(room, null));
        })
        .fail(function(err) {
            res.status(err.code).json(utils.envelope(null, err));
        });
    })
    .fail(function(err) {
        res.status(err.code).json(null, err);
    })

});

/*
* GET room members
* TODO:
* Query the DB
* Validate user authToken
*/
room.get('/:id/members', function(req,res) {
    var authToken = req.get('authorization');


    var data = [
        {
            "uid": "0603152c09e0d7e37ad35bf8105df067",
            "username": "tyler",
            "email": "tylerwaltze@gmail.com",
        }
    ];

    res.json(utils.envelope(data, null));
});

/*
* GET room comments
* TODO:
* Validate authToken or validate location
* Query DB
* Send response to envelope
*/
room.get('/:id/comments', function(req,res) {
    var authToken = req.body.authToken;
    var lat = req.params.lat;
    var lng = req.params.lng;

    var data = [
        {
            "cid": "bb5cc2bbd90a5d9bb81ce454d66d940c",
            "rid": "955d0efbfe995480798028ee9637f130",
            "author": {
                "uid": "0603152c09e0d7e37ad35bf8105df067",
                "username": "tyler",
                "email": "tylerwaltze@gmail.com",
            },
            "createdAt": "2015-03-21 09:30:26.123-05:00",
            "comment": "Hopefully Meerkat will do better than Josh's other recent investment"
        },
        {
            "cid": "bb5cc2bbd90a5d9bb81ce454d66d940c",
            "rid": "955d0efbfe995480798028ee9637f130",
            "author": {
                "uid": "0603152c09e0d7e37ad35bf8105df067",
                "username": "erik",
                "email": "erik@gmail.com",
            },
            "createdAt": "2015-03-22 09:30:26.123-05:00",
            "comment": "Looks like they also raised from Aleph? https://twitter.com/asknbid/status/579066396400693248"
        },
        {
            "cid": "bb5cc2bbd90a5d9bb81ce454d66d940c",
            "rid": "955d0efbfe995480798028ee9637f130",
            "author": {
                "uid": "0603152c09e0d7e37ad35bf8105df067",
                "username": "logan",
                "email": "logan@gmail.com",
            },
            "createdAt": "2015-03-22 09:45:26.123-05:00",
            "comment": "that was their $3.4m round from last year it seems"
        },
        {
            "cid": "bb5cc2bbd90a5d9bb81ce454d66d940c",
            "rid": "955d0efbfe995480798028ee9637f130",
            "author": {
                "uid": "0603152c09e0d7e37ad35bf8105df067",
                "username": "erik",
                "email": "erik@gmail.com",
            },
            "createdAt": "2015-03-22 10:45:26.123-05:00",
            "comment": "Just in time as the bubble is soon to pop. Where is the revenue coming from?"
        },
        {
            "cid": "bb5cc2bbd90a5d9bb81ce454d66d940c",
            "rid": "955d0efbfe995480798028ee9637f130",
            "author": {
                "uid": "0603152c09e0d7e37ad35bf8105df067",
                "username": "john",
                "email": "john@gmail.com",
            },
            "createdAt": "2015-03-22 11:30:26.123-05:00",
            "comment": "Where does the revenue come from with thousands of live eyeballs? For serious?"
        }
    ];

    res.json(utils.envelope(data, null));
});

/*
* POST room
* TODO:
* Add the room to the DB
*/
room.post('/', function(req, res) {
    var roomInfo = req.body; /* title, topic, type, lat, lng, radius */
    var authToken = req.get('authorization');
    auth.validByAuthToken(authToken)
    .then(function(user) {
        roomInfo.author = user._uid;
        rc.create(roomInfo)
        .then(function(room) {
            user.joinRoom(room.rid)
            .then(function() {
                res.json(utils.envelope(room, null))
            })
            .fail(function(err) {
                res.json(utils.envelope(null, err));
            });
        })
        .fail(function(err) {
            res.json(utils.envelope(null, err));
        })
    })
    .fail(function(err) {
        res.json(utils.envelope(null, err));
    });

});

/*
* UPDATE room
* TODO:
* DB Query to find room
* Authenticate the user
*/
room.post('/:id', function(req, res) {
    var authToken = req.body.authToken;
    var topic = req.params.topic;
    var radius = req.params.radius;

    var data =  {
        "rid": "955d0efbfe995480798028ee9637f130",
        "title": "Meerkat Raises $12M From Greylock At A $40M Valuation",
        "location": {
            "lat": 42.6915,
            "lng": -83.3876,
            "radius": 500
        },
        "author": {
            "uid": "0603152c09e0d7e37ad35bf8105df067",
            "username": "tyler",
            "email": "tylerwaltze@gmail.com",
        },
        "topic": {
            "type": "url",
            "content": "http://techcrunch.com/2015/03/20/live-now-meerkat-raises-12m-from-greylock-at-a-40m-valuation"
        },
        "members": 36,
        "newComments": 4,
        "member": true,
        "createdAt": "2015-03-21 09:30:26.123+07:00"
    };

    res.json(utils.envelope(data, null));

});

/*
* POST user to room
* TODO:
* Update the memberhsip relation
* Make sure the user is within the radius
*/
room.post('/:id/join', function(req, res) {
    var lat = req.body.lat;
    var lng = req.body.lng;
    var authToken = req.get('authorization');
    var rid = req.params.id;
    auth.validByAuthToken(authToken)
    .then(function(user) {
        rc.joinRoom(rid, user, lat, lng)
        .then(function(room) {
            res.status(200).json(utils.envelope(room, null));
        })
        .fail(function(err) {
            res.status(err.code).json(utils.envelope(null, err));
        })
    })
    .fail(function(err) {
        res.status(err.code).json(utils.envelope(null, err));
    })


});

/*
* POST archive a room
* TODO:
* Authenticate user
* Query DB
*/
room.post('/:id/archive', function(req,res) {
    var authToken = req.get('authorization');
    var rid = req.params.id;
    auth.validByAuthToken(authToken)
    .then(function(user) {
        user.archiveRoom(rid)
        .then(function() {
            res.status(200).json(utils.envelope([], null));
        })
        .fail(function() {
            res.status(err.status).json(utils.envelope(null, err));
        });
    })
    .fail(function(err) {
        res.status(err.status).json(itls.envelope(null, err));
    });
});


module.exports = room;
