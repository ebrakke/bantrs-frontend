'use strict';

app.controller('LoginCtrl', function($scope, $location, Auth) {
    $scope.error = '';
    $scope.loading = false;

    $scope.login = function(username, password) {
        $scope.loading = true;

        Auth.login(username, password).then(function(response) {
            $location.path('/feed');
        }, function(error) {
            $scope.error = error;
            $scope.loading = false;
        });
    };
});
