'use strict';

var CommentModel = require('../models/CommentModel');
var AuthCtrl = require('./AuthCtrl');
var e = require('./errors');


/* CommentCtrl Constructor */
var CommentCtrl = function () {}


 /* Create a new comment
 * Input: commentData = {roomID, content}, authToken
 * Return: Comment = {cid, room, author, createdAt, comment}
 */
CommentCtrl.create = function(commentData, authToken callback) {
    AuthCtrl.validByAuthToken(authToken, function(err, user) {
        if (err) { callback(err); }
        else {
            /* Send the request to create the comment */
            var Comment = new CommentModel(commentData, user);
            // attempt to create Comment
            Comment.create(function (err, response) {
                if (err) { callback(err); }
                else { callback(null, response); }
            });
        }
    }
    
}


/* Get a comment 
 * Input: id
 * Return: Comment = {cid, room, author, createdAt, comment}
 */
CommentCtrl.get = function(id, callback) {
    CommentModel.get(id, function (err, response) {
        if (err) { callback(err); }
        else { callback(response) }
    });
}

module.exports = CommentCtrl;
