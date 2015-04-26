var auth = require('./AuthCtrl');
var Room = require('../models/RoomModel');
var crypto = require('crypto');
var Q = require('q');
var Validator = require('../validate');
var e = require('./errors');


var RoomCtrl = {};

/*
* TODO
* parse for type of content
*/

RoomCtrl.create = function(roomInfo ) {
    var d = Q.defer();
    roomInfo.type = 'url';
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

RoomCtrl.getById = function(id, lat, lng) {
    var d = Q.defer();
    Room.getById(id)
    .then(function(room) {
        if(!room.inRange(lat, lng)) {
            d.reject(e.notInRange);
            return;
        }
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

RoomCtrl.discover = function(lat, lng) {
    var d = Q.defer();
    Room.discover(lat, lng)
    .then(function(rooms) {
        d.resolve(rooms);
    })
    .fail(function(err) {
        d.resolve(e.discover);
    });
    return d.promise;
}

module.exports = RoomCtrl;
