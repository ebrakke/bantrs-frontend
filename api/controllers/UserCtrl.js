'use strict';

var UserModel = require('../models/UserModel');
var AuthCtrl = require('./AuthCtrl');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var e = require('./errors');
var Q = require('q');
var Validator = require('../validate');
var _ = require('lodash-node');


/* UserCtrl Constructor */
var UserCtrl = function () {};


 /* Create a new user
 * Input: userData = {username, password, email}
 * Return: User object with username, email, uid, authToken
 */
 var factory = {
    validateUser: function(user) {
        return Validator.user(user).then(function() {
            return user;
        });
    },

    getByUsername: function(username) {
        return UserModel.getByUsername(username)
        .fail(function(err) {
            throw new e.Error(e.invalidUsername);
        });
    },

    getRooms: function(user) {
        return user.getActiveRooms().then(function() {
            return user;
        });
    },

    auth: function(user) {
        var auth = makeAuth(user.uid);
        return user.createAuthToken(auth).then(function() {
            delete user.password;
            return {user: user, auth: auth};
        })
        .fail(function(err) {
            throw new e.Error(e.invalidUserData);
        });
    },

    createUser: function(user) {
        user.password = bcrypt.hashSync(user.password, 8);
        return user.create().then(function() {
            return user;
        })
        .fail(function(err) {
            throw new e.Error(e.invalidUserData);
        });
    }
 }
UserCtrl.create = function(userData) {
    var user = new UserModel(userData);
    var funcs = [factory.validateUser, factory.createUser, factory.auth]
    return funcs.reduce(Q.when, Q(user));
};

/* Update user
	 @param {string[]} newInfo - new username, pw, email
*/
UserCtrl.update = function(user, newInfo) {
    user.username = newInfo.username ? newInfo.username : user.username;
    user.password = newInfo.password ? newInfo.password : null;
    user.email = newInfo.email ? newInfo.email : user.email;

    var funcs = [
        function validate(user) {
            return Validator.user(user).then(function() {
                return user;
            })
            .fail(function(err) {
                throw err;
            })
        },
        function update(user) {
            if (user.password) {
                user.password = bcrypt.hashSync(user.password, 8);
                return 
            }
        }
    ]
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
};

UserCtrl.getRoomObjects = function(username) {
    var funcs = [factory.getByUsername, factory.getRooms]
    return funcs.reduce(Q.when, new Q(username));
};

UserCtrl.getUserObjects = function(uids) {
    var users = [];
    _.forEach(uids, function(uid) {
        users.push(UserModel.getById(uid));
    });
    return Q.all(users);
};

/* Get a user by username*/
UserCtrl.getByUsername = function(username) {
    var funcs = [factory.getByUsername, factory.getRooms];
    return funcs.reduce(Q.when, new Q(username));
};


UserCtrl.delete = function(user) {
    return user.delete();
};

var makeAuth = function(id) {
    return crypto.createHash('sha1').update(id).update(Math.random().toString(32)).digest('hex');
};

function UserError(data) {
    this.msg = data.msg;
    this.code = data.code;
}



module.exports = UserCtrl;
