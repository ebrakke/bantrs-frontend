'use strict';

app.controller('FeedCtrl', function($scope, User, Auth) {
    $scope.pageClass = 'page-feed';
    $scope.user = Auth.getUser();
    $scope.rooms = null;

    $scope.user.getRooms().then(function(r) {
        console.log(r);
        $scope.rooms = r;
    });

    // Filter feed based on whether a room is active or not.
    // Initially show active rooms.
    $scope.active = true;
    $scope.showArchived = function(item) {
        return item.active === $scope.active;
    };
});
