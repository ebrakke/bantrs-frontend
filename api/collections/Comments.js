var Collection 	= require('../shared/Collection');
var Comment 	= require('../models/Comment');
var _			= require('underscore');

var Comments = Collection.extend({
	model: Comment,

	/* fetchRoomComments
	 * Will return comment objects for a given room
	 */
	fetchRoomComments: function(rid) {
		var self = this;
		return this.db.query('SELECT cid, rid, uid, username, email, "createdAt", comment FROM comment_view WHERE rid = $1', [rid]).then(function(results) {
			var User = require('../models/User');
			_.each(results, function(result) {
				var user = new User({
					uid: result.uid,
					username: result.username,
					email: result.email
				});
				var comment = new Comment({
					cid: result.cid,
					createdAt: result.createdAt,
					comment: result.comment,
					rid: result.rid,
					author: user
				});
				self.models.push(comment);
			});
		});
	},

	toFrontend: function() {
		var data = []
		_.each(this.models, function(model) {
			var tmp = {};
			_.each(model.attributes, function(value, key) {
				if (key === 'author') {
					tmp.author = value.toJSON();
					return;
				}
				tmp[key] = value;
			})
			data.push(tmp);
		})
		return data;
	}
});

module.exports = Comments;