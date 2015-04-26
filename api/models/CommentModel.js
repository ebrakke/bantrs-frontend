var db = require('../controllers/dbConnector');
var Q = require('q');
var _ = require('lodash-node');
var um = require('./UserModel');

function Comment(commentData, user) {
    this.author = commentData.author;
    this.cid = commentData.cid;
    this.room = commentData.rid;
    this.comment = commentData.comment;
    this.createdAt = commentData.createdAt
}


Comment.prototype.create = function() {
    var d = Q.defer();
    var comment = this;
    var day = new Date(Date.now());
    rep = [
        this.room + this.author + day.getMilliseconds(),
        this.room,
        this.author,
        this.comment
    ];
    db.query("INSERT INTO comments VALUES (md5($1), $2, $3, now()::timestamp, $4) RETURNING cid, createdat AS \"createdAt\"", rep)
    .then(function (returnObj) {
        comment.cid = returnObj[0].cid;
        comment.createdAt = returnObj[0].createdAt;
        d.resolve();
    })
    .fail(function (err) {
        d.reject(err);
    })
    return d.promise;
}

Comment.prototype.getUserObj = function() {
    var d = Q.defer();
    var comment = this;
    um.getById(this.author)
    .then(function(user) {
        comment.author = user;
        d.resolve();
    }).fail(function(err) { d.reject(err)});
    return d.promise;
}

Comment.getById = function(id) {
    var d = Q.defer();
    db.query("SELECT cid, author, rid, comment, createdat AS \"createdAt\" FROM comments WHERE cid = $1", [id])
    .then(function(commentObj) {
        var comment = new Comment(commentObj[0]);
        d.resolve(comment);
    })
    .fail(function(err) {
        d.reject(err);
    })
    return d.promise;
}


var createComment = function(commentInfo) {
    return new Comment(commentInfo);
}


module.exports = Comment;
