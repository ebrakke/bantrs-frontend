'use strict';

var bcrypt = require('bcryptjs');
var UserModel = require('../models/UserModel');
var e = require('./errors');
var Q = require('q');

/* AuthCtrl Constructor */
var AuthCtrl = function () {};

/* Validate a supplied username and password */
AuthCtrl.validByUserPwd = function(userData) {
	var d = Q.defer();
	UserModel.getHash(userData.username)  // Grab the password hash from the DB
	.then(function(user) {
		if(!bcrypt.compareSync(userData.password, user.password)) {
			d.reject(e.invalidPassword);
			return;
		}
		UserModel.getByUsername(user.username)
		.then(function(user) {
			user.getAuthToken()
			.then(function(auth) {
				d.resolve({user: user, auth: auth});
			})
			.fail(function(err) {
				d.reject(err);
			});
		})
		.fail(function(err) {
			d.reject(err);
		});
	})
	.fail(function(err) {
		d.reject(err);
	});
	return d.promise;
}

AuthCtrl.validByAuthToken = function(authToken) {
	var d = Q.defer();
	if(!authToken) {
		d.reject(e.notAuthorized);
		return d.promise;
	}
	UserModel.getByAuthToken(authToken)
	.then(function(user) {
		d.resolve(user)
	})
	.fail(function(err) {
		d.reject(e.invalidAuthToken);
	});
	return d.promise;
}

module.exports = AuthCtrl;
