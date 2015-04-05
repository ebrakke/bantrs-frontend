var db = require('../controllers/dbConnector');

function User(userData) {
    this.username = userData.username;
    this.password = userData.password;
    this.email = userData.email;
    this._uid = userData.uid;
    this._auth;
}

// Access the uid because it's private
User.prototype.getId = function() {
    var query = db.query('SELECT uid FROM users WHERE username = ?', {replacements: [this.username]})
    return query;
}

// Query the DB for the rooms that a user's rooms
User.prototype.getRooms = function(username) {
    var query = db.query('SELECT m.rid FROM users u, membership m WHERE m.uid = ?', {replacements: [this.uid]});
    return query;
}

// Update a user object
User.prototype.update = function() {
    if (this.password) {
        response = db.query('UPDATE users set username=?, password=?, email=? WHERE uid=$?', {replacements: [this.username,this.password,this.email,this._uid], type:'UPDATE'});
    } else {
        response = db.query('UPDATE users set username=?, email=? WHERE uid=?', {replacements: [this.username, this.email, this._uid], type:'UPDATE'});
    }
}
// Create a user, update the uid of the User object
User.prototype.create = function() {
    // Insert the new user into the db
    var query = db.query('INSERT INTO users VALUES (md5(:idValue), :username, :password, :email)', {replacements: {'username':this.username,'password':this.password,'email':this.email, 'idValue': Date.now() + this.username}, type:'INSERT'});
    return query;
}

// Delete a user from the DB
User.prototype.delete = function() {
    response = db.query('DELETE FROM users WHERE users.uid = ?', {replacements: [this._uid]});
}

User.prototype.getAuthToken = function() {
    var query = db.query('SELECT bantrsauth FROM auth WHERE uid = ?', {replacements: [this._uid]});
    return query;
}

//Create an entry for a new user and his Bantrs auth token
User.prototype.createAuthToken = function() {
    var query = db.query('INSERT INTO auth VALUES (?, ?)', {replacements: [this.uid, this.auth], type:'INSERT'});
    return query;
}

// Get a User object by the username
User.getByUsername = function(username) {
    // Send the query to the dbConnector
    var query = db.query("SELECT uid, username, email FROM users where username = ?", {replacements: [username]});
    return query;
}

// Get a User object by the uid
User.getById = function(uid) {
    var query = db.query('SELECT uid, username, email FROM users WHERE uid = ?', {replacements: [uid]});
    return query

}

// Get the stored hashed password of a user
User.getHash = function(username) {
    var query = db.query('SELECT password FROM users WHERE username = ?', {replacements: [username]});
    return query;
}

// Get a User object by the banstrsauth
User.getByAuthToken = function(bantrsauth){
    // var query = db.query('SELECT id, username, email FROM users WHERE uid = (select uid where banterauth = ? FROM auth)', {replacements: [bantrsauth]})
    var query = db.query('SELECT u.id, u.username, u.email FROM users u NATURAL JOIN auth a WHERE a.bantrsauth = ?',{replacements:[banterauth]});
    return query;
}

module.exports = User;
