'use strict';

app.factory('User', function(config, $http, Room) {
    var api = config.api + '/user';

    var User = function(data) {
        angular.extend(this, data);
    };

    User.prototype.create = function() {
        var user = this;

        return $http.post(api, user).then(function(response) {
            var data = response.data.data;
            user.uid = data.user.uid;

            return data;
        }, function(response) {

        });
    };

    User.prototype.save = function() {
        var user = this;

        return $http.post(api + '/me', user.getProperties()).then(function(response) {
            return response.data.data;
        }, function(error) {

        });
    };

    User.get = function(id) {
        return $http.get(api + '/' + id).success(function(response) {
            return new User(response.data);
        }).error(function(error) {
            console.log('error', error);
        });
    };

    User.prototype.getRooms = function() {
        var user = this;
        var url = api + '/' + user.username +  '/rooms';

        return $http.get(url).then(function(response) {
            var data = response.data.data;

            var rooms = [];
            data.forEach(function(elem) {
                rooms.push(new Room(elem));
            });

            return rooms;
        });
    };

    return User;
});
