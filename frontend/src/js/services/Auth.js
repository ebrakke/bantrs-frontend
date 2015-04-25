'use strict';

app.factory('Auth', function(config, $http, $location, $localStorage, User) {
    var api = config.api + '/user/auth';

    var Auth = {};

    Auth.getUser = function() {
        return new User($localStorage.user);
    };

    Auth.setUser = function(user) {
        $localStorage.user = user;
    };

    Auth.setToken = function(token) {
        $localStorage.token = token;
    };

    Auth.isLogged = function() {
        return !!$localStorage.token && !!$localStorage.user;
    };

    Auth.login = function(username, password) {
        return $http.post(api, {
            'username': username,
            'password': password
        }).success(function(response, status) {
            console.log(response);
            var data = response.data;

            Auth.setToken(data.bantrsAuth);
            Auth.setUser(data.user);

            return response.meta.code;
        });
    };

    Auth.logout = function() {
        delete $localStorage.token;
        delete $localStorage.user;

        $location.path('/login');
    };

    return Auth;
});
