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
  		{ 0: 'room object' },
  		{ 1: 'room object2' }
  	]
  });
});

module.exports = user;
