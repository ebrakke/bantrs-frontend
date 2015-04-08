var um = require('../models/UserModel');
var db = require('../controllers/dbConnector');
var bcrypt = require('bcryptjs');

describe('When a user is initialized', function(){
    var uname, pwd, email, hash;
    beforeEach(function(){
        uname = Math.random().toString(32).slice(2);
        pwd = Math.random().toString(32).slice(2);
        hash = bcrypt.hashSync(pwd, 10);
        email = Math.random().toString(32).slice(2) + '@' + Math.random().toString(32).slice(2) + '.com';
        user = new um(uname, hash, email);
    });

    it('has a username, password, and email', function(){
        expect(user.username).toEqual(uname);
        expect(user.password).toEqual(hash);
        expect(user.email).toEqual(email);
        expect(user.id).toBe(undefined);
    });

    it('the username length should be less than 17', function () {
        expect(user.username.length).toBeLessThan(17);
    });

    it('the password should be length 59 or 60', function () {
        expect(user.password.length).toBeGreaterThan(58);
        expect(user.password.length).toBeLessThan(61);
    });
});

describe('When getId is called', function() {
    var uname,pwd,email;
    beforeEach(function() {
        user = new um('test', 'password', 'test@example.com');
        spyOn(db, 'query');
        user.getId();
    });

    it('should call query', function() {
        expect(db.query).toHaveBeenCalled();
    });

    it('should pass in the username to the query', function() {
        expect(db.query).toHaveBeenCalledWith('SELECT uid FROM users WHERE username = ?', {replacements: [user.username]});
    });
});

describe('When getting a users rooms', function() {
    beforeEach(function() {
        user = new um('test', 'password', 'test@example.com');
        user.uid = '098f6bcd4621d373cade4e832627b4f6';
        spyOn(db, 'query');
        user.getRooms()
    });

    it('should call query', function() {
        expect(db.query).toHaveBeenCalled();
    });

    it('should pass in the username to the query', function() {
        expect(db.query).toHaveBeenCalledWith('SELECT m.rid FROM users u, membership m WHERE m.uid = ?', {replacements: [user.uid]});
    });
});

describe('When update is called', function() {
    beforeEach(function (){
        user = um('test', 'password', 'test@example.com');
    })
})
