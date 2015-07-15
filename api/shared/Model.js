'use strict';
var db = require('../controllers/dbConnector');
var _ = require('underscore');
var extend = require('./utils').extend


/* Call the init method */
var Model = function(attrs, options) {
	options = options || {};
	attrs = attrs || {};
	this.init(attrs, options);
};

Model.extend = extend;

_.extend(Model.prototype, {
	idAttribute: 'id',
	fetchStatement: null,
	db: db,
	

	/* Init
	 * Anything special to be done in initialization
	 */
	init: function(attrs, options) {
		this.attributes = attrs;
	},

	/* Get Method
	 * This will retrieve a key from the attributes
	 */
	get: function(key) {
		return this.attributes[key];
	},

	/* Set
	 * This will set an element of the attributes object
	 */
	set: function(key, val) {
		if (typeof key === 'object') {
			this.attributes = key;
			return;
		}
		this.attributes[key] = val;
		return;
	},

	add: function(attrs) {
		var keys = _.keys(attrs);
		var self = this;
		_.each(keys, function(key) {
			self.set(key, attrs[key]);
		});
	}
,
	/* Remove
	 * Remove an attribute from the object
	 */
	remove: function(key) {
		delete this.attributes[key];
		return;
	},
	
	/* Fetch
	 * If the ID is present, make a call to the db using the fetch statement
	 * @return: A promise of the db call
	 */
	fetch: function() {
		var self = this;
		var id = this.get(this.idAttribute);

		if (!id) {
			throw new Error('No ID attribute present');
		}

		return db.query(this.fetchStatement, [id]).then(function(result) {
			var model = result[0];
			if (!model) {
				throw new Error('Could not find model with id: ' + id);
			}
			self.attributes = model;
		});
	},

	/* toJSON
	 * Jsonify the attributes of the model
	 */
	toJSON: function() {
		return this.attributes;
	}

});

module.exports = Model;