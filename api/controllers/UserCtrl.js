'use strict';


var UserModel = require('../models/UserModel.js');


/* UserCtrl Constructor */

 var UserCtrl = function () {}


 /* Post (create) user - ok to pass pw as argument? */

UserCtrl.prototype.create = function(email, password, username) {
	UserModel.create(email, password, username, function (err, user){
		if (err) { return next(err); }
		return user;
	});
};


/* Update user
	 @param {string[]} newInfo - new username, pw, email
*/

UserCtrl.prototype.update = function(authToken, username, newInfo) {
	UserModel.auth(authToken, username, function (err) {
		if (err) { return next(err); }
		// if no error, user authenticated succesfully
		UserModel.update(newInfo, function (err, user) {
			if (err) { next(err); }
			return user;
		});
	});
}
