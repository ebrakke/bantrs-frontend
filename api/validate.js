var validate = require('validate.js');


/*
* Validate inputs (create/update)
* Expects a data object (user, room, comment)
* returns error message if invalid, null if valid
*/
var Validator = {};

/*
 * Only return one error message
 */
var simpleError = function(errorObj) {
	console.log('[errorObj]', errorObj);

	if (errorObj) {
		for(first in errorObj) {
			console.log('first', errorObj[first]);
			return errorObj[first][0];
		}
	}
};

/*
* User Validation
* Fields: username, password, email
*/
Validator.user = function (userObj) {

	// Validation constraints
	var constraints = {
		username: {
			presence: true,
			length: {
				minimum: 4,
				maximum: 14
			}
		},

		password: {
			presence: true,
			length: {
				minimum: 4
			}
		},

		email: {
			presence: true,
			email: true
		}
	};

	return simpleError(validate(userObj, constraints));
}

/*
* Room Validation
* Fields: title, topic, topic_type, author, lat, lng, radius
*/
Validator.room = function (roomObj) {

	// Validation constraints
	var constraints = {

		title: {
			presence: true,
			length: {
				minimum: 1,
				maximum: 100
			}
		},

		'topic.content': {
			presence: true,
			length: {
				minimum: 1,
				maximum: 100
			}
		},

		'topic.type': {
			presence: true,
			inclusion: {
				within: {'url': '', 'photo': '', 'location': ''}
			}
		},

		'location.lat': {
			presence: true,
			numericality: {
				lessThanOrEqualTo: 90,
				greaterThanOrEqualTo: -90
			}
		},

		'location.lng': {
			presence: true,
			numericality: {
				lessThanOrEqualTo: 180,
				greaterThanOrEqualTo: -180
			}
		},

		'location.radius': {
			presence: true,
			inclusion: {
				within: {'100': 'block', '800': 'neighborhood', '8000': 'city'}
			}
		}
	};

	return simpleError(validate(roomObj, constraints));
}

/*
* Comment Validation
* Fields: username, password, email
*/
Validator.comment = function (commentObj) {
	var constraints = {
		comment: {
			presence: true,
			length: {
				// maximum: SOME NUMBER,
				minimum: 1
			}
		}
	};
	return simpleError(validate(commentObj, constraints));
}


module.exports = Validator;
