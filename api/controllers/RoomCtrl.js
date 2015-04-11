var auth = require('./AuthCtrl');
var Room = require('../models/RoomModel');
var crypto = require('crypto');
var RoomCtrl = {};

/*
* TODO
* parse for type of content
*/

RoomCtrl.create = function (roomInfo, authToken, callback) {
    user = auth.validByAuthToken(authToken, function(err, user) {
        if(!err) {
            var room = new Room(roomInfo, user);
            var response = room.create();
            response.then(function() {
                var response = room.getIdTime();
                response.then(function(id) {
                    room.rid = id[0][0].rid;
                    room.createdAt = id[0][0].createdat;
                    callback(null, room);
                });
            }, function(err) {
                console.log(err);
                callback(err, null);
            });
        }
    });

}

module.exports = RoomCtrl;
