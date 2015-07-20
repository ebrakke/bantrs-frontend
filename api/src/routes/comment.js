var express = require('express');
var comment = express.Router();
var Comment = require('../models/Comment');
var format = require('../middlewares/format');
var auth = require('../middlewares/auth').auth;
var envelope = require('../middlewares/envelope');
var validate = require('../middlewares/validate');

var COMMENT_NOT_FOUND = {msg: 'Comment not found', code: 404};
var COMMENT_CREATE_ERROR = {msg: 'Comment created unsuccessfully', code: 500};
/* GET home page. */
comment.get('/:id', auth, function(req, res, next) {
    var comment = new Comment({cid: req.params.id});
    comment.get().then(function() {
        res.locals.data = comment;
        next();
    }).fail(function() {
        next(COMMENT_NOT_FOUND);
    });
}, format.getComment, envelope);

comment.post('/', auth, validate.comment, function(req, res, next) {
    var comment = new Comment(req.body);
    comment.author = res.locals.user.uid;
    comment.create().then(function() {
        return comment.get();
    }).then(function() {
        res.locals.data = comment;
        next();
    }).fail(function() {
        next(COMMENT_CREATE_ERROR);
    });
}, format.postComment, envelope);

module.exports = comment;
