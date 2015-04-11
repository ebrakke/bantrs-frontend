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
});
