var express = require('express');
var comment = express.Router();
var Comment = require('../models/Comment');
var sendData = require('../shared/utils').sendData;
var Auth = require('../models/Auth');

/*
* Create comment
* TODO:
*/

comment.post('/', function(req, res) {
    var authToken = req.get('authorization');
    var auth = new Auth({authToken: authToken});
    var comment = new Comment(req.body);
    auth.validateAuthToken().then(function() {
        comment.set('author', auth.get('user'));
        return comment.create();
    }).then(function() {
        return comment.fetch();
    }).then(function() {
        sendData(res, comment.toJSON());
    }).fail(function(err) {
        sendData(res, null, err);
    });

});

/*
* Get comment
* TODO:
* get comment from DB
* return comment
*/

comment.get('/:id', function(req, res) {
    var authToken = req.get('authorization');
    var cid = req.params.id;
    var auth = new Auth({authToken: authToken});
    var comment = new Comment({cid: cid});
    auth.validateAuthToken().then(function() {
        return comment.fetch();
    }).then(function() {
        sendData(res, comment.toFrontend());
    }).fail(function(err) {
        sendData(res, null, err);
    });
});

module.exports = comment;
