var express = require('express');
var room = express.Router();
var utils = require('../utils');
/*
* GET room
* TODO:
* Query the DB
* Validate the user
* Check if user is within valid range
* Return new comments if valid auth tokens
*/
room.get('/:id', function(req, res) {

    var lat = req.params.lat;
    var lng = req.params.lng;
    var authToken = req.body.authToken;

    // Populate this data from the DB
    var data = {
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
            "data": "http://techcrunch.com/2015/03/20/live-now-meerkat-raises-12m-from-greylock-at-a-40m-valuation"
        },
        "members": 36,
        "newComments": 4,
        "member": true,
        "createdAt": "2015-03-21 09:30:26.123+07:00"
    };

    // Add metadata to the response
    res.json(utils.envelope(data, null));
});

/*
* GET room members
* TODO:
* Query the DB
* Validate user authToken
*/
room.get('/:id/members', function(req,res) {
    var authToken = req.body.authToken;

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
            "createdAt": "2015-03-21 09:30:26.123+07:00",
            "comment": "Hopefully Meerkat will do better than Josh's other recent investment"
        }
    ];

    res.json(utils.envelope(data, null));
});

/*
* GET rooms for discover page
* TODO:
* Query the DB for rooms within range
*/
room.get('/discover', function(req,res) {
    var lat = req.params.lat;
    var lng = req.params.lng;

    var data = [
        {
            "rid": "955d0efbfe995480798028ee9637f130",
            "title": "Meerkat Raises $12M At $40M Valuation",
            "location": {
                "lat": 42.349137,
                "lng": -71.095748,
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
        },
		{
            "rid": "f06b37ced98f420683ac8cf2ad661cde",
            "title": "Churro Ice Cream Sandwich",
            "location": {
                "lat": 42.349454,
                "lng": -71.099396,
                "radius": 500
            },
            "author": {
                "uid": "0603152c09e0d7e37ad35bf8105df067",
                "username": "tyler",
                "email": "tylerwaltze@gmail.com",
            },
            "topic": {
                "type": "media",
                "content": "https://c4.staticflickr.com/8/7146/6841661349_7840647f4b_b.jpg"
            },
            "members": 36,
            "newComments": 4,
            "member": true,
            "createdAt": "2015-03-20 09:30:26.123+07:00"
        },
		{
            "rid": "199ee3f689c470aabdbe659d33beea59",
            "title": "Obama imposes stricter standards on fracking",
            "location": {
                "lat": 42.348597,
                "lng": -71.102142,
                "radius": 500
            },
            "author": {
                "uid": "0603152c09e0d7e37ad35bf8105df067",
                "username": "tyler",
                "email": "tylerwaltze@gmail.com",
            },
            "topic": {
                "type": "url",
                "content": "http://www.theverge.com/2015/3/20/8266455/fracking-obama-regulations-hydraulic-drilling"
            },
            "members": 36,
            "newComments": 4,
            "member": true,
            "createdAt": "2015-03-18 09:30:26.123+07:00"
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
    var title = req.params.title;
    var topic = req.params.topic;
    var lat = req.params.lat;
    var lng = req.params.lng;
    var radius = req.params.radius;

    var data = {
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
    var lat = req.params.lat;
    var lng = req.params.lng;

    var data = {
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
            "data": "http://techcrunch.com/2015/03/20/live-now-meerkat-raises-12m-from-greylock-at-a-40m-valuation"
        },
        "members": 36,
        "newComments": 4,
        "member": true,
        "createdAt": "2015-03-21 09:30:26.123+07:00"
    };

    res.json(utils.envelope(data, null));

});

/*
* POST archive a room
* TODO:
* Authenticate user
* Query DB
*/
room.post('/:id/archive', function(req,res) {
    var authToken = req.body.authToken;

    res.json(utils.envelope(null, null));
});


module.exports = room;
