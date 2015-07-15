'use strict';
var Model		= require('../shared/Model');
var _			= require('underscore');
var validator	= require('../shared/validate');
var Q 			= require('q');
var err 		= require('../shared/errors');

var Comment = Model

_.extend(Comment.prototype, {
	idAttribute: 'cid',
	fetchStatement: 'SELECT * FROM comment_view WHERE cid = $1',

	fetch: function() {
		var self = this;
		return this.db.query(this.fetchStatement, [this.get(this.idAttribute)]).then(function(result) {
			if (_.isEmpty(result)) {
				return Q.reject(err.commentDoesNotExist);
			}
			var Room = require('./Room');
			var User = require('./User');
			var room = new Room({
				rid: result[0].rid,
				title: result[0].title,
				location: {
					lat: result[0].lat,
					lng: result[0].lng
				},
			});
			var user = new User({
				uid: result[0].uid,
				username: result[0].username,
				email: result[0].email
			});
			self.set({
				cid: result[0].cid,
				createdAt: result[0].createdAt,
				comment: result[0].comment,
				author: user,
				room: room
			});
			return;
		}).fail(function(err) {
			return Q.reject(err);
		})
	},

	toFrontend: function() {
		var data = {};
		var room = this.get('room');
		var user = this.get('author');
		data = {
			cid: this.get('cid'),
			comment: this.get('comment'),
			author: user.toJSON(),
			room: room.toJSON(),
			createdAt: this.get('createdAt')
		};
		return data;
	},

	fetchRoom: function () {
		var self = this;
		var Room = require('./Room');
		var room = new Room(this.get('room'));
		if (!room.isPartial()) return Q.resolve();
		return room.getForComment().then(function(roomObj) {
			self.set('room', roomObj);
			return;
		}).fail(function(err) {
			throw new Error('Error fetching the room');
		});
	},

	fetchAuthor: function () {
		var self = this;
		var User = require('./User');
		var user = new User(this.get('author'));
		if(!user.isPartial()) return Q.resolve();
		return user.fetch
	},

	create: function() {
		var self = this;
		if (!this.get('room') || !this.get('comment')) {
			console.log('hit');
			return Q.reject(err.incompleteForm);
		}
		var Room = require('./Room');
		this.set('room', new Room({rid: this.get('room')}));
		var params = [
			this.get('room').get('rid'),
			this.get('author').get('uid'),
			this.get('comment')];
		return this.db.query('INSERT INTO comments VALUES (md5(to_char(now(), \'HH:MI:SS\')), $1, $2, now()::timestamp, $3) RETURNING cid, createdat AS "createdAt"', params)
		.then(function(returnObj) {
			self.set('cid', returnObj[0].cid);
			self.set('createdAt', returnObj[0].createdAt);
			return;
		}).fail(function(err) {
			return Q.reject(err);
		});
	}

});

	
module.exports = Comment;