'use strict';

app.controller('SettingsCtrl', function($scope, $http, Auth) {
    $scope.pageClass = 'page-settings';
    $scope.error = '';
    $scope.loading = false;

    $scope.save = function() {
        $scope.loading = true;
    };

    $scope.logout = function() {
        Auth.logout();
    };
});
