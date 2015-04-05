'use strict';

var bcrypt = require('bcryptjs');
var UserModel = require('../models/UserModel');

/* AuthCtrl Constructor */
var AuthCtrl = function () {};

/* Validate a supplied username and password */
AuthCtrl.validByUserPwd = function(username, password, callback) {
	var hash = UserModel.getHash(username);
	hash.then(function(result) {
		var hash = result[0][0].password
		if(bcrypt.compareSync(password, hash)){
			var response = UserModel.getByUsername(username);
			response.then(function(result) {
				var User = new UserModel(result[0][0]);
				var response = User.getAuthToken(User.uid);
				response.then(function(result) {
					User._auth = result[0][0].bantrsauth;
					callback(null,{user:{username:User.username, email:User.email, uid:User._uid,}, authToken:User._auth});
				})
			})
		} else {
			err = 'Invalid Username or Password';
			callback(err, null);
		}
	});
}

AuthCtrl.validByAuthToken = function(authtoken){
	var response = UserModel.getByAuthToken(authtoken);
	return response;
}

module.exports = AuthCtrl;
