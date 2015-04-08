var um = require('../models/UserModel');
var uc = require('../controllers/UserCtrl');
var bcrypt = require('bcryptjs');

describe('When a user is created', function() {
    var mockUser = {};
    beforeEach(function() {
        mockUser.username = Math.random().toString(32).slice(2);
        mockUser.password = Math.random().toString(32).slice(2);
        mockUser.email = Math.random().toString(32).slice(2) + '@' + Math.random().toString(32).slice(2) + '.com';
    });

    it('should check that the length of the username is less than 17', function() {
        mockUser.username = 'ausernamethatislongerthan17character';
        uc.create(mockUser);
        expect(uc.create).toEqual('Username too long');
    });

    it('should check that the length of the password is more than 6 characters', function () {
        mockUser.password = '2short';
        uc.create(mockUser);
        expect(uc.create).toEqual('Password is too short');
    });

    it('should create call the UserModel create function', function() {
        spyOn(um.prototype, 'create');
        uc.create(mockUser);
        expect(um.prototype.create).toHaveBeenCalled();
    });
    it('should encrypt the password using bcrypt', function() {
        spyOn(bcrypt, 'hashSync');
        uc.create(mockUser);
        expect(bcrypt.hashSync).toHaveBeenCalled();
    });
});
