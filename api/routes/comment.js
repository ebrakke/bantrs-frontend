var express = require('express');
var comment = express.Router();
var utils = require('../utils');
var sendData = utils.sendData;
var cc = require('../controllers/CommentCtrl');
var rc = require('../controllers/RoomCtrl');
var auth = require('../controllers/AuthCtrl');

/*
* Create comment
* TODO:
*/

comment.post('/', function(req, res) {
    var authToken = req.get('authorization');
    var commentData = req.body;

    auth.validByAuthToken(authToken)
    .then(function(user) {
        user.getActiveRooms()
        .then(function() {
            if(user.rooms.indexOf(commentData.room) === -1) {
                err = {msg: 'User not active in this room', code: 401};
                sendData(res, null, err);
                return;
            }
            commentData.author = user.uid;
            cc.create(commentData)
            .then(function(comment) {
                sendData(res, comment);
            })

            /* Error handling */
            .fail(function(err) { sendData(res, null, err); });
        }).fail(function(err) { sendData(res, null, err); });
    }).fail(function(err) { sendData(res, null, err); });
});

/*
* Get comment
* TODO:
* get comment from DB
* return comment
*/

comment.get('/:id', function(req, res) {
    var cid = req.params.id;
    cc.getById(cid)
    .then(function(comment) {
        sendData(res, comment);
    })
    .fail(function(err) {
        sendData(res, null, err);
    });
});

module.exports = comment;
