var pg = require('pg');
var dbConfig = require('../../config/dbConfig');
var q = require('q');

var conn = '{type}://{username}:{password}@{host}/{db}';
conn = conn.replace('{type}', dbConfig.type);
conn = conn.replace('{username}', dbConfig.username);
conn = conn.replace('{password}', dbConfig.password);
conn = conn.replace('{host}', dbConfig.host);
conn = conn.replace('{db}', dbConfig.db);

var db = function() {};

db.prototype.query = function(query, params) {
    var d = q.defer();
    pg.connect(conn, function(err, client, done) {
        var handleError = function(err) {
            if (!err) {
                return;
            }
            done(client);
            return err;
        };
        if (handleError(err)) {
            d.reject(err);
            return;
        }
        client.query(query, params, function(err, result) {
            if (handleError(err)) {
                d.reject(err);
                return;
            }
            done(client);
            d.resolve(result.rows);
            return;
        });
    });
    return d.promise;
};

module.exports = db;
