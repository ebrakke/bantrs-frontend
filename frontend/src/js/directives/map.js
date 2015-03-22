'use strict';

app.directive('map', function($window) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            'controls': '=?'
        },
        template: '<section class="map"></section>',
        link: function(scope, element, attrs) {
            // Default to display controls
            if (typeof scope.controls === 'undefined') {
                scope.controls = true;
            }

            scope.locate = true;

            console.log('map.scope', scope);

            // Set lat and lng if not provided
            if (!scope.lat || !scope.lng) {
                scope.lat = 37.765558;
                scope.lng = -122.415504;
            }

            // Default to display controls
            if (typeof scope.controls === 'undefined') {
                scope.controls = true;
            }

            // Create map
            scope.map = L.map(attrs.id, {
                scrollWheelZoom: false,
                center: [scope.lat, scope.lng],
                zoom: 15,
                minZoom: 5,
                maxZoom: 20,
                keyboard: false,
                attributionControl: false,
                zoomControl: scope.controls
            });

            // Add map attributes
            if (scope.attr) {
                scope.map.addControl(L.control.attribution({
                    position: 'topright',
                    prefix: false
                }));
            }

            L.tileLayer(
                'https://{s}.tiles.mapbox.com/v3/phantomburn.jmgom0bf/{z}/{x}/{y}.png', {
                attribution: '<a href="">About Our Maps</a>'
            }).addTo(scope.map);

            // Set center of map to user's location
            scope.map.locate({
                setView: true,
                enableHighAccuracy: true,
                maxZoom: 15
            });

            // Wait for location be found
            scope.map.on('locationfound', function(e) {
                // Update map's center
                scope.lat = e.latlng.lat;
                scope.lng = e.latlng.lng;
            });
        }
    };
});
