error = {};

error.invalidPassword = { msg: 'Invalid username or password', code : 401 };
error.usernameExists = { msg: 'Username already exists',code: 401 };
error.notAuthorized = { msg: 'User must be logged in',code: 401 };
error.userNotFound = { msg: 'Username not found',code: 401 };
error.invalidAuthToken = { msg: 'Invalid auth token',code:401 };

module.exports = error
