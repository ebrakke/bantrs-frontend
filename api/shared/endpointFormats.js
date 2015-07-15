var _ = require('underscore');
var formats = {};
formats.user = {};

formats.user.getUser = {
	attrs: {
		uid: 'uid',
		username: 'username',
		email: 'email',
		rooms: {
			attrs: {rid: 'rid'},
			type: 'collection'
		}	
	},
	type: 'object'
}

formats.user.getUserRooms = {
	attrs: {
		rid: 'rid',
		title: 'title',
		location: {
			lat: 'lat',
			lng: 'lng',
			radius: 'radius'
		},
		author: {
			attrs: {
				uid: 'uid',
				username: 'username',
				email: 'email'
			},
			type: 'object'
		},
		members: 'members',
		archived: 'archived',
		createdAt: 'createdAt'
	},
	type: 'collection'
}

formats.user.postUser = {
	attrs: {
		user: {
			attrs: {
				uid: 'uid',
				username: 'username',
				email: 'email'
			},
			type: 'object'
		},
		authToken: 'authToken'
	},
	type: 'object'
};

formats.user.postUserAuth = formats.user.postUserUpdate = formats.user.postUser;

module.exports = formats;
