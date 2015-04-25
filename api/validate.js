var validate = require('validate.js');


var Validator = {};

/*  
* Validate user form input (create/update)
* Expects a user data object
* e.g. {username: 'bad', password: 'good', email: 'this@is.valid'}
*/
Validator.user = function (userData) {
	var constraints = {
		username: username,
		password: password,
		email: email
	}
	return validate(userData, constraints);
}

/*
* Validation Constraints
*/
var username = {
  presence: true,
  length: {
  	minimum: 4,
    maximum: 14,
    message: "must be between 4-14 characters"
  }
}

var password = {
  presence: true,
  length: {
    minimum: 4,
    maximum: 14,
    message: "must be between 4-14 characters"
  }
}

var email = {
  presence: true,
  email: true
}

module.exports = Validator;
