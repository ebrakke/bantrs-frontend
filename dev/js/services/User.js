'use strict';

app.factory('User', function(config, $q, $http, Room) {
    var api = config.api + '/user';

    var User = function(data) {
        angular.extend(this, data);
    };

    User.prototype.create = function() {
        var user = this;
        var deferred = $q.defer();

        $http.post(api, user).success(function(response) {
            var data = response.data;
            user.uid = data.user.uid;

            deferred.resolve(data);
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    User.prototype.save = function() {
        var user = this;
        var deferred = $q.defer();

        $http.post(api + '/me', user.getProperties()).success(function(response) {
            deferred.resolve(response.data);
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    User.get = function(id) {
        var deferred = $q.defer();

        $http.get(api + '/' + id).success(function(response) {
            deferred.resolve(new User(response.data));
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    User.prototype.getRooms = function() {
        var user = this;
        var deferred = $q.defer();
        var url = api + '/' + user.username +  '/rooms';

        $http.get(url).success(function(response) {
            var data = response.data;

            var rooms = [];
            data.forEach(function(elem) {
                rooms.push(new Room(elem));
            });

            deferred.resolve(rooms);
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    return User;
});
