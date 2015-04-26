'use strict';

app.controller('SettingsCtrl', function($scope, $http, Auth) {
    $scope.pageClass = 'page-settings';

    $scope.error = '';
    $scope.loading = false;
    $scope.user = Auth.getUser();

    $scope.save = function() {
        $scope.loading = true;

        $scope.user.save().then(function(response) {

        }, function(error) {

        }).then(function() {
            $scope.loading = false;
        });
    };

    $scope.logout = function() {
        Auth.logout();
    };
});
