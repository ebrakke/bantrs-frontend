'use strict';

app.factory('Room', function(config, $http, Comment) {
    var api = config.api + '/room';

    var Room = function(data) {
        angular.extend(this, data);
    };

    Room.prototype.create = function() {
        var room = this;

        return $http.post(api, {
            title: room.title,
            topic: room.topic.content,
            lat: room.location.lat,
            lng: room.location.lng,
            radius: room.location.radius
        }).then(function(response, status) {
            var data = response.data.data;

            room.author = data.author;
            room.topic.type = data.topic.type;
            room.members = data.members;
            room.newComments = data.newComments;
            room.member = data.member;
            room.archived = data.archived;
            room.createdAt = data.createdAt;
        }, function(response, status) {
            return status;
        });
    };

    Room.prototype.save = function() {
        var room = this;

        return $http.post(api + '/' + room.rid, {
            title: room.title,
            radius: room.location.radius
        }).success(function(response) {

        }).error(function(response) {

        });
    };

    Room.prototype.join = function(lat, lng) {
        var room = this;

        return $http.post(api + '/' + room.rid + '/join', {
            lat: lat,
            lng: lng
        }).success(function(response) {

        }).error(function(response) {

        });
    };

    Room.prototype.archive = function() {
        var room = this;

        return $http.post(api + '/' + room.rid + '/archive').success(function(response) {

        }).error(function(response) {

        });
    };

    Room.get = function(id) {
        return $http.get(api + '/' + id).then(function(response) {
            return new Room(response.data.data);
        });
    };

    Room.discover = function(lat, lng) {
        var params = {
            'lat': lat,
            'lng': lng
        };

        return $http({
            url: api + '/discover',
            method: 'GET',
            params: params
        }).then(function(response) {
            var data = response.data.data;

            var rooms = [];
            data.forEach(function(elem) {
                rooms.push(new Room(elem));
            });

            return rooms;
        }, function(error) {
        });
    };

    Room.prototype.getComments = function() {
        var room = this;
        var url = api + '/' + room.rid +  '/comments';

        return $http.get(url).then(function(response) {
            var data = response.data.data;

            var comments = [];
            data.forEach(function(elem) {
                comments.push(new Comment(elem));
            });

            return comments;
        });
    };

    Room.prototype.getMembers = function() {
        var room = this;
        var url = api + '/' + room.rid +  '/members';

        return $http.get(url).then(function(response) {
            return response.data;
        });
    };

    return Room;
});
