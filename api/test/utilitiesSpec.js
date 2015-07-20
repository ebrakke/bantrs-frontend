var should = require('should');
var utilities = require('../src/helpers/utilities');

describe('createId', function() {
    it('Should hash with no params', function() {
        var result = utilities.createId();
        should.exist(result);
    });
    it('Should hash something that\'s not md5', function() {
        var values = {
            test: 'abc123'
        };
        var crypto = require('crypto');
        var result = utilities.createId(values, 'sha1');
        var actual = crypto.createHash('sha1').update(values.test).digest('hex');
        should.equal(actual, result);
    });
});
