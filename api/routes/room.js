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
        rid: '1',
        title: 'Snowpocalypse',
        author: 'BantrsAddict',
        date: new Date(2015, 2, 1, 12, 0, 0),
        topic: {
            content: 'http://www.reddit.com/r/Showerthoughts/comments/2zt1ga/luke_skywalker_was_an_angry_young_male_from_the/',
            type: 1
        },
        lat: 98.76,
        lng: 12.34,
        radius: 20,
        members: 2,
        newComments: 2
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
            uid: '1',
            email: 'bantrs@test.it',
            username: 'BantrsAddict'
        },
        {
            uid: 'hashed uid 2',
            email: 'email@example.com',
            username: 'thisUserNameIsMadeUp'
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
            cid: '5',
            rid: '1',
            author: {
                uid: 'hashed uid1',
                email: 'bantrs@test.it',
                username: 'BantrsAddict'
            },
            date: new Date(2015, 1, 1, 1, 0, 0),
            comment: 'This is an example comment'
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
            rid: '1',
            title: 'Snowpocalypse',
            author: 'BantrsAddict',
            date: new Date(2015, 2, 1, 12, 0, 0),
            lat: 98.76,
            lng: 12.34,
            radius: 20,
            members: 2,
            newComments: 2,
            contentType: 1
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
        rid: '89',
        title: 'This is the title of a new room',
        location: {
            lat: 42.3948,
            lng: -83.485,
            radius: 500
        },
        author: {
            uid: 'hashed user id',
            user: 'this is a user id',
            email: 'test@example.com'
        },
        topic: {
            type: 'url',
            content: 'http://example.com',
        },
        members: 0,
        newComments: 0,
        member: true,
        createdAt: '2015-03-21 09:30:26.123+07:00'
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

    var data = {
        rid: '1',
        title: 'Updated title of room',
        location: {
            lat: 42.3948,
            lng: -83.485,
            radius: 30
        },
        author: {
            uid: 'hashed user id',
            user: 'this is a user id',
            email: 'test@example.com'
        },
        topic: {
            type: 'url',
            content: 'http://example.com',
        },
        members: 0,
        newComments: 0,
        member: true,
        createdAt: '2015-03-21 09:30:26.123+07:00'
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
        rid: 'hashed id of joined room',
        title: 'Title of room you just joined',
        location: {
            lat: 42.3948,
            lng: -83.485,
            radius: 30
        },
        author: {
            uid: 'hashed user id',
            user: 'this is a user id',
            email: 'test@example.com'
        },
        topic: {
            type: 'url',
            content: 'http://example.com',
        },
        members: 0,
        newComments: 0,
        member: true,
        createdAt: '2015-03-21 09:30:26.123+07:00'
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
