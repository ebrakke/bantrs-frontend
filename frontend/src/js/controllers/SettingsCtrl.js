'use strict';

app.controller('SettingsCtrl', function($scope, $http) {
    $scope.pageClass = 'page-settings';
    $scope.error = '';
    $scope.loading = false;

    $scope.save = function() {
        $scope.loading = true;
    };
});
