'use strict';
var db = require('../controllers/dbConnector');
var _  = require('underscore');
var extend = require('./utils').extend;

/* Call the init method */
var Collection = function(attrs, options) {
	attrs = attrs || [];
	this.models = [];
	var self = this;
	_.each(attrs, function(model) {
		self.models.push(new self.model(model));
	});

};

Collection.extend = extend;

_.extend(Collection.prototype, {
	idAttribute: 'id',
	fetchStatement: null,
	db: db,
	model: null,  // This will be what it will be a collection of
	models: [],  // This is the actual collection

	addAll: function(key, value) {
		var obj = {};
		obj.key = value;
		if (typeof key === 'object') {
			obj = key;
		}
		_.each(this.models, function(model) {
			model.add(obj);
		});
	},

	/* toJSON
	 * Returns a list of models in the jsonified form
	 */
	toJSON: function() {
		var objects = [];
		_.each(this.models, function(model) {
			objects.push(model.toJSON());
		});
		return objects;
	}

});

module.exports = Collection;
