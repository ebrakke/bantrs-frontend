var db = require('../controllers/dbConnector');
var Q = require('q');
var _ = require('lodash-node');
var e = require('../controllers/errors');

function User(userData) {
    this.username = userData.username;
    this.password = userData.password;
    this.email = userData.email;
    this.uid = userData.uid;
}

// Query the DB for the rooms that a user's rooms
User.prototype.getActiveRooms = function() {
    var d = Q.defer();
    var user = this;
    db.query('SELECT rid FROM membership WHERE uid = $1 AND active = true', [this.uid])
    .then(function(roomList) {
        user.rooms = _.pluck(roomList, 'rid');
        d.resolve();
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

// Update a user object
User.prototype.update = function() {
    var d = Q.defer();
    if (this.password) {
        db.query('UPDATE users set username=$1, password=$2, email=$3 WHERE uid=$4', [this.username,this.password,this.email,this.uid])
        .then(function(res) {
            d.resolve();
        })
        .fail(function(err) {
            d.reject(err);
        });
        return d.promise;
    }

    db.query('UPDATE users set username=$1, email=$2 WHERE uid=$3', [this.username, this.email, this.uid])
    .then(function(res) {
        d.resolve();
    })
    .fail(function(err) {
        d.reject(err)
    });
    return d.promise;
}
// Create a user, update the uid of the User object
User.prototype.create = function() {
    var d = Q.defer();
    var user = this;
    // Insert the new user into the db
    db.query('INSERT INTO users VALUES (md5($1), $2, $3, $4) RETURNING uid', [Date.now() + this.username,this.username,this.password,this.email])
    .then(function(uidObj) {
        user.uid = uidObj[0].uid;
        d.resolve();
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

User.prototype.updateAuth = function(auth) {
    var d = Q.defer();
    db.query('UPDATE auth SET bantrsauth = $1 WHERE uid = $2', [auth, this.uid])
    .then(function() {
        d.resolve();
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}
// Delete a user from the DB
User.prototype.delete = function() {
    var d = Q.defer();
    db.query('DELETE FROM users * WHERE users.uid = $1', [this.uid])
    .then(function(success) {
        d.resolve();
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

User.prototype.getAuthToken = function() {
    var d = Q.defer();
    db.query('SELECT bantrsauth FROM auth WHERE uid = $1', [this.uid])
    .then(function(authObj) {
        d.resolve(authObj[0].bantrsauth)
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

//Create an entry for a new user and his Bantrs auth token
User.prototype.createAuthToken = function(auth) {
    var d = Q.defer();
    db.query('INSERT INTO auth VALUES ($1, $2) RETURNING bantrsauth', [this.uid, auth])
    .then(function(authObj) {
        d.resolve();
    })
    .fail(function(err) {
        d.reject(err)
    });
    return d.promise;
}

User.prototype.getRoomObjects = function() {
    var d = Q.defer();
    var rooms = [];
    db.query('SELECT r.rid, r.author, r.title, r.lat, r.lng, r.radius, r.topic_type, r.topic, r.createdat, m.active FROM rooms r, membership m WHERE m.uid = $1 AND m.rid = r.rid', [this.uid])
    .then(function(roomObjs) {
        var OC = require('./objCreator');
        _.forEach(roomObjs, function(room) {
            rooms.push(OC.room(room));
        });
        d.resolve(rooms);
    }).fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

User.prototype.joinRoom = function(rid) {
    var d = Q.defer();
    db.query('INSERT INTO membership VALUES ($1, $2)', [rid, this.uid])
    .then(function(result) {
        d.resolve();
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

User.prototype.archiveRoom = function(rid) {
    var d = Q.defer();
    db.query("UPDATE membership SET active = false WHERE uid = $1 AND rid = $1", [this.uid, rid])
    .then(function() {
        d.resolve();
    })
    .fail(function() {
        d.reject(err)
    });
    return d.promise;
}

User.prototype.visitRoom = function(rid) {
    db.query("UPDATE membership SET last_active = now()::timestamp WHERE uid = $1 AND rid = $2", [this.uid, rid])
}

// Get a User object by the username
User.getByUsername = function(username) {
    var d = Q.defer();
    // Send the query to the dbConnector
    db.query("SELECT uid, username, email FROM users where username = $1", [username])
    .then(function(userObj) {
        if(userObj[0].length === 0) {
            d.reject('No user found');
            return;
        }
        d.resolve(new User(userObj[0]));
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}



// Get a User object by the uid
User.getById = function(uid) {
    var d = Q.defer();
    db.query('SELECT uid, username, email FROM users WHERE uid = $1', [uid])
    .then(function(userObj) {
        if(userObj[0].length === 0) {
            d.reject('No user found');
            return;
        }
        d.resolve(new User(userObj[0]))
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

// Get the stored hashed password of a user
User.getHash = function(username) {
    var d = Q.defer();
    db.query('SELECT username, password FROM users WHERE username = $1', [username])
    .then(function(userObj) {
        if (userObj.length > 0) {
            d.resolve(new User(userObj[0]));
        } else {
            e.invalidUserData.msg = 'Invalid username/password.';
            d.reject(e.invalidUserData);
        }
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

// Get a User object by the banstrsauth
User.getByAuthToken = function(bantrsauth){
    var d = Q.defer();
    db.query('SELECT u.username, u.uid, u.email FROM users u NATURAL JOIN auth a WHERE a.bantrsauth = $1',[bantrsauth])
    .then(function(userObj) {
        if (userObj.length === 0) {
            d.reject('No user found');
            return;
        }
        d.resolve(new User(userObj[0]))
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

module.exports = User;
