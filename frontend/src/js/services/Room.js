'use strict';

app.factory('Room', function(config, $q, $http, Comment) {
    var api = config.api + '/room';

    var Room = function(data) {
        angular.extend(this, data);
    };

    Room.prototype.create = function() {
        var room = this;
        var deferred = $q.defer();

        $http.post(api, {
            title: room.title,
            topic: room.topic.content,
            lat: room.location.lat,
            lng: room.location.lng,
            radius: room.location.radius
        }).success(function(response) {
            var data = response.data;

            room.rid = data.rid;
            room.author = data.author;
            room.topic.type = data.topic.type;
            room.members = data.members;
            room.newComments = data.newComments;
            room.member = data.member;
            room.archived = data.archived;
            room.createdAt = data.createdAt;

            deferred.resolve();
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    Room.prototype.save = function() {
        var room = this;
        var deferred = $q.defer();

        $http.post(api + '/' + room.rid, {
            title: room.title,
            radius: room.location.radius
        }).success(function(response) {
            deferred.resolve();
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    Room.prototype.join = function(lat, lng) {
        var room = this;
        var deferred = $q.defer();

        $http.post(api + '/' + room.rid + '/join', {
            lat: lat,
            lng: lng
        }).success(function(response) {
            room.member = true;

            deferred.resolve();
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    Room.prototype.archive = function() {
        var room = this;
        var deferred = $q.defer();

        $http.post(api + '/' + room.rid + '/archive').success(function(response) {
            deferred.resolve();
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    Room.get = function(id) {
        var deferred = $q.defer();

        $http.get(api + '/' + id).success(function(response) {
            deferred.resolve(new Room(response.data));
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    Room.discover = function(lat, lng) {
        var deferred = $q.defer();

        var params = {
            'lat': lat,
            'lng': lng
        };

        $http({
            url: api + '/discover',
            method: 'GET',
            params: params
        }).success(function(response) {
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

    Room.prototype.getComments = function() {
        var room = this;
        var deferred = $q.defer();
        var url = api + '/' + room.rid +  '/comments';

        $http.get(url).success(function(response) {
            var data = response.data;

            var comments = [];
            data.forEach(function(elem) {
                comments.push(new Comment(elem));
            });

            deferred.resolve(comments);
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    Room.prototype.getMembers = function() {
        var room = this;
        var deferred = $q.defer();
        var url = api + '/' + room.rid +  '/members';

        $http.get(url).success(function(response) {
            deferred.resolve(response.data);
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    return Room;
});
