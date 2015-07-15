'use strict';
var Collection = require('../shared/Collection');
var User	   = require('../models/User');
var _ 		   = require('underscore');

var Users = Collection.extend({
	idAttribute: 'uid',
	model: User,

	/* fetchUsers
	 * Given an rid, return a list of members as  User Objects
	 */
	fetchRoomUsers: function(rid) {
		var self = this;
		var objects = [];
		
		return this.db.query('SELECT u.uid, u.username, u.email FROM users u, membership m WHERE m.uid = u.uid AND m.rid = $1', [rid]).then(function(results) {
			_.each(results, function(user) {
				self.models.push(new User(user));
			});
			return;
		});
	},

	fetch: function() {
		var self = this;
		return this.db.query('SELECT uid, username, email FROM users WHERE uid IN(\'' + this.models.join('\',\'') + '\')').then(function(results) {
			self.models = [];
			_.each(results, function(user) {
				// Erase all of the uids from the list
				self.models.push(new User(user));
			});
			return;
		});
	}

});

module.exports = Users;