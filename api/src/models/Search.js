var dbCtrl = require('../helpers/dbConnector');
var utilities = require('../helpers/utilities');
var _ = require('lodash');

var Search = {};

Search.usernameOrEmail = function(fragment) {
    console.log(fragment);
    var db = new dbCtrl();
    var query = 'SELECT username, email FROM users WHERE (username LIKE $1||\'%\' OR email LIKE $1||\'%\') AND ' +
                '(SELECT count(*) FROM users WHERE username LIKE $1||\'%\' OR email LIKE $1||\'%\') <= 10';
    return db.query(query, [fragment]);
};

module.exports = Search;
