var should = require('should');
var db = require('../src/helpers/dbConnector');
var q = require('q');
var sinon = require('sinon');

describe('The db connector', function() {
    it('should call query properly', function() {
        var database = new db();
        database.query = sinon.stub().returns(q.resolve('it works'));
        database.query('SELECT 1', []).then(function(result) {
            should.equal('it works', result);
        });
    });
});
