'use strict';

var UserModel = require('../models/UserModel');
var AuthCtrl = require('./AuthCtrl');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var e = require('./errors');
var Q = require('q');


/* UserCtrl Constructor */
var UserCtrl = function () {}


 /* Create a new user
 * Input: userData = {username, password, email}
 * Return: User object with username, email, uid, authToken
 */
UserCtrl.create = function(userData, callback) {
    var d = Q.defer();
    /* Call Validator */
    userData.password = bcrypt.hashSync(userData.password, 8); // Hash the password and forget it
    /* Send the request to create the user */
    var user = new UserModel(userData);
	user.create()
    .then(function() {
        delete user.password;
        user._auth = makeAuth(user._uid);
        user.createAuthToken()
        .then(function() {
            d.resolve(user);
        })
        .fail(function(err) {
            d.reject(err);
        })
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}


/* Update user
	 @param {string[]} newInfo - new username, pw, email
*/
UserCtrl.update = function(user, newInfo) {
    var d = Q.defer();
    user.username = newInfo.username ? newInfo.username : user.username;
    user.password = newInfo.password ? bcrypt.hashSync(newInfo.password, 8) : null;
    user.email = newInfo.email ? newInfo.email : user.email;

    user.update(function() {
        delete user.password;
        d.resolve();
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
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
            d.reject(err)
        });
    })
    .fail(function(err) {
        d.reject(err);
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
            d.reject(err);
        });
    })
    .fail(function(err) {
        d.reject(err);
    });
    return d.promise;
}

var makeAuth = function(id) {
    return createHash('sha1').update(id).update(Math.random().toString(32)).digest('hex');
}

module.exports = UserCtrl;
