'use strict';

app.controller('FeedCtrl', function($scope, User, Auth) {
    $scope.user = Auth.getUser();
    $scope.rooms = null;
    $scope.loading = {
        rooms: true
    };

    $scope.user.getRooms().then(function(r) {
        $scope.rooms = r;
    }).finally(function() {
        $scope.loading.rooms = false;
    });

    // Filter feed based on whether a room is active or not.
    // Initially show active rooms.
    $scope.active = true;
    $scope.showArchived = function(item) {
        return item.active === $scope.active;
    };
});
