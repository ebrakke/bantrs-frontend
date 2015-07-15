var express = require('express');
var user = express.Router();
var User = require('../models/User');
var _ = require('underscore');
var requireAuthentication = require('../shared/middleware').requireAuthentication;
var parser = require('../shared/middleware').parser;
var userParserConfig = require('../shared/endpointFormats').user;

/*
* Create User
* TODO:
* Error Handling
*/

user.post('/', requireAuthentication, function(req, res, next) {
	/* FRONTEND NOTE: Must pass the data in as username, password, email */
	var userData = req.body;
	var user = new User(userData);
	user.create().then(function() {
		res.responseData = {};
		res.responseData.user = user.toFrontend();
		res.responseData.authToken = user.get('authToken');
		next()
	}).fail(function(err) {
		next(err);
	});
});

/*
* Authenticate User
* TODO:
* Error handling
*/
user.post('/auth', function(req, res, next) {
	/* FRONTEND: pass arguments as username, password */
	var Auth = require('../models/Auth');
	var auth = new Auth(req.body);
	auth.login().then(function() {
		res.locals.responseData = auth.toFrontend();
		next()
	}).fail(function(err) {
		next(err);
	});
});


/*
* Update User
* TODO:
* Authenticate, authenticate, authenticate
*/

user.post('/me', function(req, res) {
	//validate the user
	var authToken = req.get('authorization');
	var newInfo = req.body();
	var user = new User({authToken: authToken})
	user.auth().then(function() {

	})
});

user.get('/:username/rooms', function(req, res, next) {
	var username = req.params.username;
	var user = new User({username: username});
	user.fetchByUsername().then(function() {
		return user.getRooms();
	}).then(function() {
		res.locals.modelOrCollection = user.get('rooms');
		res.locals.parserConfiguration = userParserConfig.getUserRooms;
		next();
	}).fail(function(err) {
		next(err);
	})
}, parser);

/*
* Get User
* TODO:
* Error Handling
*/

user.get('/:username', /*requireAuthentication,*/ function(req, res, next) {
	var username = req.params.username;
	var user = new User({username: username});
	user.fetchByUsername().then(function() {
		return user.getActiveRooms();
	}).then(function() {
		res.locals.modelOrCollection = user;
		res.locals.parserConfiguration = userParserConfig.getUser;
		next()
	}).fail(function(err) {
		next(err);
	});
}, parser);

/*
* Delete User
* TODO:
* delete user from DB
* return status code
*/

user.delete('/me', function(req, res) {
	var authToken = req.get('authorization');
	var auth = new Auth({authToken: authToken});
	auth.validateAuthToken().then(function() {
		return auth.get('user').delete()
	}).then(function() {
		var data = {msg: 'success!'};
		sendData(res, data);
	}).fail(function(err) {
		sendData(res, null, err);
	});
});




module.exports = user;
