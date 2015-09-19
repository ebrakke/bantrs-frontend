'use strict';

app.factory('Geolocation', function($q, $window) {
    var Geolocation = {};

    var lat = null;
    var lng = null;

    Geolocation.getLocation = function() {
        var _self = this;
        var deferred = $q.defer();

        if ('geolocation' in navigator) {
            $window.navigator.geolocation.getCurrentPosition(function(position) {
                _self.setLatitude(position.coords.latitude);
                _self.setLongitude(position.coords.longitude);

                deferred.resolve(position);
            }, function(error) {
                deferred.reject(error);
            });
        } else {
            deferred.reject(new Error('Geolocation is not supported.'));
        }

        return deferred.promise;
    };

    Geolocation.getLatitude = function() {
        return lat;
    };

    Geolocation.setLatitude = function(l) {
        lat = l;
    };

    Geolocation.getLongitude = function() {
        return lng;
    };

    Geolocation.setLongitude = function(l) {
        lng = l;
    };

    return Geolocation;
});
