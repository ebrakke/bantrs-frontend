'use strict';

app.controller('CreateCtrl', function($scope, $http, Room, $timeout) {
    $scope.pageClass = 'page-create';

    $scope.room = new Room();
    $scope.room.url = '';
    $scope.room.title = '';
    $scope.room.location = {
        radius: 100
    };

    $scope.error = '';
    $scope.loading = false;

    $scope.create = function() {
        $scope.loading = true;

        $scope.room.create().success(function(response) {

        }).error(function(response) {
            $scope.error = 'Error message.';
        }).then(function() {
            $timeout(function() {
                $scope.loading = false;
            }, 3000);
        });
    };
});
