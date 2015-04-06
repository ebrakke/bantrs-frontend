'use strict';

app.controller('LoginCtrl', function($scope, Auth) {
    $scope.error = '';

    $scope.login = function(username, password) {
        Auth.login(username, password);

        $scope.error = 'Invalid username/password.';
    };
});
