'use strict';

app.controller('LoginCtrl', function($scope, $location, Auth) {
    $scope.error = '';
    $scope.loading = false;

    $scope.login = function(username, password) {
        $scope.loading = true;

        Auth.login(username, password).success(function(response) {
            $location.path('/feed');
        }).error(function(response) {
            $scope.error = 'Invalid username/password.';
        }).then(function() {
            $scope.loading = false;
        });
    };
});
