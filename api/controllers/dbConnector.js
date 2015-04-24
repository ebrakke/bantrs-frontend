var pg = require('pg');
var config = require('../config');
var Q = require('q');
var deferred = Q.defer();
var client = new pg.Client(config.db.type + '://' + config.db.username + ':' + config.db.password + '@' + config.db.host + '/' + config.db.name);
/*
* This is basically a config file for the pg node package
* TODO
*/

function db() {}

db.query = function(query,params){
    client.connect();
    client.query(query, params, function(err, result) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

module.exports = db;
