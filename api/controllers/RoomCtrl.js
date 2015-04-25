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
    var room = new Room(roomInfo);

    console.log(room)

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
        d.reject(err);
    })
    return d.promise;
}

RoomCtrl.getById = function(id) {
    var d = Q.defer();
    Room.getById
}

module.exports = RoomCtrl;
