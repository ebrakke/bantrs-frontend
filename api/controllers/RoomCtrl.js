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
    Room.getById(id)
    .then(function(room) {
        d.resolve(room)
    })
    .then(function(err) {
        d.reject(err);
    })
    return d.promise;
}

var test = function() {
    // roomInfo = {
    //     title: 'Here is a room title',
    //     topic: 'www.example.com',
    //     author: '13b862a780828990bd0dafddee018909',
    //     lat: '78.0983',
    //     lng: '56.0997',
    //     radius: '800',
    //     type: 'url'
    // }
    // RoomCtrl.create(roomInfo)
    // .then(function(room) {
    //     console.log(room);
    // })
    // .fail(function(err) {
    //     console.log(err);
    // })

    RoomCtrl.getById('a353f1048573f66457d9ce45210d1eff')
    .then(function(room) {
        console.log(room);
    });
}

//test();

module.exports = RoomCtrl;
