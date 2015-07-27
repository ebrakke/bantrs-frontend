var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var errorHandle = require('./middlewares/error');

var user = require('./routes/user');
var comment = require('./routes/comment');
var room = require('./routes/room');
var search = require('./routes/search');
var index = require('./routes/index');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Route declarations
app.use('/comment', comment);
app.use('/user', user);
app.use('/room', room);
app.use('/search', search);
app.use('/', index);

app.use(errorHandle);

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Express server listening on port ' + port);

module.exports = app;
