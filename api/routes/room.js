var express = require('express');
var room = express.Router();

/*
 * GET room
 * TODO:
 * Query the DB
 * Validate the user
 * Check if user is within valid range
 * Return new comments if valid auth tokens
 * Send response to envelope()
 */
room.get('/:id', function(req, res) {

    var lat = req.params.lat;
    var lng = req.params.lng;
    var authToken = req.body.authToken;

    res.json({
        rid: 'hashed rid',
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
    });
});

/*
 * GET room members
 * TODO:
 * Query the DB
 * Validate user authToken
 * Send the response to an envelope()
 */
room.get('/:id/members', function(req,res) {
    var authToken = req.body.authToken;

    res.json([
        {
            uid: 'hashed uid',
    	    email: 'bantrs@test.it',
     	    username: 'BantrsAddict'
        },
        {
            uid: 'hashed uid 2',
            email: 'email@example.com',
            username: 'thisUserNameIsMadeUp'
        }
    ]);
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

    res.json([
        {
            cid: 'comment id1',
            rid: 'hashed rid',
            author: {
                uid: 'hashed uid1',
                email: 'bantrs@test.it',
                username: 'BantrsAddict'
                },
            date: new Date(2015, 1, 1, 1, 0, 0),
            comment: 'This is an example comment'
        }
    ]);
});

/*
 * GET rooms for discover page
 * TODO:
 * Query the DB for rooms within range
 * Send response to envelope()
 */
room.get('/discover', function(req,res) {
    var lat = req.params.lat;
    var lng = req.params.lng;

    res.json([
        {
            rid: 'hashed rid',
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
    ]);
});

/*
 * POST room
 * TODO:
 * Add the room to the DB
 * Send response to envelope()
 */
room.post('/', function(req, res) {
    var title = req.params.title;
    var topic = req.params.topic;
    var lat = req.params.lat;
    var lng = req.params.lng;
    var radius = req.params.radius;

    res.json({
        rid: 'hashed id of new room',
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
    });

});

/*
 * UPDATE room
 * TODO:
 * DB Query to find room
 * Authenticate the user
 * send response to envelope()
 */
room.post('/:id', function(req, res) {
    var authToken = req.body.authToken;
    var topic = req.params.topic;
    var radius = req.params.radius;

    res.json({
        rid: 'hashed id of updated room',
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
    });

});

/*
 * POST user to room
 * TODO:
 * Update the memberhsip relation
 * Make sure the user is within the radius
 * Send response to envelope()
 */
room.post('/:id/join', function(req, res) {
    var lat = req.params.lat;
    var lng = req.params.lng;

    res.json({
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
    });

});

/*
 * POST archive a room
 * TODO:
 * Authenticate user
 * Query DB
 * Send response to envelope()
 */
room.post('/:id/archive', function(req,res) {
    var authToken = req.body.authToken;

    res.json(null);
})
module.exports = room;
