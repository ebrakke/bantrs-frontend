var db = require('../controllers/dbConnector');
var Q = require('q');

function Comment(commentData, user) {
    this.author = commendData.author
    this.cid = commentData.cid;
    this.rid = commentData.rid;
    this.content = commentData.content
}

// Access the cid
Comment.prototype.get = function(callback) {
    var query = db.query('SELECT cid FROM comments WHERE username = ?', {replacements: [this.user.username]});
    callback(null, query);
}

Comment.prototype.create = function(callback) {
    var d = Q.defer();
    var comment = this;
    var day = new Date(Date.now());
    rep = [
        this.rid + this.author.uid + day.getMilliseconds(),
        this.rid,
        this.content,
        this.author.uid,
    ];
    db.query("INSERT INTO comments VALUES (md5($1), $2, $3, $4, now()::timestamp) RETURNING cid, createdat", rep)
    .then(function (returnObj) {
        comment.cid = returnObj[0].cid;
        comment.createdAt = returnObj[0].createdat;
        d.resolve();
    })
    .fail(function (err) {
        d.reject(err);
    })
    return d.promise;
}

module.exports = Comment;
