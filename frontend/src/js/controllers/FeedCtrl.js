'use strict';

app.controller('FeedCtrl', function($scope, User, Auth) {
    $scope.pageClass = 'page-feed';
    $scope.user = Auth.getUser();
    $scope.rooms = null;

    $scope.user.getRooms().then(function(r) {
        console.log(r);
        $scope.rooms = r.data.data;
    });

    // Filter feed based on whether a room is archived or not.
    // Initially show active rooms.
    $scope.archived = false;
    $scope.showArchived = function(item) {
        return item.archived === $scope.archived;
    };
});
