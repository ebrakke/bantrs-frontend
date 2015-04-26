'use strict';

app.controller('CreateCtrl', function($scope, $http, Room, Geolocation) {
    $scope.pageClass = 'page-create';

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
            console.log('CreateCtrl.create', response);
        }, function(response) {
            $scope.error = 'Error message.';
        }).finally(function() {
            $scope.loading = false;
        });
    };
});
