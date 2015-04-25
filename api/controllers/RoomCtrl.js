var auth = require('./AuthCtrl');
var Room = require('../models/RoomModel');
var crypto = require('crypto');
var Q = require('q');


var RoomCtrl = {};

/*
* TODO
* parse for type of content
*/

RoomCtrl.create = function(roomInfo) {
    var d = Q.defer();
    var room = new Room(roomInfo, user);
    room.create()
    .then(function() {
        d.resolve(room);
    })
    .fail(function(err) {
        d.reject(err);
    })
    return d.promise;
}

RoomCtrl.getById = function(id) {
    var d = Q.defer();
    Room.getById
}

module.exports = RoomCtrl;
