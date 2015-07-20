var Auth = require('../../src/models/Auth');
var should = require('should');
var sinon = require('sinon');
var q = require('q');

describe('The auth model', function() {
    describe('Authentication by token', function() {
        it('Should return a user object', function() {
            var auth = new Auth();
            var testUser = {
                username: 'test',
                email: 'test@test.test',
                uid: 'someuid'
            };
            auth.db.query = sinon.stub().returns(q.resolve([testUser]));
            auth.validateAuthToken('validAuthToken').then(function(user) {
                should.equal(user.username, testUser.username);
                should.equal(user.email, testUser.email);
                should.equal(user.uid, testUser.uid);
            });
        });
        it('Should return an error with an invalid auth token', function() {
            var auth = new Auth();
            auth.db.query = sinon.stub().returns(q.resolve([]));
            return auth.validateAuthToken().fail(function(err) {
                should.not.exist(err);
            });
        });
    });
});
