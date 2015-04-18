'use strict';

app.factory('Auth', function(config, $http, $location, $localStorage) {
    var api = config.api + '/user/auth';
    var currentUser = null;

    var Auth = {};

    Auth.getUser = function() {
        return currentUser;
    };

    Auth.setUser = function(user) {
        currentUser = user;
    };

    Auth.setToken = function(token) {
        $localStorage.token = token;
    };

    Auth.isLogged = function() {
        return !!$localStorage.token;
    };

    Auth.login = function(username, password) {
        return $http.post(api, {
            'username': username,
            'password': password
        }).success(function(response, status) {
            var data = response.data;

            Auth.setToken(data.authToken);
            Auth.setUser(data.user);

            return response.meta.code;
        });
    };

    Auth.logout = function() {
        delete $localStorage.token;

        $location.path('/login');
    };

    return Auth;
});
