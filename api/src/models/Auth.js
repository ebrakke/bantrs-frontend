var dbConnector = require('../helpers/dbConnector');
var _ = require('lodash');
var q = require('q');
var bcrypt = require('bcryptjs');
var generateToken = require('../helpers/utilities').generateToken;
var Auth = function() {
    this.db = new dbConnector();
};

Auth.prototype.validateAuthToken = function(authToken) {
    return this.db.query('SELECT u.uid, u.username, u.email FROM users u, auth a WHERE u.uid = a.uid AND a.bantrsauth = $1', [authToken])
    .then(function(result) {
        if (_.isEmpty(result)) {
            return q.reject();
        }
        return result[0];
    });
};

Auth.prototype.createAuth = function(uid, update) {
    var authToken = generateToken();
    if (update) {
        return this.db.query('UPDATE auth SET bantrsauth = $1 WHERE uid = $2', [authToken, uid]).then(function() {
            return authToken;
        });
    }
    return this.db.query('INSERT INTO auth VALUES ($1, $2)', [uid, authToken]).then(function() {
        return authToken;
    });
};

module.exports = Auth;
