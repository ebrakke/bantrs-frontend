var dbConnector = require('../helpers/dbConnector');
var createId = require('../helpers/utilities').createId;
var _ = require('lodash');
var q = require('q');

var Comment = function(data) {
    this.db = new dbConnector();
    _.extend(this, data);
};

Comment.prototype.create = function() {
    var self = this;
    this.cid = createId();
    var query = 'INSERT INTO comments VALUES ($1, $2, $3, now()::timestamp, $4) RETURNING createdat AS "createdAt"';
    var params = [this.cid, this.room, this.author, this.comment];
    return this.db.query(query, params).then(function(result) {
        self.createdAt = result[0].createdAt;
        return;
    });
};

Comment.prototype.get = function() {
    var self = this;
    return this.db.query('SELECT * FROM view_comment WHERE cid = $1', [this.cid]).then(function(response) {
        if (_.isEmpty(response)) {
            return q.reject();
        }
        _.extend(self, response[0]);
        return;
    });
};

module.exports = Comment;
