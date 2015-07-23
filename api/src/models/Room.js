var dbConnector = require('../helpers/dbConnector');
var createId = require('../helpers/utilities').createId;
var q = require('q');
var _ = require('lodash');

var Room = function(data) {
    this.db = new dbConnector();
    _.extend(this, data);
};

Room.prototype.get = function(uid) {
    var self = this;
    return this.db.query('SELECT * FROM view_room WHERE rid = $1', [this.rid])
    .then(function(result) {
        if (_.isEmpty(result)) {
            return q.reject('Invalid rid');
        }
        _.extend(self, result[0]);
        if (uid) {
            return self.db.query('SELECT rid FROM membership WHERE uid = $1 and rid = $2', [uid, self.rid])
            .then(function(result) {
                if (!_.isEmpty(result)) {
                    self.member = true;
                    return;
                }
                self.member = false;
                return;
            });
        }
    });
};

Room.prototype.create = function() {
    var self = this;
    this.rid = createId();
    var query = 'INSERT INTO rooms VALUES ($1, $2, $3, $4, $5, $6, $7, now()::timestamp) RETURNING createdat AS "createdAt"';
    var params = [this.rid, this.title, this.content, this.type, this.author.uid, this.lat, this.lng];
    return this.db.query(query, params).then(function(result) {
        self.createdAt = result[0].createdAt;
        return;
    });
};

Room.prototype.getComments = function() {
    var self = this;
    return this.db.query('SELECT * FROM view_comment WHERE rid = $1', [this.rid]).then(function(result) {
        return result;
    });
};

module.exports = Room;
