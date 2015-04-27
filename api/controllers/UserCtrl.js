'use strict';

var UserModel = require('../models/UserModel');
var AuthCtrl = require('./AuthCtrl');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var e = require('./errors');
var Q = require('q');
var Validator = require('../validate');
var _ = require('lodash-node')


/* UserCtrl Constructor */
var UserCtrl = function () {}


 /* Create a new user
 * Input: userData = {username, password, email}
 * Return: User object with username, email, uid, authToken
 */
UserCtrl.create = function(userData) {
    var d = Q.defer();
    var user = new UserModel(userData);

    /* Validate user creation fields */
    var validationFailed = Validator.user(user);
    if (validationFailed) {
        e.invalidUserData.msg = validationFailed;
        d.reject(e.invalidUserData, null);
        return d.promise;
    }

    // Hash the password and forget it
    user.password = bcrypt.hashSync(user.password, 8);
    /* Send the request to create the user */
    user.create()
    .then(function() {
        delete user.password;
        var auth = makeAuth(user.uid);
        user.createAuthToken(auth)
        .then(function() {
            d.resolve({user: user, auth: auth});
        })
        .fail(function(err) {
            d.reject(e.invalidAuthToken);
        })
    })
    .fail(function(err) {
        d.reject(e.invalidUser);
    });
    return d.promise;
}

/* Update user
	 @param {string[]} newInfo - new username, pw, email
*/
UserCtrl.update = function(user, newInfo) {
    var d = Q.defer();
    user.username = newInfo.username ? newInfo.username : user.username;
    user.password = newInfo.password ? newInfo.password : null;
    user.email = newInfo.email ? newInfo.email : user.email;

    /* Validate user update fields */
    var validationFailed = Validator.user(user);
    if (validationFailed) {
        e.invalidUserData.msg = validationFailed;
        d.reject(e.invalidUserData, null);
        return d.promise;
    }

    user.password = user.password ? bcrypt.hashSync(user.password, 8): null;
    user.update()
    .then(function() {
        if(user.password) { // They changed there password, update the auth token
            delete user.password;
            var auth = makeAuth(user.uid);
            user.updateAuth(auth)
            .then(function() {
                d.resolve(auth);
            })
            .fail(function(err) {
                d.reject(e.invalidAuthTokenUpdate);
            });
        } else {
            delete user.password;
            d.resolve();
        }
    })
    .fail(function(err) {
        d.reject(e.invalidUserUpdate);
    });
    return d.promise;
}

UserCtrl.getRoomObjects = function(username) {
    var d = Q.defer();
    UserModel.getByUsername(username)
    .then(function(user) {
        user.getActiveRooms()
        .then(function() {
            user.getRoomObjects()
            .then(function(roomObjs) {
                d.resolve(roomObjs);
            })
            .fail(function(err) {
                d.reject(e.invalidGetRoomObjs);
            })
        })
        .fail(function(err) {
            d.reject(e.invalidGetRooms)
        })
    })
    .fail(function(err) {
        d.reject(e.invalidUsername);
    })
    return d.promise;
}

UserCtrl.getUserObjects = function(uids) {
    var users = [];
    _.forEach(uids, function(uid) {
        users.push(UserModel.getById(uid));
    });
    console.log(users);
    return Q.all(users);
}

/* Get a user by username*/
UserCtrl.getByUsername = function(username) {
    var d = Q.defer();
    UserModel.getByUsername(username)
    .then(function(user) {
        user.getRooms()
        .then(function() {
            d.resolve(user);
        })
        .fail(function(err) {
            d.reject(e.invalidGetRooms)
        });
    })
    .fail(function(err) {
        d.reject(e.invalidUsername);
    });
    return d.promise;
}

/* Get a user by id */
UserCtrl.getById = function(id) {
    var d = Q.defer();
    UserModel.getById(id)
    .then(function(user) {
        user.getRooms()
        .then(function() {
            d.resolve(user);
        })
        .fail(function(err) {
            d.reject(e.invalidGetRooms);
        });
    })
    .fail(function(err) {
        d.reject(e.invalidUID);
    });
    return d.promise;
}

/* Get compact user */
UserCtrl.getByIdCompact = function(id) {
    var d = Q.defer();
    UserModel.getById(id)
    .then(function(user) {
        d.resolve(user)
    })
    .fail(function(err) {
        d.reject(e.invalidUID)
    })
    return d.promise;
}

UserCtrl.delete = function(user) {
    var d = Q.defer();
    user.delete()
    .then(function() {
        d.resolve();
    })
    .fail(function(err) {
        d.reject(e.invalidUserDelete);
    })
    return d.promise;
}

var makeAuth = function(id) {
    return crypto.createHash('sha1').update(id).update(Math.random().toString(32)).digest('hex');
}


module.exports = UserCtrl;
