var db = require('../controllers/dbConnector');
var Q = require('q');

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

Comment.getRoomComments = function(rid) {
    var d = Q.defer();
    db.query("SELECT cid, author, rid, comment, createdat AS \"createdAt\" FROM comments WHERE rid = $1", [rid])
    .then(function(commentObjs) {
        var comments = [];
        _.forEach(commentObjs, function(commentInfo) {
            var comment = createComment(commentInfo)
            comments.push(comment);
        });
        d.resolve(comments);
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

var createComment = function(commentInfo) {
    return new Comment(commentInfo);
}


module.exports = Comment;
