var _ = require('lodash');

exports.getUser = function(req, res, next) {
    var data = res.locals.data;
    res.locals.data = _.pick(data, 'uid', 'username', 'email', 'rooms');
    next();
};

exports.getUserRooms = function(req, res, next) {
    var data = res.locals.data;
    var rooms = [];
    _.each(data, function(room) {
        rooms.push({
            rid: room.rid,
            title: room.title,
            location: {
                lat: room.lat,
                lng: room.lng,
            },
            author: {
                uid: room.uid,
                username: room.username,
                email: room.email
            },
            topic: {
                content: room.content,
                type: room.type
            },
            members: room.members,
            active: room.active,
            createdAt: room.createdAt
        });
    });
    res.locals.data = rooms;
    next();
};

exports.postUser = function(req, res, next) {
    var data = res.locals.data;
    res.locals.data = {
        user: _.pick(data, 'uid', 'username', 'email'),
        authToken: data.authToken
    };
    next();
};

exports.postUserAuth = exports.postUser;

exports.getComment = function(req, res, next) {
    var data = res.locals.data;
    res.locals.data = {
        cid: data.cid,
        room: {
            rid: data.rid,
            title: data.title,
            location: {
                lat: data.lat,
                lng: data.lng
            }
        },
        author: {
            uid: data.uid,
            username: data.username,
            email: data.email
        },
        createdAt: data.createdAt,
        comment: data.comment
    };
    next();
};

exports.postComment = exports.getComment;

exports.getRoom = function(req, res, next) {
    var data = res.locals.data;
    res.locals.data = {
        rid: data.rid,
        title: data.title,
        location: {
            lat: data.lat,
            lng: data.lng
        },
        author: {
            uid: data.uid,
            username: data.username,
            email: data.email
        },
        topic: {
            type: data.type,
            content: data.content
        },
        members: data.members,
        member: data.member,
        createdAt: data.createdAt
    };
    next();
};

exports.postRoom = function(req, res, next) {
    var data = res.locals.data;
    res.locals.data = {
        rid: data.rid,
        title: data.title,
        location: {
            lat: data.lat,
            lng: data.lng
        },
        author: _.omit(data.author, 'db'),
        topic: {
            type: data.type,
            content: data.content
        },
        members: data.members,
        member: true,  // Becuase the user that just created the room should be a member of the room
        createdAt: data.createdAt
    };
    next();
};

exports.getRoomComments = function(req, res, next) {
    var data = res.locals.data;
    var comments = [];
    _.each(data, function(comment) {
        comments.push({
            cid: comment.cid,
            rid: comment.rid,
            author: {
                uid: comment.uid,
                username: comment.username,
                email: comment.email
            },
            createdAt: comment.createdAt,
            comment: comment.comment
        });
    });
    res.locals.data = comments;
    next();
};
