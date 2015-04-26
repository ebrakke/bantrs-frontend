'use strict';

app.controller('SettingsCtrl', function($scope, $http, Auth) {
    $scope.error = '';
    $scope.loading = false;
    $scope.user = Auth.getUser();

    $scope.save = function() {
        $scope.loading = true;

        $scope.user.save().then(function(data) {
            Auth.setUser(data.user);

            if (data.bantrsAuth) {
                Auth.setToken(data.bantrsAuth);
            }
        }, function(error) {

        }).then(function() {
            $scope.loading = false;
        });
    };

    $scope.logout = function() {
        Auth.logout();
    };
});
