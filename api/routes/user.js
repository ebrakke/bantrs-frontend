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
	userData = {
		username: "tyler", //Math.random().toString(32).slice(2),
		password: "password", //Math.random().toString(32).slice(2),
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
	var username = req.params.username;
	var password = req.params.password;
	var response = auth.validByUserPwd("tyler","password", function(err, response){
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

	uc.update(username, authToken, newInfo, function(err, user) {
		if (!err) {
			res.json(util.envelope(user, null));
		} else {
			res.json(util.envelope(null, err));
		}
	});
});

user.get('/auth/validate', function(req, res) {
	var username = req.params.username;
	var authToken = req.body.authToken;

	//Validate the user

	//On success
	var data = true;

	res.json(utils.envelope(data, null));
});

/*
* Get User
* TODO:
* run validation
*/

user.get('/:id', function(req, res) {
	var id = req.params.id;
	var authToken = req.body.authToken;

	uc.getByUsername(id, function (err, result) {
		if (!err) {
			res.json(utils.envelope(result,null));
		}
		else {
			res.json(utils.envelope(null, err));
		}
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
