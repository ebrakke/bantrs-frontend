'use strict';

app.controller('CreateCtrl', function($scope, $http, $location, Room, Foursquare, Geolocation) {
    $scope.error = '';
    $scope.loading = false;

    $scope.room = new Room();
    $scope.room.title = '';
    $scope.room.topic = {
        content: ''
    };
    $scope.room.location = {
        radius: 100,
    };

    $scope.nearbyLocations = [];

    Geolocation.getLocation().then(function(position) {
        $scope.room.location.lat = Geolocation.getLatitude();
        $scope.room.location.lng = Geolocation.getLongitude();

        Foursquare.search(Geolocation.getLatitude(), Geolocation.getLongitude()).then(function(venues) {
            $scope.nearbyLocations = venues;
        });
    });

    $scope.autoSuggest = function(s) {
        var name = s.name.toLowerCase();
        var input = $scope.room.topic.content.toLowerCase();
        return name.indexOf(input) > -1 && input.length > 0 && name !== input;
    };

    $scope.selectSuggestion = function(v) {
        $scope.room.topic.content = v;
    };

    $scope.create = function() {
        $scope.loading = true;

        $scope.room.create().then(function(response) {
            $location.path('/room/' + $scope.room.rid);
        }, function(response) {
            $scope.error = 'Error message.';
        }).finally(function() {
            $scope.loading = false;
        });
    };
});
