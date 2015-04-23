var db = require('../controllers/dbConnector');

function Comment(commentData, user) {
    this.user = user;
    this._cid = commentData.cid;
    this._rid = commentData.rid;
    this.content = commentData.content
}

// Access the cid
Comment.prototype.get = function(callback) {
    var query = db.query('SELECT cid FROM comments WHERE username = ?', {replacements: [this.user.username]});
    callback(null, query);
}

Comment.prototype.create = function(callback) {
    var day = new Date(Date.now());
    rep = {
        id: this.rid + this.user.uid + day.getDate(),
        room: this.rid,
        comment: this.content,
        author: this.user,
        createdAt: day.getDate()
    };
    var query = db.query("INSERT INTO comments VALUES (md5(:id), :room, :comment, :author, :createdAt)",
        { replacements: rep, type:'INSERT' });
    callback(null, query);
}

module.exports = Comment;
