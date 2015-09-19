'use strict';

app.directive('backButton', function($rootScope, $timeout) {
    return function(scope, element, attrs) {
        element.bind('click', function() {
            $rootScope.back = true;

            // Hack: Give view time to update back
            $timeout(function() {
                history.back();

                $timeout(function() {
                    $rootScope.back = false;
                }, 1500);
            }, 1);
        });

        scope.$on('$destroy', function() {
            return element.unbind('click');
        });
    };
});
