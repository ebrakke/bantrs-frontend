var parser = require('./utils').parser;
var Middleware = {

	requireAuthentication: function(req, res, next) {
		var Auth = require('../models/Auth');
		var authToken = req.get('authorization');
		var auth = new Auth({authToken: authToken});
		auth.validateAuthToken().then(function() {
			res.locals.user = auth.get('user');
			next();
		}).fail(function(err) {
			next(err);
		});
	},

	parser: function(req, res, next) {
		var modelOrCollection = res.locals.modelOrCollection;
		var config = res.locals.parserConfiguration;
		var data = parser(modelOrCollection, config);
		res.locals.responseData = data;
		next();
	},

	sendData: function(req, res, next) {
		var meta = { code: 200, err: {} };
		res.status(200).json({meta: meta, data: res.locals.responseData});
	},

	handleError: function(err, req, res, next) {
		var meta = { code: err.code, err: err.msg};
		res.status(err.code).json({meta: meta, data: {}});
	}
};

module.exports = Middleware;