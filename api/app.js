// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

// define our app using express
var app = express();

// log requests to the console
app.use(logger('dev'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 3000;

// Add CORS support
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/*
 * Router Declarations
 */
var user = require('./routes/user');
var room = require('./routes/room');
var comment = require('./routes/comment');

// routes to use
app.use('/user', user);
app.use('/room', room);
app.use('/comment', comment);

// START THE SERVER
app.listen(port);
console.log('Express server listening on port ' + port);

module.exports = app;
