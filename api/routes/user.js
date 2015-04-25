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
			res.json(utils.envelope(user, null));
		} else {
		res.status(err.code).json(utils.envelope(null, err));
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
	auth.validByUserPwd(userData)
	.then(function(user) {
		res.json(utils.envelope(null, err));
	})
	.fail(function(err) {
		res.json(utils.envelope(err, null));
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


/*
* Get User
* TODO:
*/

user.get('/:id', function(req, res) {
	var id = req.params.id;
	var authToken = req.body.authToken;

	auth.validByAuthToken(authToken)
	.then(function(user) {
		res.json(utils.envelope(user, null));
	})
	.fail(function(err) {
		res.json(utils.envelope(null, err));
	})
});

/*
* Delete User
* TODO:
* delete user from DB
* return status code
*/

user.delete('/me', function(req, res) {
	var authToken = req.body.authToken;
	auth.validByAuthToken(auth)
	.then(function(user) {
		uc.delete(user)
		.then(function() {
			res.json(utils.envelope({}, null))
		})
		.fail(function(err) {
			res.json(utils.envelope(null, err));
		});
	})
	.fail(function(err) {
		res.json(utils.envelope(null, err));
	});
});

/*
* Get User's Rooms
* TODO:
* get rooms from DB
* return rooms
*/

user.get('/:username/rooms', function(req, res) {
	var username = req.params.username;
	uc.getRoomObjects(username)
	.then(function(rooms) {
		res.json(utils.envelope(rooms, null));
	})
	.fail(function(err) {
		res.json(utils.envelope(null, err));
	});
});

module.exports = user;
