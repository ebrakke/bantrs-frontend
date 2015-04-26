error = {};

// User
error.invalidUser = { msg: 'Unable to create user', code: 400 };
error.invalidUserUpdate = { msg: 'Unable to update user', code: 400 };
error.invalidUserDelete = { msg: 'Unable to delete user', code: 500 };
error.invalidUsername = { msg: 'Username not found', code: 404 };
error.invalidUID = { msg: 'User ID not found', code: 404 };

error.invalidPassword = { msg: 'Invalid username or password', code : 400 };
error.usernameExists = { msg: 'Username already exists', code: 400 };
error.notAuthorized = { msg: 'User must be logged in', code: 401 };

// Room
error.invalidRoom = { msg: 'Unable to create room', code: 400 };
error.invalidRID = { msg: 'Room ID not found', code: 404 };
error.invalidGetRoomObjs = { msg: 'Unable to get room objects', code: 400 };
error.invalidGetRooms = { msg: 'Unable to get user\'s rooms ', code: 400 };

// Auth
error.invalidAuthToken = { msg: 'Unable to create auth token', code: 500 };
error.invalidAuthTokenUpdate = { msg: 'Unable to update auth token', code: 500 };

// Validation
error.invalidUserData = { msg: '', code: 400 };
error.invalidRoomData = { msg: '', code: 400 };

module.exports = error
