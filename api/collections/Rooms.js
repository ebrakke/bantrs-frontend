var Collection 	= require('../shared/Collection');
var Room 		= require('../models/Room');
var _			= require('underscore');

var Rooms = Collection.extend({
	model: Room,

	fetchUserActiveRooms: function(uid) {
		var self = this;
		return this.db.query('SELECT rid FROM membership WHERE uid = $1 AND active = true', [uid]).then(function(results) {
			_.each(results, function(roomObj) {
				self.models.push(new Room(roomObj));
			});
			return;
		});
	},
});

module.exports = Rooms;