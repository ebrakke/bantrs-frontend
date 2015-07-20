var crypto = require('crypto');
var _ = require('lodash');

exports.createId = function(attrs, alg) {
    alg = alg || 'md5';
    var sum = crypto.createHash(alg);
    var values = _.values(attrs);
    if (_.isEmpty(values)) {
        // Hash a random number
        var randomNumber = Math.random().toString();
        return sum.update(randomNumber).digest('hex');
    }
    _.each(values, function(value) {
        sum.update(value);
    });
    return sum.digest('hex');
};

exports.generateToken = function() {
    var randomNum = Math.random().toString();
    var sum = crypto.createHash('sha256');
    return sum.update(randomNum).digest('hex');
};
