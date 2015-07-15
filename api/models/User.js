'use strict';
var Model 	  = require('../shared/Model');
var _ 	  	  = require('underscore');
var bcrypt    = require('bcryptjs');
var validator = require('../shared/validate');
var crypto 	  = require('crypto');
var Q 		  = require('q');
var err 	  = require('../shared/errors.js');

var User = Model.extend({

	idAttribute: 'uid',
	fetchStatement: 'SELECT uid, username, email FROM users WHERE uid = $1',

	/* Create
	 * This will put a new user into the DB
	 */
	create: function() {
		var self = this;
		if (this.get(this.idAttribute)) {
			return; // If an ID is present, user is already created
		}
		var err = validator.user(this.toJSON());
		if (err) return Q.reject({code: 400, msg: err});
		var hashedPassword = bcrypt.hashSync(self.get('password'), 8);
		self.remove('password');
		return self.db.query('INSERT INTO users VALUES (md5($1), $1, $2, $3) RETURNING uid', [self.get('username'), hashedPassword, self.get('email')])
		.then(function(result) {
			var authToken = crypto.createHash('sha1').update(self.get('username')).update(Math.random().toString(32)).digest('hex');
			self.set(self.idAttribute, result[0].uid);
			self.set('authToken', authToken);
			return self.db.query('INSERT INTO auth VALUES ($1, $2)', [self.get(self.idAttribute), authToken]);
		}).fail(function(err) {
			throw new Error(err);
		});
	},

	/* Update
	 * Take in any fields to change and update them in the DB
	 */
	 update: function() {
	 	return;
	 },

	 /* toFrontend
	  * Return an object as the frontend expects it
	  */
	 toFrontend: function() {
	 	return _.pick(this.toJSON(), 'uid', 'username', 'email')
	 },

	/* fetchByUsername
	 * Get the uid and email for a user based on the username
	 */
	fetchByUsername: function() {
		var self = this;
		if (!this.get('username')){
			throw new Error('No username found');
		}
		return this.db.query('SELECT uid, email, username FROM users WHERE username = $1', [this.get('username')]).then(function(results) {
			if (!results[0]) {
				return Q.reject(err.userDoesNotExist);
			}
			self.set(results[0]);
		}).fail(function(err) {
			return Q.reject(err);
		});
	},

	/* getActiveRooms
	 * set activeRooms = list of rids
	 */
	getActiveRooms: function() {
		var self = this;
		var Rooms = require('../collections/Rooms');
		var rooms = new Rooms();
		return rooms.fetchUserActiveRooms(this.get('uid')).then(function() {
			self.set('rooms', rooms);
		});
	},

	getRooms: function() {
		var self = this;
		var Rooms = require('../collections/Rooms');
		var rooms = new Rooms();
		return this.db.query('SELECT v.*, m.active FROM view_room v, membership m WHERE v.rid = m.rid AND m.uid = $1', [this.get('uid')])
		.then(function(results) {
			self.set('rooms', new Rooms(results));
		}).fail(function(err) {
			console.log(err);
		})
	},

	/* visitRoom
	 * Update the last time the user visited a room
	 */
	visitRoom: function(rid) {
		return this.db.query('UPDATE membership SET last_active = current_timestamp WHERE uid = $1 AND rid = $2', [this.get(this.idAttribute), rid])
	},

	delete: function() {
		return this.db.query('DELETE FROM users * WHERE uid = $1', [this.get('uid')]);
	}
});



module.exports = User;
