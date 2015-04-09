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
	var userData = req.body;  //username, password, email
	console.log(userData);
	/* Test data */
	userData = {
		username: "erik",
		password: "password",
		email: 'some@test.email'
	}
	uc.create(userData, function(err, user){
		if (!err) {
			res.json(utils.envelope(user, null));
		} else {
		res.json(utils.envelope(null, err));
		}
	});
});

/*
* Authenticate User
* TODO:
* Pull the params from the request
*/
user.post('/auth', function(req, res) {
	var userData = {};
	userData.username = req.body.username;
	userData.password = req.body.password;
	/* Test Data */
	userData.username = 'erik';
	userData.password = 'newPassword';
	var response = auth.validByUserPwd(userData, function(err, response){
		if (!err){
			res.json(utils.envelope(response, null));
		} else {
			res.json(utils.envelope(null, err));
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
	var username = req.params.username;
	var newInfo = {}
	newInfo.newUsername = req.params.newUsername;
	newInfo.newPassword = req.params.newPassword;
	newInfo.newEmail = req.params.newEmail;

	/* Test Data */
	username = 'erik';
	authToken = '703259e8b54c885683ea24079293f35e4413b4fd';
	newInfo.password = 'newPassword';
	newInfo.email = 'someNew@test.email';

	uc.update(username, authToken, newInfo, function(err, user) {
		if (!err) {
			res.json(utils.envelope(user, null));
		} else {
			res.json(utils.envelope(null, err));
		}
	});
});

user.get('/auth/validate', function(req, res) {
	var username = req.query.username;
	var authToken = req.query.authToken;

	/* Testing Data */
	username = 'erik';
	authToken = '703259e8b54c885683ea24079293f35e4413b4fd';

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
