'use strict';

app.factory('User', function($rootScope, $http) {
    var api = $rootScope.config.api + '/user';

    var User = function(data) {
        angular.extend(this, data);
    };

    User.prototype.create = function() {
        var user = this;

        return $http.post(api, user).then(function(response) {
            return response.data;
        });
    };

    User.get = function(id) {
        return $http.get(api + '/' + id).then(function(response) {
            return new User(response.data);
        });
    };

    User.prototype.rooms = function() {
        var user = this;
        var url = api + '/' + user.username +  '/rooms';

        return $http.get(url).then(function(response) {
            return response.data;
        });
    };

    return User;
});
