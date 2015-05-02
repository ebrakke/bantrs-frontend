var express = require('express');
var room = express.Router();
var sendData = require('../utils').sendData;
var rc = require('../controllers/RoomCtrl');
var cc = require('../controllers/CommentCtrl');
var auth = require('../controllers/AuthCtrl');
var _ = require('lodash-node');
var Q = require('q');

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
        sendData(res, rooms)
    })
    .fail(function(err) {
        sendData(res, null, err);
    });
});

room.get('/:id/members', function(req,res) {
    var authToken = req.get('authorization');
    var rid = req.params.id;
    auth.validByAuthToken(authToken)
    .then(function(user) {
        rc.getMembers(rid)
        .then(function(users) {
            sendData(res, users);
        })
        .fail(function(err) {
            sendData(res, null, err);
        });
    })
    .fail(function(err) {
        sendData(res, null, err);
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

    /* Auth check */
    auth.validByAuthToken(authToken).then(function(user) {
        user.visitRoom(rid);
        var room = rc.getById(rid)
        user.getActiveRooms().then(function() {
            room.then(function(room) {
                if(user.rooms.indexOf(rid) === -1) {
                    room.member = false;
                    room.active = false;
                    sendData(res, room);
                    return;
                }
                room.member = true;
                room.active = true;
                sendData(res, room);
                return;
            })
        }).fail(function(err) { console.log(err); sendData(res, null, err); });
    }).fail(function(err) { console.log(err); sendData(res, null, err); });
});

/*
* GET room comments
* TODO:
*/
room.get('/:id/comments', function(req,res) {
    var authToken = req.get('authorization');
    var rid = req.params.id;

    auth.validByAuthToken(authToken)
    .then(function(user) {
        rc.getByIdCompact(rid)
        .then(function(room) {
            room.getComments()
            .then(function(comments) {
                sendData(res, comments)
            }).fail(function(err) { console.log(err) })
        }).fail(function(err) { console.log(err) })
    });
});

/*
* POST room
* TODO:
*/
room.post('/', function(req, res) {
    var roomInfo = req.body; /* title, topic, type, lat, lng, radius */
    var authToken = req.get('authorization');
    auth.validByAuthToken(authToken)
    .then(function(user) {
        roomInfo.author = user.uid;
        rc.create(roomInfo)
        .then(function(room) {
            user.joinRoom(room.rid)
            .then(function() {
                sendData(res, room);
            })
            .fail(function(err) {
                sendData(res, null, err);
            });
        })
        .fail(function(err) {
            sendData(res, null, err);
        });
    })
    .fail(function(err) {
        sendData(res, null, err);
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
            sendData(res, room);
        })
        .fail(function(err) {
            sendData(res, null, err);
        });
    })
    .fail(function(err) {
        sendData(res, null, err);
    });
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
            sendData(res, {});
        })
        .fail(function(err) {
            console.log(err);
            sendData(res, null, err);
        });
    })
    .fail(function(err) {
        console.log(err);
        sendData(res, null, err);
    });
});


module.exports = room;
