'use strict';

app.factory('Auth', function(config, $http, $location, $q, $localStorage, User) {
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
        var deferred = $q.defer();

        $http.post(api, {
            'username': username,
            'password': password
        }).success(function(response, status) {
            var data = response.data;

            Auth.setToken(data.bantrsAuth);
            Auth.setUser(data.user);

            deferred.resolve();
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    Auth.logout = function() {
        delete $localStorage.token;
        delete $localStorage.user;

        $location.path('/login');
    };

    return Auth;
});
