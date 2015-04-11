'use strict';

app.controller('SignupCtrl', function($scope, User, Auth) {
    $scope.user = new User();
    $scope.error = '';
    $scope.loading = false;

    $scope.register = function() {
        $scope.loading = true;

        $scope.user.create().success(function(response) {

        }).error(function(response) {
            $scope.error = 'Username already taken.';
        }).then(function() {
            $scope.loading = false;
        });
    };
});
