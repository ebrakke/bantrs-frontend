var db = require('../controllers/dbConnector');
var Q = require('q');

function User(userData) {
    this.username = userData.username;
    this.password = userData.password;
    this.email = userData.email;
    this._uid = userData.uid;
    this._auth;
}

// Access the uid because it's private
User.prototype.getId = function() {
    var dfd = Q.defer();
    var user = this;
    db.query('SELECT uid FROM users WHERE username = $1', [this.username])
    .then(function(uidObj) {
        user._uid = uidObj[0].uid;
        dfd.resolve();
    })
    .fail(function(err) {
        dfd.reject(err.error);
    });
    return dfd.promise;
}

// Query the DB for the rooms that a user's rooms
User.prototype.getRooms = function() {
    var dfd = Q.defer();
    var user = this;
    db.query('SELECT rid FROM membership WHERE uid = $1', [this.uid])
    .then(function(roomsList) {
        user.rooms = roomsList;
        dfd.resolve();
    })
    .fail(function(err) {
        dfd.reject(err);
    });
    return dfd.promise;
}

// Update a user object
User.prototype.update = function() {
    var dfd = Q.defer();
    if (this.password) {
        db.query('UPDATE users set username=$1, password=$2, email=$3 WHERE uid=$4', [this.username,this.password,this.email,this._uid])
        .then(function(res) {
            dfd.resolve();
        })
        .fail(function(err) {
            dfd.reject(err);
        });
        return dfd.promise;
    }

    db.query('UPDATE users set username=$1, email=$2 WHERE uid=$3', [this.username, this.email, this._uid])
    .then(function(res) {
        dfd.resolve();
    })
    .fail(function(err) {
        dfd.reject(err)
    });
    return dfd.promise;
}
// Create a user, update the uid of the User object
User.prototype.create = function() {
    var dfd = Q.defer();
    var user = this;
    // Insert the new user into the db
    db.query('INSERT INTO users VALUES (md5($1), $2, $3, $4) RETURNING uid', [Date.now() + this.username,this.username,this.password,this.email])
    .then(function(uidObj) {
        user._uid = uidObj[0].uid;
        dfd.resolve();
    })
    .fail(function(err) {
        dfd.reject(err);
    });
    return dfd.promise;
}

// Delete a user from the DB
User.prototype.delete = function() {
    db.query('DELETE FROM users * WHERE users.uid = $1', [this._uid])
}

User.prototype.getAuthToken = function() {
    var dfd = Q.defer();
    var user = this;
    db.query('SELECT bantrsauth FROM auth WHERE uid = $1', [this._uid])
    .then(function(authObj) {
        user._auth = authObj[0].bantrsauth;
        dfd.resolve()
    })
    .fail(function(err) {
        dfd.reject(err);
    });
    return dfd.promise;
}

//Create an entry for a new user and his Bantrs auth token
User.prototype.createAuthToken = function() {
    var dfd = Q.defer();
    var user = this;
    db.query('INSERT INTO auth VALUES ($1, $2) RETURNING bantrsauth', [this._uid, this._auth])
    .then(function(authObj) {
        dfd.resolve();
    })
    .fail(function(err) {
        dfd.reject(err)
    });
    return dfd.promise;
}

// Get a list of active rooms the user is a part of
User.prototype.getActiveRooms = function() {
    var dfd = Q.defer();
    var user = this;
    db.query('SELECT rid FROM memberships WHERE uid = $1 AND active = True', [this.uid])
    .then(function(roomList) {
        user.rooms = roomList;
        dfd.resolve()
    })
    .fail(function(err) {
        dfd.reject(err);
    });
    return dfd.promise;
}

// Get a User object by the username
User.getByUsername = function(username) {
    var dfd = Q.defer();
    // Send the query to the dbConnector
    db.query("SELECT uid, username, email FROM users where username = $1", [username])
    .then(function(userObj) {
        if(userObj[0].length === 0) dfd.reject('No user found'); return;
        dfd.resolve(new User(userObj[0]));
    })
    .fail(function(err) {
        dfd.reject(err);
    });
    return dfd.promise;
}


// Get a User object by the uid
User.getById = function(uid) {
    var dfd = Q.defer();
    db.query('SELECT uid, username, email FROM users WHERE uid = $1', [uid])
    .then(function(userObj) {
        if(userObj[0].length === 0) dfd.reject('No user found'); return;
        dfd.resolve(new User(userObj[0]))
    })
    .fail(function(err) {
        dfd.reject(err);
    });
    return dfd.promise;
}

// Get the stored hashed password of a user
User.getHash = function(username) {
    var dfd = Q.defer();
    db.query('SELECT username, password FROM users WHERE username = $1', [username])
    .then(function(userObj) {
        dfd.resolve(new User(userObj[0]));
    })
    .fail(function(err) {
        dfd.reject(err);
    });
    return dfd.promise;
}

// Get a User object by the banstrsauth
User.getByAuthToken = function(bantrsauth){
    var dfd = Q.defer();
    db.query('SELECT u.username, u.uid, u.email FROM users u NATURAL JOIN auth a WHERE a.bantrsauth = $1',[bantrsauth])
    .then(function(userObj) {
        if (userObj[0].length === 0) dfd.reject('No user found'); return;
        dfd.resolve(new User(userObj[0]))
    })
    .fail(function(err) {
        dfd.reject(err);
    });
}

module.exports = User;
