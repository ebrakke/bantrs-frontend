// Declare the config object
var config = {};

// Add config elements
config.db = {};

config.db.username = '';
config.db.password = '';
config.db.host = '';
config.db.type = '';
config.db.name = '';

config.error = {};
config.error.invalidPassword = { msg: 'Invalid username or password', err: 401 };
config.error.usernameExists = { msg: 'Username already exists', err: 401 };
config.error.notAuthorized = { msg: 'User must be logged in', err: 401 };
config.error.userNotFound = { msg: 'Username not found', err: 401 };
config.error.invalidAuthToken = { msg: 'Invalid auth token', err:401 };


module.exports = config;
