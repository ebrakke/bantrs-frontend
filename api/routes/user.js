var express = require('express');
var user = express.Router();
var utils = require('../utils');
var uc = require('../controllers/UserCtrl');
var auth = require('../controllers/AuthCtrl');
var bcrypt = require('bcryptjs');

/*
* Create User
* TODO:
* Get the actual data from the body
*/

user.post('/', function(req, res) {
	/* FRONTEND NOTE: Must pass the data in as username, password, email */
	var userData = req.body;
	uc.create(userData, function(err, user){
		if (!err) {
			res.json(utils.envelope(200, user, null));
		} else {
		res.status(err.code).json(utils.envelope(err.code, null, err));
		}
	});
});

/*
* Authenticate User
* TODO:
* Pull the params from the request
*/
user.post('/auth', function(req, res) {
	/* FRONTEND: pass arguments as username, password */
	var userData = req.body;
	var response = auth.validByUserPwd(userData, function(err, response){
		if (!err){
			res.status(200).json(utils.envelope(200, response, null));
		} else {
			res.status(err.code).json(utils.envelope(err.code, null, err));
		}
	});
});


/*
* Update User
* TODO:
* Authenticate, authenticate, authenticate
*/

user.post('/me', function(req, res) {
	//validate the user
	var authToken = req.body.authToken;
	var newInfo = {}
	
	newInfo.newUsername = req.body.username;
	newInfo.newPassword = req.body.password;
	newInfo.newEmail = req.body.email;

	auth.validByAuthToken(authToken)
	.then(function(user) {
		uc.update(user, newInfo)
		.then(function() {
			res.json(utils.envelope(user, null))
		})
		.fail(function(err) {
			res.json(utils.envelope(null, err));
		});
	})
	.fail(function(err) {
		res.json(utils.envelope(null, err))
	});
});

user.get('/auth/validate', function(req, res) {
	var username = req.query.username;
	var authToken = req.query.authToken;

	auth.validByAuthToken(username, authToken, function(err, user) {
		if (!err){
			res.json(utils.envelope(true, null))
		} else {
			res.json(utils.envelope(null, err));
		}
	});
});

/*
* Get User
* TODO:
*/

user.get('/:id', function(req, res) {
	var id = req.params.id;
	var authToken = req.body.authToken;

	/* Test value */
	authToken = '703259e8b54c885683ea24079293f35e4413b4fd';

	auth.validByAuthToken(authToken, function(err, user) {

		// Get the user and rooms
	});
});

/*
* Delete User
* TODO:
* delete user from DB
* return status code
*/

user.delete('/:id', function(req, res) {
	var id = req.params.id;
	var authToken = req.body.authToken;

	res.json(utils.envelope({}, null));
});

/*
* Get User's Rooms
* TODO:
* get rooms from DB
* return rooms
*/

user.get('/:id/rooms', function(req, res) {
	var id = req.params.id;
	var authToken = req.body.authToken;

	res.json(utils.envelope(null));
});

module.exports = user;
