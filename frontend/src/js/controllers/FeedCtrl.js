'use strict';

app.controller('FeedCtrl', function($rootScope, $scope, User) {
    $scope.user = User.get('tyler');
    $scope.rooms = null;

    $scope.user.then(function(u) {
        $scope.user = u;

        $scope.user.rooms().then(function(r) {
            $scope.rooms = r.data.rooms;

            console.log($scope.rooms);
        });
    });
});
