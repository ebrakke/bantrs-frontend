var validate = require('validate.js');


/*  
* Validate inputs (create/update)
* Expects a data object (user, room, comment)
* returns error message if invalid, null if valid
*/
var Validator = {};


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
		    minimum: 4,
		    maximum: 14
		  }
		},

		email: {
		  presence: true,
		  email: true
		}
	}
	return validate(userObj, constraints);
}

/*
* Room Validation
* Fields: title, topic, topic_type, author, lat, lng, radius
*/ 
Validator.room = function (roomObj) {

	// Validate lat/long as floats
	var testLocation = [roomObj.location.lat, roomObj.location.lng];
	for (var i = 0;  i < 2; i++) {
		console.log(parseFloat(testLocation[i]))
		if (!parseFloat(testLocation[i])) {
			return 'Invalid lat/lng';
		}
	};

	// Validation constraints
	var constraints = {
		
		title: {
			presence: true,
			length: {
				minimum: 1,
				maximum: 100
			}
		},

		topic: {
			presence: true,
			length: {
				minimum: 1,
				maximum: 100
			}
		},

		type: {
			presence: true,
			inclusion: {
				within: {'url': '', 'photo': '', 'location': ''}
			}
		},

		radius: {
			presence: true,
			inclusion: {
				within: {'100m': 'block', '800m': 'neighborhood', '8000m': 'city'}
			}
		}
	}
	return validate(userObj, constraints);	
}

/*
* Comment Validation
* Fields: username, password, email
*/ 
// Validator.comment = function (commentObj) {

// }


module.exports = Validator;
