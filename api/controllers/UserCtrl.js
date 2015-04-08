'use strict';
var UserModel = require('../models/UserModel');
var AuthCtrl = require('./AuthCtrl');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var config = require('../config');


/* UserCtrl Constructor */
var UserCtrl = function () {}


 /* Create a new user
 * Input: userData = {username, password, email}
 * Return: User object with username, email, uid, authToken
 */
UserCtrl.create = function(userData, callback) {
    userData.password = bcrypt.hashSync(userData.password, 8); // Hash the password and forget it

    /* Send the request to create the user */
    var User = new UserModel(userData);
	var response = User.create();
    delete User.password;

    response.then(function(result) {
        /* On a successful insert, get the id and create an auth token */
        var response = User.getId();
        response.then(function(results) {
            /* extract the uid */
            User.uid = results[0][0].uid;  // Extract the ID from the response
            User.auth = crypto.createHash('sha1').update(User.uid).update(Math.random().toString(32).slice(2)).digest('hex');  // Generate a new auth token

            var response = User.createAuthToken();  // Put the auth token into the DB
            response.then(function(results) {
                /* Return the user object to the router */
                callback(null, User);

        /* Error handling */
            }, function(err) {
                callback(err, null);
            });
        }, function(err) {
            callback(err, null);
        });
    }, function(err) {
        callback(config.error.usernameExists, null);
    });
}


/* Update user
	 @param {string[]} newInfo - new username, pw, email
*/
UserCtrl.update = function(username, authToken, newInfo, callback) {
    var response = AuthCtrl.validByAuthToken(username, authToken, function(err, result) {
        var User = result;
        console.log(newInfo);
        User.username = newInfo.username ? newInfo.username : User.username;
        User.password = newInfo.password ? bcrypt.hashSync(newInfo.password, 8) : null;
        User.email = newInfo.email ? newInfo.email : User.email;
        var newUser = new UserModel(User);
        var response = newUser.update();
        delete newUser.password;

        response.then(function(response){
            callback(null, newUser);
        }, function(err) {
            callback(err, null);
        });
    });
}

/* Get a user by username*/
UserCtrl.getByUsername = function(username, callback) {
    var response = UserModel.getByUsername(username);
    response.then(function(results) {
            if (results[1].rowCount === 0){
                callback(config.error.userNotFound, null);
            }
            User = new UserModel(results[0][0]);
            var response = User.getRooms();
            response.then(function(results) {

            })

            callback(err, user);
    }, function(err) {
        callback(err, null);
    });
}

/* Get a user by id */
UserCtrl.getById = function(id, callback) {
    var response = UserModel.getById(id);
    response.then(function(results) {
        var err;
        if (results[1].rowCount === 0){err = 'User not found'}
        callback(err,results[0][0]);
    }, function(err) {
        callback(err, null);
    });
}

module.exports = UserCtrl;
