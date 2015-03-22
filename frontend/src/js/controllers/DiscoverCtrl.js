'use strict';

app.controller('DiscoverCtrl', function($rootScope, $scope, Room) {
    $scope.rooms = [];

    Room.discover().then(function(r) {
        $scope.rooms = r;
    });
});
