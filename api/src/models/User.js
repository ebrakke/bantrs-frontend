var dbCtrl = require('../helpers/dbConnector');
var utilities = require('../helpers/utilities');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var _ = require('lodash');
var q = require('q');

var hashPassword = function(pwd) {
    return bcrypt.hashSync(pwd, 8);
};

var User = function(data) {
    this.db = new dbCtrl();
    _.extend(this, data);
};

User.prototype.create = function() {
    var user = this;
    user.password = hashPassword(user.password);
    user.uid = utilities.createId();
    var query = 'INSERT INTO users VALUES($1, $2, $3, $4)';
    var params = [user.uid, user.username, user.password, user.email];
    return this.db.query(query, params);
};

User.prototype.get = function() {
    var query;
    var params;
    var user = this;
    if (user.uid) {
        query = 'SELECT uid, username, email FROM users WHERE uid = $1';
        params = [user.uid];
    } else {
        query = 'SELECT uid, username, email FROM users WHERE username = $1';
        params = [user.username];
    }
    return this.db.query(query, params).then(function(result) {
        if (_.isEmpty(result)) {
            return q.reject('User not found');
        }
        _.extend(user, result[0]);
        return;
    });
};

User.prototype.update = function() {
    var self = this;
    var query;
    var params;
    if (this.password) {
        this.password = hashPassword(this.password);
        query = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE uid = $4';
        params = [this.username, this.email, this.password, this.uid];
    } else {
        query = 'UPDATE users SET username = $1, email = $2 WHERE uid = $3';
        params = [this.username, this.email, this.uid];
    }
    return this.db.query(query, params);
};

User.prototype.getRooms = function(active) {
    var self = this;
    var query;
    if (active) {
        query = 'SELECT rid FROM membership WHERE uid = $1 AND active = true';
    } else {
        query = 'SELECT vr.*, m.active FROM view_room vr, membership m WHERE vr.rid = m.rid AND m.uid = $1';
    }
    return this.db.query(query, [this.uid]).then(function(results) {
        if (active) {
            self.rooms = _.pluck(results, 'rid');
            return;
        }
        self.rooms = results;
        return;
    });
};

User.prototype.login = function() {
    var self = this;
    var query = 'SELECT u.uid, u.email, u.password, u.username, a.bantrsauth AS "authToken" FROM users u, auth a WHERE u.uid = a.uid AND u.username = $1';
    return this.db.query(query, [this.username]).then(function(response) {
        if (_.isEmpty(response)) {
            return q.reject();
        }
        if (!bcrypt.compareSync(self.password, response[0].password)) {
            return q.reject();
        }
        _.extend(self, response[0]);
        return;
    });
};

User.prototype.joinRoom = function(rid) {
    var self = this;
    return this.db.query('SELECT rid FROM membership WHERE uid = $1', [this.uid]).then(function(results) {
        var alreadyMember = _.pluck(results, 'rid');
        if (_.indexOf(alreadyMember, rid) === -1) {
            var query = 'INSERT INTO membership VALUES ($1, $2)';
            var params = [rid, self.uid];
            return self.db.query(query, params);
        }
        return;
    });
};

module.exports = User;
