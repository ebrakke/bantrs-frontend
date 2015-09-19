'use strict';

app.directive('feedItem', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            room: '=',
        },
        templateUrl: 'partials/templates/feed-item.html',
        link: function(scope, element, attrs) {
            scope.archive = function() {
                element.addClass('archiving');
                scope.room.active = false;

                scope.room.archive();
            };
        }
    };
});
