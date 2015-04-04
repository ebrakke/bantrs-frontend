var db = require('../controllers/dbConnector');

function User(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
    this._uid;
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
User.prototype.update = function(){
    response = db.query('UPDATE users set username=?, password=?, email=? WHERE uid=$?', {replacements: [this.username,this.password,this.email,this._uid]});
}

// Create a user, update the uid of the User object
User.prototype.create = function(){
    // Insert the new user into the db
    var query = db.query('INSERT INTO users VALUES (md5(:username), :username, :password, :email)', {replacements: {'username':this.username,'password':this.password,'email':this.email}, type:'INSERT'});
    return query;
}

// Delete a user from the DB
User.prototype.delete = function(){
    response = db.query('DELETE FROM users WHERE users.uid = $1', [this._uid]);
}

// Get a User object by the username
User.getByUsername = function(username){
    // Send the query to the dbConnector
    var query = db.query("SELECT uid, username, email FROM users where username = ?", {replacements: [username]});
    return query;
}

// Get a User object by the uid
User.getById = function(uid){
    var query = db.query('SELECT id, username, email FROM users WHERE uid = ?', {replacements: [uid]});
    return query;
}

// Get a User object by the banstrsauth
User.getByAuthToken = function(bantrsauth){
    // var query = db.query('SELECT id, username, email FROM users WHERE uid = (select uid where banterauth = ? FROM auth)', {replacements: [bantrsauth]})
    var query = db.query('SELECT u.id, u.username, u.email FROM users u NATURAL JOIN auth WHERE u.bantrsauth = ?',{replacements:[banterauth]});
    return query;
})


module.exports = User;













