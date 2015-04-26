error = {};

error.invalidPassword = { msg: 'Invalid username or password', code : 401 };
error.usernameExists = { msg: 'Username already exists',code: 401 };
error.notAuthorized = { msg: 'User must be logged in',code: 401 };
error.userNotFound = { msg: 'Username not found',code: 401 };
error.invalidAuthToken = { msg: 'Invalid auth token',code:401 };
error.invalidUserData = { msg: '',code:401 };
error.invalidRoomData = { msg: '',code:401 };
error.notInRange = { msg: 'User not in range', code:401 };
error.discover = { msg: 'And error occured discovering pages', code:500 };

module.exports = error
