'use strict';

app.directive('loader', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/templates/loader.html'
    };
});
