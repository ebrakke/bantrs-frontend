var pg = require('pg');
var config = require('../config');
var Q = require('q');
var errors = require('../shared/errors');
var connString = config.db.type + '://' + config.db.username + ':' + config.db.password + '@' + config.db.host + '/' + config.db.name;
/*
* This is basically a config file for the pg node package
* TODO
*/
pg.defaults.poolSize = 20;
function db() {}

db.query = function(query,params){
    var deferred = Q.defer();
    pg.connect(connString, function(err, client, done) {

        var handleError = function(err) {
            if(!err) return false;
            done(client);
            console.log(err);
            return Q.reject(errors.dbError);
        };

        if(handleError(err)) return;

        client.query(query, params, function(err, result) {
            if(handleError(err)) return;
            done(client);
            deferred.resolve(result.rows);
        });
    });
    return deferred.promise;
};


module.exports = db;
