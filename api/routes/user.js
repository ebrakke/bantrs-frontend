var express = require('express');
var user = express.Router();
var utils = require('../utils');
var uc = require('../controllers/UserCtrl');
var bcrypt = require('bcryptjs');

/*
* Create User
* TODO:
* Get the actual data from the body
* Password hasing!
*/

user.post('/', function(req, res) {
	var userData = req.body;  //username, password, email

	userData = {
		username: Math.random().toString(32).slice(2),
		password: Math.random().toString(32).slice(2),
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
* Actually do authentication with DB
*/
user.post('/auth', function(req, res) {
	var username = req.params.username;
	var password = req.params.password;

	//Do authentication stuff here

	//On success
	var data = {
        "user": {
            "uid": "0603152c09e0d7e37ad35bf8105df067",
            "username": "tyler",
            "email": "tylerwaltze@gmail.com"
        },
        "authToken": "c6661bce231c16208b2c8bd8e6e17d8c51ef392ad3a5d61bc80bd9f4ada30e54"
    };

	res.json(utils.envelope(data, null));
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
	uc.update(username, newInfo, function(err, user) {
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
