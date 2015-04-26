var express = require('express');
var user = express.Router();
var utils = require('../utils');
var uc = require('../controllers/UserCtrl');
var auth = require('../controllers/AuthCtrl');
var bcrypt = require('bcryptjs');
var _ = require('lodash-node');

/*
* Create User
* TODO:
* Get the actual data from the body
*/

user.post('/', function(req, res) {
	/* FRONTEND NOTE: Must pass the data in as username, password, email */
	var userData = req.body;
	uc.create(userData)
	.then(function(userAuth) {
		var apiUser = userAuth.user.apiObj();
		res.json(utils.envelope({user: apiUser, bantrsAuth: userAuth.auth}, null))
	})
	.fail(function(err) {
		res.json(utils.envelope(null, err));
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
	.then(function(userAuth) {
		var apiUser = userAuth.user.apiObj();
		res.json(utils.envelope({user: apiUser, bantrsAuth: userAuth.auth}, null));
	})
	.fail(function(err) {
		console.log(err);
		res.status(err.code).json(utils.envelope(null, err));
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
	var newInfo = {}

	newInfo = req.body;

	auth.validByAuthToken(authToken)
	.then(function(user) {
		uc.update(user, newInfo)
		.then(function(auth) {
			var apiUser = user.apiObj();
			if(auth){
				res.json(utils.envelope({user: apiUser, auth: auth}, null))
			} else {
				res.json(utils.envelope(apiUser, null))
			}
		})
		.fail(function(err) {
			console.log(err);
			res.json(utils.envelope(null, err));
		});
	})
	.fail(function(err) {
		console.log(err);
		res.json(utils.envelope(null, err))
	});
});

user.get('/:username/rooms', function(req, res) {
	var username = req.params.username;
	uc.getRoomObjects(username)
	.then(function(rooms) {
		_.forEach(rooms, function(room) {
			room = room.apiObj();
			room.active = true;
		});
		res.json(utils.envelope(rooms, null));
	})
	.fail(function(err) {
		res.json(utils.envelope(null, err));
	});
});

/*
* Get User
* TODO:
*/

user.get('/:username', function(req, res) {
	var username = req.params.username;
	uc.getByUsername(username)
	.then(function(user) {
		var apiUser = user.apiObj();
		res.json(utils.envelope(apiUser, null));
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
	var authToken = req.get('authorization');
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



module.exports = user;
