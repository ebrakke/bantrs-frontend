'use strict';

app.directive('circularNav', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: true,
        templateUrl: 'partials/templates/circularNav/circularNav.html',
        controller: function($scope) {
            var ctrl = this;
            var items = [];

            ctrl.addItem = function addItem(scope, elem) {
                items.push({
                    'scope': scope,
                    'element': elem
                });

                var angle = 180 / items.length;
                var skew = 90 - angle;
                for (var i = 0; i < items.length; i++) {
                    var rotate = i * angle;
                    var item = items[i].element;

                    item.css({
                        transform: 'rotate(' + rotate + 'deg) skew(' + skew + 'deg)'
                    });

                    var link = angular.element(item.children('.circularNav__item__content')[0]);
                    link.css({
                        transform: 'skew(' + -skew + 'deg) rotate(' + -angle + 'deg) scale(1)'
                    });
                }
            };
        },
        link: function(scope, elem, attrs, navCtrl) {
            scope.active = false;

            scope.toggle = function() {
                scope.active = !scope.active;
            };
        }
    };
});

app.directive('circularItem', function() {
    return {
        require: '^circularNav',
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            url: '@'
        },
        templateUrl: 'partials/templates/circularNav/circularNavItem.html',
        link: function(scope, elem, attrs, navCtrl) {
            navCtrl.addItem(scope, elem);
        }
    };
});
