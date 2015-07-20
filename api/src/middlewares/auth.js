var Auth = require('../models/Auth');
var User = require('../models/User');

var UNAUTHORIZED = {msg: 'User is not authorized', code: 401};
var DB_FAILURE = {msg: 'An unknown issue has ocurred', code: 500};
exports.auth = function(req, res, next) {
    var authToken = req.get('authorization');
    if (!authToken) {
        next(UNAUTHORIZED);
        return;
    }
    var auth = new Auth();
    auth.validateAuthToken(authToken).then(function(user) {
        res.locals.user = new User(user);
        next();
    }).fail(function(err) {
        next(UNAUTHORIZED);
    });
};

exports.createAuth = function(req, res, next) {
    var auth = new Auth();
    auth.createAuth(res.locals.data.uid, res.locals.updateAuth).then(function(authToken) {
        res.locals.data.authToken = authToken;
        next();
    }).fail(function(err) {
        console.log(err);
        next(DB_FAILURE);
    });
};
