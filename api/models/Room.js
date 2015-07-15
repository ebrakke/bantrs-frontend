'use strict';
var Model 	 = require('../shared/Model');
var _ 	  	 = require('underscore');
var validator = require('../shared/validate');
var errors	 = require('../shared/errors');

var Room = Model.extend({
	idAttribute: 'rid',
	fetchStatement: 'SELECT * FROM room_view WHERE rid = $1',

	fetch: function() {
		var self = this;
		return this.db.query(this.fetchStatement, [this.get('rid')]).then(function(response) {
			if (_.isEmpty(response)) return Q.reject(err.roomDoesNotExist);
			var User = require('./User');
			var user = new User({
				uid: response[0].uid,
				email: response[0].email,
				username: response[0].username
			});
			var attrs = _.omit(response[0], ['uid', 'email', 'username']);
			attrs.author = user;
			self.set(attrs);
		});
	},

	init: function(attrs, options) {
		console.log('Room init');
		attrs = attrs || {};
		if (attrs.uid) {
			var User = require('./User');
			var user = new User(_.pick(attrs, ['uid', 'email', 'username']));
			attrs = _.omit(attrs, ['uid', 'email', 'username']);
			attrs.author = user
		}
		this.attributes = attrs;
		console.log(attrs);
	},
	/* getComments
	 * return a list of comments objects
	 */
	getComments: function() {
		var self = this;
		var Comments = require('../collections/Comments');
		// Create the Comments collection
		var comments = new Comments()
		return comments.fetchRoomComments(this.get('rid')).then(function() {
			return comments.toFrontend();
		});
	},

	/* getForComment
	 * This will get room info for a comment model
	 */
	getForComment: function (rid) {
		var self = this;
		return this.db.query('SELECT rid, title, lat, lng FROM rooms WHERE rid = $1', [rid]).then(function(response) {
			return {
				rid: response[0].rid,
				title: response[0].title,
				location: {
					lat: response[0].lat,
					lng: response[0].lng,
				}
			}
		})
	},

	create: function() {
		var self = this;
		var params = [
			Math.random().toString(32),
			this.get('title'),
			this.get('topic').content,
			this.get('topic').type,
			this.get('author').get('uid'),
			this.get('location').lat,
			this.get('location').lng,
			this.get('location').radius]
		return this.db.query('INSERT INTO rooms VALUES (md5($1), $2, $3, $4, $5, $6, $7, $8, now()::timestamp) returning rid, createdat AS "createdAt"', params)
		.then(function(returnObj) {
			self.set('rid', returnObj[0].rid);
			self.set('createdAt', returnObj[0].createdAt);
			return;
		}).fail(function(err) {
			console.log(err);
			throw new Error('Error creating the room');
		});
	},

	getMembers: function() {
		var self = this;
		return this.db.query('SELECT u.uid, u.username, u.email FROM users u, membership m WHERE u.uid = m.uid AND m.rid = $1', [this.get('rid')])
		.then(function(users) {
			return users;
		}).fail(function(err) {
			throw new Error('Error fetching users');
		})
	} 
});



module.exports = Room;