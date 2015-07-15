'use strict';
var Model 	  = require('../shared/Model');
var _ 	  	  = require('underscore');
var bcrypt    = require('bcryptjs');
var crypto 	  = require('crypto');
var Q 		  = require('q');
var err 	  = require('../shared/errors.js');

var Auth = Model.extend({
	idAttribute: 'authToken',
	/* Validate an auth token
	 * If valid, set the objects user object to the proper uid
	 */
	validateAuthToken: function() {
		var self = this;
		return this.db.query('SELECT uid FROM auth WHERE bantrsauth = $1', [this.get(this.idAttribute)])
		.then(function(result) {
			if (_.isEmpty(result)) {
				return Q.reject(err.invalidAuthToken);
			}
			var User = require('./User')
			self.set('user', new User({uid: result[0].uid}));
			return;
		}).fail(function(err) {
			return Q.reject(err);
		});
	},

	login: function() {
		var self = this;
		if (!this.get('username') || !this.get('password')) return Q.reject(err.invalidCredentials);
		return this.db.query('SELECT u.uid, u.email, u.password, a.bantrsauth AS "authToken" FROM users u, auth a WHERE u.username = $1 AND u.uid = a.uid', [this.get('username')])
		.then(function(result) {
			if (_.isEmpty(result)) return Q.reject(err.invalidCredentials);
			var hashedPassword = result[0].password;
			var passwordsMatch = bcrypt.compareSync(self.get('password'), hashedPassword);
			if (!passwordsMatch) return Q.reject(err.invalidCredentials);
			// Create a new user object
			var User = require('./User');
			self.set('user', new User({uid: result[0].uid, username: self.get('username'), email: result[0].email}));
			self.set('authToken', result[0].authToken);
			self.remove('password');
			self.remove('username');
			return;
		}).fail(function(err) {
			return Q.reject(err);
		});
	},

	toFrontend: function() {
		var data = {};
		data.authToken = this.get('authToken');
		data.user = this.get('user').toFrontend();
		return data;
	}
});


module.exports = Auth;
