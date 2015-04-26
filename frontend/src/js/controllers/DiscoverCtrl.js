'use strict';

app.controller('DiscoverCtrl', function($rootScope, $scope, Room, Geolocation) {
    $scope.pageClass = 'page-discover';
    $scope.rooms = [];

    Geolocation.getLocation().then(function(position) {
        Room.discover(position.coords.latitude, position.coords.longitude).then(function(r) {
            $scope.rooms = r;
        });
    });
});
