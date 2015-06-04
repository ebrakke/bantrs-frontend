var should = require('should');
var sinon = require('sinon');
var userController = require('../controllers/UserCtrl');
var userModel = require('../models/UserModel');
var Q = require('q');

describe('The user controller', function() {
	describe('Get a user by username', function() {
		it('should return a userObj', function(done) {
			userController.getByUsername('erik').then(function(user) {
				user.should.be.ok;
				user.username.should.eql('erik');
				should.not.exists(user.password);
				user.uid.should.be.ok;
				user.rooms.should.be.ok;
				done();
			}).fail(function(err) {
				console.error('[Get By Username Fail]', err);
				err.should.not.be.ok;
				done();
			})
		});
	});
	describe('Creating a user', function() {
		it('should return a userObj', function(done) {
			var username = Math.random().toString(32).slice(2);
			user = {
				'username': username,
				'password': 'password',
				'email': 'mocha@test.com'
			};
			userController.create(user).then(function(data) {
				data.should.be.ok;
				data.user.username.should.eql(username);
				data.user.email.should.eql('mocha@test.com');
				data.user.uid.should.be.ok;
				data.auth.should.be.ok;
				data.user.delete().then(function() {
					done();
				})
			}).fail(function(err) {
				console.log('[Create User Failed', err);
				err.should.not.be.ok;
				done();
			});
		});
	});
});