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
            $scope.error = response.data.meta.message;
        }).finally(function() {
            $scope.loading = false;
        });
    };
});
