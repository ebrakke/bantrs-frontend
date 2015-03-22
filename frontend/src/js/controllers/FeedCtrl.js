'use strict';

app.controller('FeedCtrl', function($rootScope, $scope, User) {
    $scope.user = User.get('tyler');
    $scope.rooms = null;

    $scope.user.then(function(u) {
        $scope.user = u;
        console.log('[user]', $scope.user);

        $scope.user.getRooms().then(function(r) {
            $scope.rooms = r.data;
            console.log('[rooms]', $scope.rooms);
        });
    });
});
