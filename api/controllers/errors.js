error = {};

error.invalidPassword = { msg: 'Invalid username or password', err: 401 };
error.usernameExists = { msg: 'Username already exists', err: 401 };
error.notAuthorized = { msg: 'User must be logged in', err: 401 };
error.userNotFound = { msg: 'Username not found', err: 401 };
error.invalidAuthToken = { msg: 'Invalid auth token', err:401 };

module.exports = error
