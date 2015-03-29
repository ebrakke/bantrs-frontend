var pg = require('pg');
/*
* This is basically a config file for the pg node package
* TODO
* Implement the connection to the database
*/

function db(){
    // Set the pg attributes
}

db.prototype.query(query,params){
    /*pg.query({
    text: query
    values: params
});*/

    return 'This is just a sub';
}

module.exports = db;
