'use strict';

app.controller('LoginCtrl', function($scope, $location, Auth) {
    $scope.error = '';
    $scope.loading = false;

    $scope.login = function(username, password) {
        $scope.loading = true;
        console.log(username, password);
        Auth.login(username, password).then(function(response) {
            console.log(response);
            $location.path('/feed');
        }, function(response) {
            if (response.data) {
                $scope.error = response.data.meta.err;
            } else {
                $scope.error = 'Unknown error.';
            }
        }).finally(function() {
            $scope.loading = false;
        });
    };
});
