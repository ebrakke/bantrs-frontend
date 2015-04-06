'use strict';

app.factory('Auth', function(config, $http, $localStorage) {
    var api = config.api + '/user';
    var currentUser = null;

    var Auth = {};

    Auth.getUser = function() {
        return currentUser;
    };

    Auth.setUser = function(user) {
        currentUser = user;
    };

    Auth.login = function(username, password) {
        $localStorage.token = 'foo';
    };

    Auth.logout = function() {
        delete $localStorage.token;
    };

    return Auth;
});
