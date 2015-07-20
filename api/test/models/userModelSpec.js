var should = require('should');
var sinon = require('sinon');
var q = require('q');
var User = require('../../src/models/User');

describe('The user model', function() {
    describe('Getting a user', function() {
        var testUser = {
            username: 'erik',
            email: 'text@test.test',
            uid: 'someuid'
        };
        it('should get a user with a username', function() {
            var user = new User({username: 'erik'});
            user.db.query = sinon.stub().returns(q.resolve([testUser]));
            return user.get().then(function() {
                should.equal(user.username, testUser.username);
                should.equal(user.email, testUser.email);
                should.equal(user.uid, testUser.uid);
            });
        });
        it('should get a user with a uid', function() {
            var user = new User({uid: 'someuid'});
            user.db.query = sinon.stub().returns(q.resolve([testUser]));
            return user.get().then(function() {
                should.equal(user.username, testUser.username);
                should.equal(user.email, testUser.email);
                should.equal(user.uid, testUser.uid);
            });
        });
        it('should fail if the uid does not exist', function() {
            var user = new User({uid: 'baduid'});
            user.db.query = sinon.stub().returns(q.resolve([]));
            return user.get().fail(function(err) {
                should.exist(err);
            });
        });
    });
    it('should create a user', function() {
        var testUser = {
            username: Math.random().toString(),
            password: 'password',
            email: 'test@email.com'
        };
        var user = new User(testUser);
        user.db.query = sinon.stub().returns(q.resolve());
        return user.create().then(function() {
            should.exist(user.uid);
            should.equal(user.username, testUser.username);
            should.equal(user.email, testUser.email);
            should.notEqual(user.password, testUser.password);
        });
    });
});
