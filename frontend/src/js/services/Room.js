'use strict';

app.factory('Room', function(config, $http) {
    var api = config.api + '/room';

    var Room = function(data) {
        angular.extend(this, data);
    };

    Room.prototype.create = function() {
        var room = this;

        return $http.post(api, room).then(function(response) {
            return response.data;
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
        });
    };

    Room.prototype.getComments = function() {
        var room = this;
        var url = api + '/' + room.rid +  '/comments';

        return $http.get(url).then(function(response) {
            return response.data;
        });
    };

    return Room;
});
