'use strict';

app.controller('SignupCtrl', function($scope, User, Auth) {
    $scope.user = new User();
    $scope.error = '';

    $scope.register = function() {
        $scope.user.create().success(function(data) {
            $scope.error = 'Username already take.';
        }).error(function(data) {
            $scope.error = 'Username already take.';
        });
    };
});
