var db = require('../controllers/dbConnector');
var Q = require('q');

function Room(roomInfo) {
    this.title = roomInfo.title;
    this.location = {lat: roomInfo.lat, lng: roomInfo.lng, radius: roomInfo.radius};
    this.author = roomInfo.author;
    this.topic = {type: roomInfo.type, content: roomInfo.topic};
    this.createdAt = roomInfo.createdAt;
    this._rid = roomInfo.rid;
}

Room.prototype.create = function() {
    var d = Q.defer();
    var room = this;
    var day = new Date(Date.now());
    rep = [this.title + this.author.uid + day.getDate(), this.title, this.topic.content, this.topic.type, this.author.uid, this.location.lat, this.location.lng, this.location.radius];
    db.query("INSERT INTO rooms VALUES (md5($1), $2, $3, $4, $5, $6, $7, $8, now()::timestamp) RETURNING rid, createdat", rep)
    .then(function(returnObj) {
        room._rid = returnObj.rid;
        room.createdAt = returnObj.createdat
        d.resolve();
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

Room.getById = function(id) {
    var d = Q.defer();
    db.query("SELECT rid, title, topic, topic_type AS type, author, lat, lng, radius, createdat AS createdAt FROM rooms WHERE rid = $1", [id])
    .then(function(roomObj) {
        var room = new Room(roomObj);
        d.resolve(room);
    })
    .fail(function(err) {
        d.reject(err);
    })
    return d.promise;
}
module.exports = Room;
