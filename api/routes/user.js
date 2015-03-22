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
        "uid": "0603152c09e0d7e37ad35bf8105df067",
        "username": "tyler",
        "authToken": "c6661bce231c16208b2c8bd8e6e17d8c51ef392ad3a5d61bc80bd9f4ada30e54"
    };

	res.json(utils.envelope(data, null));
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
* update user in DB
* return user
*/

user.post('/me', function(req, res) {
	//validate the user
	var authToken = req.body.authToken;
	var username = req.params.username;

	var newUsername = req.params.newUsername;
	var newPassword = req.params.newPassword;
	var newEmail = req.params.newEmail;

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
* get user from DB
* return user
*/

user.get('/:id', function(req, res) {
	var id = req.params.id;
	var authToken = req.body.authToken;

	var data = {
        "uid": "0603152c09e0d7e37ad35bf8105df067",
        "username": "tyler",
        "email": "tylerwaltze@gmail.com",
        "rooms": ["955d0efbfe995480798028ee9637f130", "3858f62230ac3c915f300c664312c63f"]
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

	var data = [
        {
            "rid": "955d0efbfe995480798028ee9637f130",
            "title": "Meerkat Raises $12M At $40M Valuation",
            "location": {
                "lat": 42.349137,
                "lng": -71.095748,
                "radius": 500
            },
            "author": {
                "uid": "0603152c09e0d7e37ad35bf8105df067",
                "username": "tyler",
                "email": "tylerwaltze@gmail.com",
            },
            "topic": {
                "type": "url",
                "content": "http://techcrunch.com/2015/03/20/live-now-meerkat-raises-12m-from-greylock-at-a-40m-valuation"
            },
            "members": 36,
            "newComments": 4,
            "member": true,
            "createdAt": "2015-03-21 09:30:26.123+07:00"
        },
		{
            "rid": "f06b37ced98f420683ac8cf2ad661cde",
            "title": "Churro Ice Cream Sandwich",
            "location": {
                "lat": 42.349454,
                "lng": -71.099396,
                "radius": 500
            },
            "author": {
                "uid": "0603152c09e0d7e37ad35bf8105df067",
                "username": "tyler",
                "email": "tylerwaltze@gmail.com",
            },
            "topic": {
                "type": "media",
                "content": "https://c4.staticflickr.com/8/7146/6841661349_7840647f4b_b.jpg"
            },
            "members": 36,
            "newComments": 4,
            "member": true,
            "createdAt": "2015-03-20 09:30:26.123+07:00"
        },
		{
            "rid": "199ee3f689c470aabdbe659d33beea59",
            "title": "Obama imposes stricter standards on fracking",
            "location": {
                "lat": 42.348597,
                "lng": -71.102142,
                "radius": 500
            },
            "author": {
                "uid": "0603152c09e0d7e37ad35bf8105df067",
                "username": "tyler",
                "email": "tylerwaltze@gmail.com",
            },
            "topic": {
                "type": "url",
                "content": "http://www.theverge.com/2015/3/20/8266455/fracking-obama-regulations-hydraulic-drilling"
            },
            "members": 36,
            "newComments": 4,
            "member": true,
            "createdAt": "2015-03-18 09:30:26.123+07:00"
        }
    ];

	res.json(utils.envelope(data, null));
});

module.exports = user;
