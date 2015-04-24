'use strict';

app.controller('FeedCtrl', function($scope, User) {
    $scope.pageClass = 'page-feed';
    $scope.user = User.get('tyler');
    $scope.rooms = null;

    $scope.user.then(function(u) {
        $scope.user = u;

        $scope.user.getRooms().then(function(r) {
            $scope.rooms = r.data;
            console.log('[rooms]', $scope.rooms);
        });
    });

    // Filter feed based on whether a room is archived or not.
    // Initially show active rooms.
    $scope.archived = false;
    $scope.showArchived = function(item) {
        return item.archived === $scope.archived;
    };
});
