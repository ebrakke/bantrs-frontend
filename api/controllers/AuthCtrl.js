'use strict';

var bcrypt = require('bcryptjs');
var UserModel = require('../models/UserModel');

/* AuthCtrl Constructor */
var AuthCtrl = function () {};





AuthCtrl.validByUserPwd = function(username, password) {
	var hash = UserModel.getHash(username);
	if(bcrypt.compareSync(password, hash)){
		return UserModel.getAuthToken(username);
	} else {
		return false;
	}
}



AuthCtrl.validByAuthToken = function(authtoken){
	UserModel.getByAuthToken(Authtoken, function(err, response){
		if(err){
			return 'invalid';
		} else {
			return 'valid';
		}
	});
}
