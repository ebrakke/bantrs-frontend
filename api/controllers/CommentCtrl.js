'use strict';

var Comment = require('../models/CommentModel');
var AuthCtrl = require('./AuthCtrl');
var uc = require('./UserCtrl');
var rc = require('./RoomCtrl');
var e = require('./errors');
var Q = require('q');
var Validator = require('../validate');
var _ = require('lodash-node');

/* CommentCtrl Constructor */
var CommentCtrl = function () {};


 /* Create a new comment
 * Input: commentData = {roomID, content}, authToken
 * Return: Comment = {cid, room, author, createdAt, comment}
 */
CommentCtrl.create = function(commentData) {
    var d = Q.defer();
    var comment = new Comment(commentData);
    /* Validate comment create fields */
    var validationFailed = Validator.comment(comment);
    if (validationFailed) {
        e.invalidCommentData.msg = validationFailed;
        d.reject(e.invalidCommentData, null);
        return d.promise;
    }

    /* Send create comment request */
    comment.create()
    .then(function() {
        rc.getByIdCompact(comment.room)
        .then(function(room) {
            comment.room = room;
            uc.getByIdCompact(comment.author.uid)
            .then(function(user) {
                comment.author = user;
                d.resolve(comment);
            })
            .fail(function(err) {
                d.reject(e.invalidUID);
            });
        })
        .fail(function(err) {
            d.reject(e.invalidRID);
        });
    })
    .fail(function(err) {
        d.reject(e.invalidComment);
    });
    return d.promise;
};


/* Get a comment
 * Input: id
 * Return: Comment = {cid, room, author, createdAt, comment}
 */
CommentCtrl.getById = function(id) {
    var d = Q.defer();
    Comment.getById(id)
    .then(function(comment) {
        rc.getByIdCompact(comment.room)
        .then(function(room) {
            comment.room = room;
            uc.getByIdCompact(comment.author)
            .then(function(user) {
                comment.author = user;
                d.resolve(comment);
            })
            .fail(function(err) {
                d.reject(e.invalidUID);
            });
        })
        .fail(function(err) {
            d.reject(e.invalidRID);
        });
    })
    .fail(function(err) {
        d.reject(e.invalidCID);
    });
    return d.promise;
};


module.exports = CommentCtrl;
