'use strict';

app.controller('CreateCtrl', function($scope, $http, $location, Room, Geolocation) {
    $scope.room = new Room();
    $scope.room.title = '';
    $scope.room.topic = {
        content: ''
    };
    $scope.room.location = {
        radius: 100,
    };

    Geolocation.getLocation().then(function(position) {
        $scope.room.location.lat = Geolocation.getLatitude();
        $scope.room.location.lng = Geolocation.getLongitude();
    });

    $scope.error = '';
    $scope.loading = false;

    $scope.create = function() {
        $scope.loading = true;

        $scope.room.create().then(function(response) {
            $location.path('/room/' + $scope.room.rid);
        }, function(response) {
            $scope.error = 'Error message.';
        }).finally(function() {
            $scope.loading = false;
        });
    };
});
