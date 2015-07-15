var _ = require('underscore');
/*
* Wrapper for responses
*/

var utils = {};

utils.distance = function(lat1, lng1, lat2, lng2) {
    var deg2rad = function(deg) {
        return deg * (Math.PI / 180);
    };

    var R = 6371000; // metres
    var φ1 = deg2rad(lat1);
    var φ2 = deg2rad(lat2);
    var Δφ = deg2rad(lat2 - lat1);
    var Δλ = deg2rad(lng2 - lng1);

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;
    return d;
}

utils.extend = function(protoProps, staticProps) {
    /* Taken from Backbone.js */
    var parent = this;
    var child;
    if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function(){ return parent.apply(this, arguments); };
    }
    _.extend(child, parent, staticProps);
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;
    if (protoProps) _.extend(child.prototype, protoProps);
    child.__super__ = parent.prototype;
    return child;
}

utils.parser = function(model, config) {
    var interpret = function(key, val, model) {
        if (typeof val === 'string') {
            // We know that we just want the attribute of the current model
            return model.get(val);
        }
        if (typeof val === 'object' && !val.attrs) {
            // This is just a group
            var keys = _.keys(val)
            return _.pick(model.attributes, keys);
        }
        // It's a model we're working with
        var innerModel = model.get(key);
        var innerConfig = val;
        return utils.parser(innerModel, innerConfig);
    }
    var keys = _.keys(config.attrs);
    if (config.type === 'collection') {
        var data = [];
        _.each(model.models, function(collectionModel) {
            var newConfig = {
                attrs: config.attrs,
                type: 'object'
            }
            data.push(utils.parser(collectionModel, newConfig))
        })
        if (keys.length === 1) {
            return _.pluck(data, keys[0]);
        }
        return data;
    } 
    var data = {};
    _.each(keys, function(key) {
        var val = config.attrs[key]
        data[key] = interpret(key, val, model);
    });
    return data;
}
// Export statement
module.exports = utils;
