var auth = require('./AuthCtrl');
var Room = require('../models/RoomModel');
var crypto = require('crypto');
var Q = require('q');
var Validator = require('../validate');
var uc = require('./UserCtrl');
var e = require('./errors');
var _ = require('lodash-node');


var RoomCtrl = {};

var isURL = function(s) {
    var urlregex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

    return urlregex.test(s);
};

/*
* TODO
* parse for type of content
*/

RoomCtrl.create = function(roomInfo) {
    var d = Q.defer();

    if (isURL(roomInfo.topic)) {
        roomInfo.type = 'url';
    } else {
        roomInfo.type = 'location';
    }

    var room = new Room(roomInfo);
    /* Validate room create fields */
    var validationFailed = Validator.room(room);
    if (validationFailed) {
        e.invalidRoomData.msg = validationFailed;
        d.reject(e.invalidRoomData, null);
        return d.promise;
    }

    /* Send create room request */
    room.create()
    .then(function() {
        d.resolve(room);
    })
    .fail(function(err) {
        d.reject(e.invalidRoom);
    })
    return d.promise;
}

RoomCtrl.getById = function(id) {
    var d = Q.defer();
    Room.getById(id)
    .then(function(room) {
        room.getMembers()
        .then(function(users) {
            room.members = users.length;
            d.resolve(room);
        })
        .fail(function(err) {
            d.resolve(err);
        });
    })
    .fail(function(err) {
        d.reject(e.invalidRID);
    })
    return d.promise;
}

/* Get all members of a room as user objects */
RoomCtrl.getMembers = function(rid) {
    var d = Q.defer();
    Room.getById(rid)
    .then(function(room) {
        room.getMembers()
        .then(function(users) {
            d.resolve(users);
        })
        .fail(function(err) {
            d.reject(e.invalidUID);
        });
    })
    .fail(function(err) {
        d.reject(e.invalidRID);
    });
    return d.promise;
}

/* Get a compact version of a room */
RoomCtrl.getByIdCompact = function(id) {
    var d = Q.defer();
    Room.getById(id)
    .then(function(room) {
        d.resolve(room)
    })
    .fail(function(err) {
        d.reject(e.invalidRID)
    })
    return d.promise;
}

/* Return all room objects that are in range of a lat, lng */
RoomCtrl.discover = function(lat, lng) {
    var d = Q.defer();
    Room.discover(lat, lng)
    .then(function(rooms) {
        var returnRooms = [];
        _.forEach(rooms, function(room) {
            room.getMembers().then(function(members) {
                room.members = members.length;
                returnRooms.push(room);
                if(returnRooms.length === rooms.length) d.resolve(returnRooms)
            })
        });
    })
    .fail(function(err) {
        d.resolve(e.discover);
    });
    return d.promise;
}

RoomCtrl.joinRoom = function(rid, user, lat, lng) {
    var d = Q.defer();
    Room.getById(rid)
    .then(function(room) {
        if(!room.inRange(lat, lng)) {
            d.reject(e.notInRange);
            return;
        }
        user.joinRoom(room.rid)
        .then(function() {
            d.resolve(room);
        })
        .fail(function(err) {
            d.reject(e.joinRoom);
        })
    })
    .fail(function(err) {
        d.reject(e.joinRoom);
    });
    return d.promise;
}

module.exports = RoomCtrl;
