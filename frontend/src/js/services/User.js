'use strict';

app.factory('User', function(config, $http) {
    var api = config.api + '/user';

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
            return new User(response.data.data);
        });
    };

    User.prototype.getRooms = function() {
        var user = this;
        var url = api + '/' + user.username +  '/rooms';

        return $http.get(url).then(function(response) {
            return response.data;
        });
    };

    return User;
});