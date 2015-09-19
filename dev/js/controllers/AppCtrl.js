'use strict';

app.controller('AppCtrl', function($scope, $route) {
    $scope.$on('$routeChangeSuccess', function(event, current) {
        $scope.transitionType = current.$$route.transition;
    });
});
