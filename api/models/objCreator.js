var Room = require('./RoomModel');
var Comment = require('./CommentModel');
var User = require('./UserModel');

var objCreator = function() {};

objCreator.room = function(roomInfo) {
    return new Room(roomInfo);
};

objCreator.comment = function(commentInfo) {
    return new Comment(commentInfo);
};

objCreator.user = function(userInfo) {
    return new User(userInfo);
};

module.exports = objCreator;
