'use strict';

app.factory('User', function(config, $http) {
    var api = config.api + '/user';

    var User = function(data) {
        angular.extend(this, data);
    };

    var getProperties = function() {
        return {
            uid: this.uid || null,
            username: this.username || null,
            email: this.email || null
        };
    };

    User.prototype.create = function() {
        var user = this;

        return $http.post(api, user.getProperties()).success(function(response) {
            user.uid = response.data.uid;
        }).error(function(response) {

        });
    };

    User.prototype.save = function() {
        var user = this;

        return $http.post(api + '/me', user.getProperties()).success(function(response) {
            user.uid = response.data.uid;
        }).error(function(response) {

        });
    };

    User.get = function(id) {
        return $http.get(api + '/' + id).success(function(response) {
            return new User(response.data);
        });
    };

    User.prototype.getRooms = function() {
        var user = this;
        var url = api + '/' + user.username +  '/rooms';

        return $http.get(url).success(function(response) {
            return response.data;
        });
    };

    return User;
});
