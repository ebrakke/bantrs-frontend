'use strict';

app.factory('Auth', function(config, $http, $localStorage) {
    var api = config.api + '/user/auth';
    var currentUser = null;

    var Auth = {};

    Auth.getUser = function() {
        return currentUser;
    };

    Auth.setUser = function(user) {
        currentUser = user;
    };

    Auth.login = function(username, password) {
        return $http.post(api, {
            'username': username,
            'password': password
        }).success(function(response, status) {
            var data = response.data;

            $localStorage.token = data.authToken;
            currentUser = data.user;

            return response.meta.code;
        }).error(function(response, status) {

        });
    };

    Auth.logout = function() {
        delete $localStorage.token;
    };

    return Auth;
});
