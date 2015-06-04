var db = require('../controllers/dbConnector');
var Q = require('q');
var _ = require('lodash-node');

/* Comment Constructor */
function Comment(commentData) {
    this.author = {uid: commentData.author, email: commentData.email, username: commentData.username} || commentData.author;
    this.cid = commentData.cid;
    this.room = commentData.rid || commentData.room;
    this.comment = commentData.comment;
    this.createdAt = commentData.createdAt;
}

/* Create a comment */
Comment.prototype.create = function() {
    var d = Q.defer();
    var comment = this;
    var day = new Date(Date.now());
    var rep = [
        this.room + this.author.uid + day.getMilliseconds(),
        this.room,
        this.author.uid,
        this.comment
    ];
    db.query('INSERT INTO comments VALUES (md5($1), $2, $3, now()::timestamp, $4) RETURNING cid, createdat AS \"createdAt\"', rep)
    .then(function (returnObj) {
        comment.cid = returnObj[0].cid;
        comment.createdAt = returnObj[0].createdAt;
        d.resolve();
    })
    .fail(function (err) {
        d.reject(err);
    });
    return d.promise;
};

/* Return the User Object of the comment author */
Comment.prototype.getUserObj = function() {
    var d = Q.defer();
    var comment = this;
    db.query('SELECT uid, username, email FROM users WHERE uid = $1', [this.author.uid || this.author])
    .then(function(user) {
        var OC = require('./objCreator');
        comment.author = OC.user(user);
        d.resolve();
    }).fail(function(err) { d.reject(err); });
    return d.promise;
};

/* Find a comment by the ID */
Comment.getById = function(id) {
    var d = Q.defer();
    db.query('SELECT cid, author, rid, comment, createdat AS \"createdAt\" FROM comments WHERE cid = $1', [id])
    .then(function(commentObj) {
        var comment = new Comment(commentObj[0]);
        d.resolve(comment);
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
};


module.exports = Comment;
