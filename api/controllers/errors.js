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
error.joinRoom = { msg: 'Cannot join room', code: 400 };
error.notInRange = { msg: 'User not in range', code:401 };
error.discover = { msg: 'And error occured discovering pages', code:500 };

// Comment
error.invalidComment = { msg: 'Unable to create comment', code: 400 };
error.invalidCID = { msg: 'Comment ID not found', code: 404 };
error.invalidGetCommentObjs = { msg: 'Unable to get comment objects', code: 400 };
error.invalidGetComments = { msg: 'Unable to get room\'s comments ', code: 400 };

// Auth
error.invalidAuthToken = { msg: 'Invalid auth token', code: 400 };
error.invalidAuthTokenUpdate = { msg: 'Unable to update auth token', code: 500 };

// Validation
error.invalidUserData = { msg: '', code: 400 };
error.invalidRoomData = { msg: '', code: 400 };
error.invalidCommentData = { msg: '', code: 400 };

module.exports = error
