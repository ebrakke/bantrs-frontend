var db = require('../controllers/dbConnector');
var Q = require('q');
var _ = require('lodash-node');
var utils = require('../utils')

function Room(roomInfo) {
    this.title = roomInfo.title;
    this.location = {lat: roomInfo.lat, lng: roomInfo.lng, radius: roomInfo.radius};
    this.author = roomInfo.author;
    this.topic = {type: roomInfo.type, content: roomInfo.topic};
    this.createdAt = roomInfo.createdAt;
    this._rid = roomInfo.rid;
}

/* Create a room */
Room.prototype.create = function() {
    var d = Q.defer();
    var room = this;
    var day = new Date(Date.now());
    rep = [this.title + this.author.uid + day.getDate(), this.title, this.topic.content, this.topic.type, this.author.uid, this.location.lat, this.location.lng, this.location.radius];
    db.query("INSERT INTO rooms VALUES (md5($1), $2, $3, $4, $5, $6, $7, $8, now()::timestamp) RETURNING rid, createdat", rep)
    .then(function(returnObj) {
        room._rid = returnObj[0].rid;
        room.createdAt = returnObj[0].createdat
        d.resolve();
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

/* Show members of a room */
Room.prototype.getMembers = function() {
    var d = Q.defer();
    db.query("SELECT uid FROM membership WHERE rid = $1", [this._rid])
    .then(function(userObjs) {
        var users = _.pluck(userObjs, 'uid');
        d.resolve(users);
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

/* Return a room object by ID */
Room.getById = function(id) {
    var d = Q.defer();
    db.query("SELECT rid, title, topic, topic_type AS type, author, lat, lng, radius, createdat AS \"createdAt\" FROM rooms WHERE rid = $1", [id])
    .then(function(roomObj) {
        var room = new Room(roomObj[0]);
        d.resolve(room);
    })
    .fail(function(err) {
        d.reject(err);
    })
    return d.promise;
}

Room.discover = function(lat, lng) {
    var d = Q.defer();
    db.query("SELECT rid, title, topic, topic_type AS type, author, lat, lng, radius, createdat AS \"createdAt\" FROM rooms WHERE abs(abs(lat) - abs($1)) < 0.1 AND abs(abs(lng) - abs($2)) < 0.1", [lat, lng])
    .then(function(roomObjs) {
        var rooms = [];
        _.forEach(roomObjs, function(room) {
            rooms.push(new Room(room));
        });
        _.filter(rooms, function(room) {
            return room.inRange(lat, lng);
        });
        d.resolve(rooms);
    })
    .fail(function(err) {
        d.resolve(err);
    })
    return d.promise;
}

/* Turn a room object into an API object */
Room.prototype.apiObj = function() {
    this.rid = this._rid;
    delete this._rid;
    return this;
}

Room.prototype.inRange = function(lat1, lng1) {
    var distance = utils.distance(lat1, lng1, this.location.lat, this.location.lng);
    return (distance <= this.location.radius);

}


module.exports = Room;
