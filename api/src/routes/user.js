var express = require('express');
var user = express.Router();
var User = require('../models/User');
var format = require('../middlewares/format');
var envelope = require('../middlewares/envelope');
var createAuth = require('../middlewares/auth').createAuth;
var auth = require('../middlewares/auth').auth;
var _ = require('lodash');

var USER_NOT_FOUND = {msg: 'User does not exist', code: 404};
var LOGIN_ERROR = {msg: 'Invalid credentials', code: 401};
var CREATE_ERROR = {msg: 'An error occurred while create', code: 500};

/* GET a user's rooms */
user.get('/:username/rooms', function(req, res, next) {
    var user = new User({username: req.params.username});
    user.get().then(function() {
        return user.getRooms();
    }).then(function() {
        res.locals.data = user.rooms;
        next();
    }).fail(function() {
        next(USER_NOT_FOUND);
    });
}, format.getUserRooms, envelope);

/* GET a user by username */
user.get('/:username', function(req, res, next) {
    var user = new User({username: req.params.username});
    user.get().then(function() {
        return user.getRooms(true);
    }).then(function() {
        res.locals.data = user;
        next();
    }).fail(function() {
        next(USER_NOT_FOUND);
    });
}, format.getUser, envelope);

/* CREATE a new user */
user.post('/', function(req, res, next) {
    var user = new User(req.body);
    user.create().then(function() {
        res.locals.data = user;
        next();
    }).fail(function(err) {
        next(CREATE_ERROR);
    });
}, createAuth, format.postUser, envelope);

/* LOGIN */
user.post('/auth', function(req, res, next) {
    var user = new User(req.body);
    user.login().then(function() {
        res.locals.data = user;
        next();
    }).fail(function() {
        next(LOGIN_ERROR);
    });
}, format.postUserAuth, envelope);

/* UPDATE a user */
user.post('/me', auth, function(req, res, next) {
    var user = res.locals.user;
    _.extend(user, req.body);
    user.update().then(function() {
        res.locals.data = user;
        res.locals.updateAuth = true;
        next();
    }).fail(function() {
        next(CREATE_ERROR);
    });
}, createAuth, format.postUser, envelope);

module.exports = user;
