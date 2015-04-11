var db = require('../controllers/dbConnector');

function Room(roomInfo, userInfo) {
    this.title = roomInfo.title;
    this.location = {lat:roomInfo.lat, lng: roomInfo.lng, radius: roomInfo.radius};
    this.author = {uid: userInfo.uid, username: userInfo.username, email: userInfo.email};
    this.topic = {type: 'url', content: roomInfo.content};
    this.createdAt = roomInfo.createdAt;
    this.rid = roomInfo.rid;
}

Room.prototype.create = function() {
    var day = new Date(Date.now());
    rep = {id: this.title + this.author.uid + day.getDate(), title: this.title, topic: this.topic.content, topic_type:this.topic.type, author:this.author.uid, lat:this.location.lat, lng:this.location.lng, radius:this.location.radius};
    var query = db.query("INSERT INTO rooms VALUES (md5(:id), :title, :topic, :topic_type, :author, :lat, :lng, :radius, now()::timestamp)", {replacements: rep, type:'INSERT'});
    return query;
}

Room.prototype.getIdTime = function() {
    var query = db.query("SELECT rid,createdat FROM rooms WHERE title = ? AND author = ? AND lat = ? AND lng = ?", {replacements:[this.title, this.author.uid, this.location.lat, this.location.lng]});
    return query;
}

module.exports = Room;
