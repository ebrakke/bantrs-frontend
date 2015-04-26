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

RoomCtrl.create = function(roomInfo) {
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

// var test = function() {
//     roomInfo = {
//         title: 'Here is a room title',
//         topic: 'www.example.com',
//         author: '13b862a780828990bd0dafddee018909',
//         lat: '78.0983',
//         lng: '56.0997',
//         radius: '800',
//         type: 'url'
//     }
//     RoomCtrl.create(roomInfo)
//     .then(function(room) {
//         console.log(room);
//     })
//     .fail(function(err) {
//         console.log(err);
//     })

//     RoomCtrl.getById('a353f1048573f66457d9ce45210d1eff')
//     .then(function(room) {
//         console.log(room);
//     })
//     .fail(function(err) {
//         console.log(err)
//     })
// }

// test();

module.exports = RoomCtrl;
