'use strict';

app.factory('Room', function($rootScope, $http) {
    var api = $rootScope.config.api + '/room';

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

    Room.prototype.getComments = function() {
        var room = this;
        var url = api + '/' + room.rid +  '/comments';

        return $http.get(url).then(function(response) {
            return response.data;
        });
    };

    return Room;
});
