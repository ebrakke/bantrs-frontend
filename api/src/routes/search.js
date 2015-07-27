var express = require('express');
var search = express.Router();
var Search = require('../models/Search');
var format = require('../middlewares/format');
var envelope = require('../middlewares/envelope');
var auth = require('../middlewares/auth').auth;

search.get('/user/:fragment', auth, function(req, res, next) {
    console.log(Search);
    Search.usernameOrEmail(req.params.fragment).then(function(suggestions) {
        res.locals.data = suggestions;
        next();
    }).fail(function() {
        next({msg: 'An error has occurred', code: 500});
    });
}, envelope);

module.exports = search;
