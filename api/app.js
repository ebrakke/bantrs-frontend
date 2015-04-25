// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

// define our app using express
var app = express();

// set our port
var port = process.env.PORT || 3000;

// log requests to the console
app.use(logger('dev'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add CORS support
app.use(cors());

/*
 * Router Declarations
 */
var user = require('./routes/user');
var room = require('./routes/room');
var comment = require('./routes/comment');
var index = require('./routes/index');

// routes to use
app.use('/user', user);
app.use('/room', room);
app.use('/comment', comment);
app.use('/', index);

// START THE SERVER
app.listen(port);
console.log('Express server listening on port ' + port);

module.exports = app;
