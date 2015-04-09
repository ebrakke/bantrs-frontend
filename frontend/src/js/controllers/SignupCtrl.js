'use strict';

app.controller('SignupCtrl', function($scope, User, Auth) {
    $scope.user = new User();
    $scope.error = '';

    $scope.register = function() {
        $scope.user.create().success(function(response) {
            $scope.error = 'Username already take.';
        }).error(function(response) {
            $scope.error = 'Username already take.';
        });
    };
});
