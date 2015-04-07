'use strict';
var UserModel = require('../models/UserModel');
var AuthCtrl = require('./AuthCtrl');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
/* UserCtrl Constructor */
var UserCtrl = function () {}


 /* Create a new user
 * Input: userData = {username, password, email}
 * Return: User object with username, uid, authToken
 * TODO:
 */
UserCtrl.create = function(userData, callback) {
    userData.password = bcrypt.hashSync(userData.password, 8); // Hash the password and forget it

    var User = new UserModel(userData);
	var response = User.create();
    delete User.password;
    response.then(function(err, result) {
        var response = User.getId();
        response.then(function(results) {
            User.uid = results[0][0].uid;  // Extract the ID from the response
            User.auth = crypto.createHash('sha1').update(User.uid).update(Math.random().toString(32).slice(2).digest('hex');
            var response = User.createAuthToken();
            response.then(function(results) {
                callback(null, User);
            }, function(err) {
                callback(err, null);
            });
        }, function(err) {
            callback(err, null); // Send the error to the router
        });
    }, function(err) {
        callback(err, null);  // Send the error message to the front end (most likely a user already exists error)
    });
}


/* Update user
	 @param {string[]} newInfo - new username, pw, email
*/
UserCtrl.update = function(username, authToken, newInfo, callback) {
    var response = AuthCtrl.validByAuthToken(authToken);
    response.then(function(result) {
        var User = result[0][0];

        User.username = newInfo.username ? newInfo.username : User.username;
        User.password = newInfo.password ? newInfo.password : null;
        User.email = newInfo.email ? newInfo.email : User.email;

        newUser = new UserModel(User);
        newUser.uid = User.uid;
        var response = newUser.update();
        delete newUser.password;

        response.then(function(response){
            callback(null, newUser);
        }, function(err) {
            callback(err, null);
        });
    }, function(err){
        callback(err, null);
    });
}

/* Get a user by username*/
UserCtrl.getByUsername = function(username, callback) {
    var response = UserModel.getByUsername(username);
    response.then(function(results) {
            var err;
            if (results[1].rowCount === 0){err = 'User not found'}
            callback(err,results[0][0]);
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
