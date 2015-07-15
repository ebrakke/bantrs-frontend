var error = {};

error.invalidCredentials = {code: 422, msg: 'Invalid username or password'};
error.invalidAuthToken	 = {code: 401, msg: 'Invalid authorization token'};
error.userDoesNotExist	 = {code: 404, msg: 'User does not exist'};
error.roomDoesNotExist	 = {code: 404, msg: 'Room does not exist'};
error.commentDoesNotExist = {code: 404, msg: 'Comment does not exist'};
error.incompleteForm	= {code: 400, msg: 'The form information is complete'}
error.dbError			 = {code: 500, msg: 'There was an error with the server'};


module.exports = error;