var db = require('../models/dbConnector');

function User(){
    this.username;
    this.password;
    this.email;
    this._uid;
}

// Access the uid because it's private
User.prototype.getId(){
    return this._id;
}

// Query the DB for the rooms that a user's rooms
User.prototype.getRooms(username){
    response = db.query('SELECT r.room FROM users AS u NATURAL JOIN rooms as r WHERE u.username=$1;', [this.username]);
    return {'rooms': ['202cb962ac59075b964b07152d234b70', '250cf8b51c773f3f8dc8b4be867a9a02', '68053af2923e00204c3ca7c6a3150cf7']};
}

// Update a user object
User.prototype.update(){
    response = db.query('UPDATE users VALUES(username=$1, password=$2, email=$3) WHERE u.uid=$4', [this.username,this.password,this.email,this._uid]);
}

// Create a user, update the uid of the User object
User.prototype.create(username, password, email){
    this.username = username;
    this.password = password;
    this.email = email;
    response = db.query('INSERT INTO users VALUES(username=$1, password=$2, email=$3);', [this.username,this.password,this.email]);
    this.uid = ('SELECT uid FROM users WHERE users.username=$1', [this.username]);
}

// Delete a user from the DB
User.prototype.delete(){
    response = db.query('DELETE FROM users WHERE users.uid = $1', [this._uid]);
}

// Get a User object by the username
User.getByUsername(username){
    response = db.query('SELECT u.id, u.username, u.email FROM users as u WHERE u.username = $1', [this.username]);
    return {uid: '0603152c09e0d7e37ad35bf8105df067', username: 'tyler', email: 'tylerwaltze@gmail.com'};
}

// Get a User object by the uid
User.getById(uid){
    response = db.query('SELECT u.id, u.username, u.email FROM users as u WHERE u.uid = $1', [this._uid]);
    return {uid: '0603152c09e0d7e37ad35bf8105df067', username: 'tyler', email: 'tylerwaltze@gmail.com'};
}

module.exports = Users;
