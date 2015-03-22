var express = require('express');
var user = express.Router();
var utils = require('../utils');
/*
* Create User
* TODO:
* create user
* store in DB
* return user
*/

user.post('/', function(req, res) {
	// email, password, username
	var userData = req.body;

	var data = {
		uid: '1',
		authToken: 'thisIsAToken',
		username: 'BantrsAddict'
	};

	res.json(utils.envelope(data, null));
});

/*
* Update User
* TODO:
* update user in DB
* return user
*/

user.post('/:id', function(req, res) {
	var id = req.params.id;
	var authToken = req.body.authToken;
	var userData = req.body;

	var data = {
		uid: '1',
		authToken: 'thisIsAToken',
		username: 'BantrsAddict'
	};

	res.json(utils.envelope(data, null));
});

/*
* Get User
* TODO:
* get user from DB
* return user
*/

user.get('/:id', function(req, res) {
	var id = req.params.id;
	var authToken = req.body.authToken;

	var data = {
		uid: '1',
		email: 'bantrs@test.it',
		username: 'BantrsAddict'
	};

	res.json(utils.envelope(data, null));
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

	var data = {
		rooms: [
			{
				rid: '1',
				title: 'Snowpocalypse',
				author: {
					uid: '1',
					username: 'BantrsAddict'
				},
				date: new Date(2015, 2, 1, 12, 0, 0),
				topic: {
					content: 'http://www.reddit.com/r/Showerthoughts/comments/2zt1ga/luke_skywalker_was_an_angry_young_male_from_the/',
					type: 1
				},
				lat: 98.76,
				lng: 12.34,
				radius: 20,
				members: 2,
				newComments: 2,
				member: true
			},
			{
				rid: '2',
				title: 'Bu Graduation',
				topic: {
					content: 'http://imgur.com/neVk7fi',
					type: 1
				},
				author: {
					uid: '1',
					username: 'BantrsAddict'
				},
				date: new Date(2015, 2, 1, 12, 0, 0),
				lat: 9876,
				lng: 1234,
				radius: 50,
				members: 2,
				newComments: 2,
				member: true
			},
		]
	};

	res.json(utils.envelope(data, null));
});

module.exports = user;
