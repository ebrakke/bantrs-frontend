var db = require('../controllers/dbConnector');
var Q = require('q');
var _ = require('lodash-node');
var utils = require('../utils');

function Room(roomInfo) {
    this.title = roomInfo.title;
    this.location = {lat: roomInfo.lat, lng: roomInfo.lng, radius: roomInfo.radius};
    this.author = roomInfo.author;
    this.topic = {type: roomInfo.type || roomInfo.topic_type, content: roomInfo.topic};
    this.createdAt = roomInfo.createdAt || roomInfo.createdat;
    this.rid = roomInfo.rid;
    this.active = roomInfo.active;
}

/* Create a room */
Room.prototype.create = function() {
    var d = Q.defer();
    var room = this;
    var day = new Date(Date.now());
    var rep = [this.title + this.author + day.getDate(), this.title, this.topic.content, this.topic.type, this.author, this.location.lat, this.location.lng, this.location.radius];
    db.query("INSERT INTO rooms VALUES (md5($1), $2, $3, $4, $5, $6, $7, $8, now()::timestamp) RETURNING rid, createdat", rep)
    .then(function(returnObj) {
        room.rid = returnObj[0].rid;
        room.createdAt = returnObj[0].createdat;
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
    db.query("SELECT u.uid, u.email, u.username FROM users u, membership m WHERE u.uid = m.uid AND m.rid = $1", [this.rid])
    .then(function(userObjs) {
        var OC = require('./objCreator');
        var users = [];
        _.forEach(userObjs, function(user) {
            users.push(OC.user(user));
        });
        d.resolve(users);
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

Room.prototype.getComments = function() {
    var d = Q.defer();
    db.query("SELECT c.cid, c.rid, c.comment, c.createdat AS \"createdAt\", c.author, u.username, u.email FROM comments c, users u WHERE c.rid = $1 and c.author = u.uid ORDER BY createdat DESC", [this.rid])
    .then(function(commentInfo) {
        var comments = [];
        var OC = require('./objCreator');
        _.forEach(commentInfo, function(comment) {
            comments.push(OC.comment(comment));
        });
        d.resolve(comments);
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

/* Return all room objects that are in range of the lat, lng provided */
Room.discover = function(lat, lng) {
    var d = Q.defer();
    db.query("SELECT * FROM rooms WHERE abs(abs(lat) - abs($1)) < 0.1 AND abs(abs(lng) - abs($2)) < 0.1", [lat, lng])
    .then(function(roomObjs) {
        var rooms = [];
        _.forEach(roomObjs, function(room) {
            var room = new Room(room);
            rooms.push(room);
        });
        rooms = _.filter(rooms, function(room) {
            return room.inRange(lat, lng);
        });
        d.resolve(rooms);
    })
    .fail(function(err) {
        d.resolve(err);
    })
    return d.promise;
}

Room.prototype.inRange = function(lat1, lng1) {
    var distance = utils.distance(lat1, lng1, this.location.lat, this.location.lng);
    return (distance <= this.location.radius);
}


module.exports = Room;
