'use strict';

app.directive('backButton', function() {
    return function(scope, element, attrs) {
        element.bind('click', function() {
            history.back();
        });

        scope.$on('$destroy', function() {
            return element.unbind('click');
        });
    };
});
