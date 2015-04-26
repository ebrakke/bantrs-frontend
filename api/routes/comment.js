var express = require('express');
var comment = express.Router();
var utils = require('../utils');
var cc = require('../controllers/CommentCtrl');
var rc = require('../controllers/RoomCtrl');
var auth = require('../controllers/AuthCtrl');

/*
* Create comment
* TODO:
* create comment
* store in DB
* return comment
*/

comment.post('/', function(req, res) {
    var authToken = req.body.authToken;
    var rid = req.body.rid;
    var commentData = req.body;

    auth.validByAuthToken(authToken)
    .then(function(user) {
        commentData.author = user.uid;
        cc.create(commentData)
    })
    // If user is authenticated
    var data = {
        "cid": "bb5cc2bbd90a5d9bb81ce454d66d940c",
        "room": {
            "rid": "955d0efbfe995480798028ee9637f130",
            "title": "Meerkat Raises $12M From Greylock At A $40M Valuation",
            "location": {
                "lat": 37.336382,
                "lng": -121.888049,
                "radius": 500
            },
        },
        "author": {
            "uid": "0603152c09e0d7e37ad35bf8105df067",
            "username": "tyler",
            "email": "tylerwaltze@gmail.com",
        },
        "createdAt": "2015-03-21 09:30:26.123+07:00",
        "comment": "Hopefully Meerkat will do better than Josh's other recent investment"
    };

    res.json(utils.envelope(data, null));
});

/*
* Get comment
* TODO:
* get comment from DB
* return comment
*/

comment.get('/:id', function(req, res) {

    // Find comment in DB

    //If found
    var data = {
        "cid": "bb5cc2bbd90a5d9bb81ce454d66d940c",
        "room": {
            "rid": "955d0efbfe995480798028ee9637f130",
            "title": "Meerkat Raises $12M From Greylock At A $40M Valuation",
            "location": {
                "lat": 37.336382,
                "lng": -121.888049
            },
        },
        "author": {
            "uid": "0603152c09e0d7e37ad35bf8105df067",
            "username": "tyler",
            "email": "tylerwaltze@gmail.com",
        },
        "createdAt": "2015-03-21 09:30:26.123+07:00",
        "comment": "Hopefully Meerkat will do better than Josh's other recent investment"
    };

    res.json(utils.envelope(data, null));

});

module.exports = comment;
