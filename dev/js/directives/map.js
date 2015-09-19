'use strict';

app.directive('map', function($window, Geolocation) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            locate: '=?',
            controls: '=?',
            lat: '=?',
            lng: '=?',
            pinAtCenter: '=?',
            pinSource: '=?'
        },
        template: '<section class="map"><loader ng-if="!map"></loader></section>',
        link: function(scope, element, attrs) {
            var markers = {
                small: L.icon({
                    iconUrl: '/img/small.png',
                    iconRetinaUrl: '/img/small@2x.png',
                    iconSize: [30, 30],
                    iconAnchor: [13, 13],
                    popupAnchor: [0, 0],
                    className: 'animated fadeIn'
                }),
                medium: L.icon({
                    iconUrl: '/img/medium.png',
                    iconRetinaUrl: '/img/medium@2x.png',
                    iconSize: [34, 34],
                    iconAnchor: [17, 17],
                    popupAnchor: [0, 0],
                    className: 'animated fadeIn'
                }),
                large: L.icon({
                    iconUrl: '/img/large.png',
                    iconRetinaUrl: '/img/large@2x.png',
                    iconSize: [38, 38],
                    iconAnchor: [19, 19],
                    popupAnchor: [0, 0],
                    className: 'animated fadeIn'
                })
            };

            var createPinContent = function(data) {
                var content = '<a href="#/room/' + data.rid + '">';
                content += '<h5>' + data.title + '</h5>';
                content += '<ul class="horizontal-list">';
                content += '<li class="list-item">' + data.members + ' members</li>';
                content += '</ul';
                content += '</a>';

                return content;
            };

            var addPinToMap = function(data) {
                var icon;
                if (data.location.radius <= 100) {
                    icon = markers.small;
                } else if (data.location.radius <= 800) {
                    icon = markers.medium;
                } else {
                    icon = markers.large;
                }

                var marker = L.marker([data.location.lat, data.location.lng], {icon: icon}).addTo(scope.map);
                marker.bindPopup(createPinContent(data));
            };

            var buildMap = function() {
                scope.map = L.map(element[0], {
                    scrollWheelZoom: false,
                    center: [scope.lat, scope.lng],
                    zoom: 15,
                    minZoom: 5,
                    maxZoom: 20,
                    keyboard: false,
                    attributionControl: false,
                    zoomControl: scope.controls
                });

                L.tileLayer(
                    'https://{s}.tiles.mapbox.com/v3/phantomburn.jmgom0bf/{z}/{x}/{y}.png', {
                    attribution: '<a href="">About Our Maps</a>'
                }).addTo(scope.map);

                // Add pin to center of map
                if (scope.pinAtCenter) {
                    // Add pin at location
                    L.marker([scope.lat, scope.lng], {icon: markers.large}).addTo(scope.map);
                }
            };

            // Default to display controls
            if (typeof scope.controls === 'undefined') {
                scope.controls = true;
            }

            // Set lat and lng if not provided
            if (!scope.lat || !scope.lng) {
                scope.lat = 37.765558;
                scope.lng = -122.415504;
            }

            // Create map
            // Set center of map to user's location
            if (scope.locate) {
                Geolocation.getLocation().then(function(position) {
                    scope.lat = position.coords.latitude;
                    scope.lng = position.coords.longitude;

                    buildMap();
                });
            } else {
                buildMap();
            }

            if (scope.pinSource) {
                // Place initial pins
                if (scope.pinSource) {
                    scope.pinSource.forEach(function(obj) {
                        addPinToMap(obj);
                    });
                }

                // Place new pins that are added
                scope.$watch('pinSource', function(newValue, oldValue) {
                    // Create hash table of current pins
                    var oldIds = [];
                    oldValue.forEach(function(obj) {
                        if (obj) {
                            oldIds[obj.rid] = obj;
                        }
                    });

                    // Find new pins just added to array
                    var newPins = newValue.filter(function(obj) {
                        return !(obj.rid in oldIds);
                    });

                    // Plot each new pin on that map
                    newPins.forEach(function(obj) {
                        scope.pinSource.forEach(function(obj) {
                            addPinToMap(obj);
                        });
                    });
                }, true);
            }
        }
    };
});
