var express = require('express');
var index = express.Router();


index.get('/', function(req, res) {
    res.json({code: 200, data: []})
});

module.exports = index;
