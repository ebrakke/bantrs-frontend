var express = require('express');
var user = express.Router();

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

  res.json({
  	uid: 'hashed uid',
  	authToken: 'thisIsAToken',
  	username: 'BantrsAddict'
  });
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

  res.json({
  	uid: 'hashed uid',
  	authToken: 'thisIsAToken',
  	username: 'BantrsAddict'
  });
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

  res.json({
  	uid: 'hashed uid',
  	// email: 'bantrs@test.it',  
  	username: 'BantrsAddict'
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

  res.json({
  	code: '200'
  });
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

  res.json({
  	rooms: [
  		{
  			rid: 'hashed rid',
  			title: 'Snowpocalypse',
  			author: 'BantrsAddict',
  			date: new Date(2015, 2, 1, 12, 0, 0),
  			lat: 9876,
  			lng: 1234,
  			radius: 20,
  			members: 2,
  			newComments: 2,
  			contentType: 1,
  			member: true
  		},
  		{
  			rid: 'hashed rid',
  			title: 'Bu Graduation',
  			author: 'BantrsAddict',
  			date: new Date(2015, 2, 1, 12, 0, 0),
  			lat: 9876,
  			lng: 1234,
  			radius: 50,
  			members: 2,
  			newComments: 2,
  			contentType: 1,
  			member: true
  		},
  	]
  });
});

module.exports = user;
