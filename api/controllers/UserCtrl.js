'use strict';

var UserModel = require('../models/UserModel');

/* UserCtrl Constructor */

var UserCtrl = function () {}


 /* Post (create) user - ok to pass pw as argument?
 * Yes, we are going to be hashing on the backend
 * Put the user into the DB
 * Return the uid on success
 */
UserCtrl.create = function(userData, callback) {
    /* Create a User model object with all of the fields
     * Then ask for the query object to insert it into the table
     */
    var User = new UserModel(userData);
	var response = User.create();

    response.then(function(err, result){
        var response = User.getId();
        response.then(function(results){
            User.id = results[0][0].uid;  // Extract the ID from the query
            callback(null, User); // Send to the user without and error
        }, function(err) {
            callback(err, null); // Send the error to the router
        }).bind(User);

    }, function(err) {
        callback(err, null);  // Send the error message to the front end (most likely a user already exists error)
    }).bind(User);
}


/* Update user
	 @param {string[]} newInfo - new username, pw, email
*/
UserCtrl.update = function(username, newInfo) {
    var User = new UserModel()

/* Get a user by username*/
UserCtrl.getByUsername = function(username, callback) {
    var query = UserModel.getByUsername(username);
    query.then(function(results){
        var err;
        if (results[1].rowCount === 0){err = 'User not found'}
        callback(err,results[0][0]);
    });
}

/* Get a user by id */
UserCtrl.getById = function(id, callback) {
    var query = UserModel.getById(id);
    query.then(function(results) {
        var err;
        if (results[1].rowCount === 0){err = 'User not found'}
        callback(err,results[0][0]);
    });
}

module.exports = UserCtrl;
