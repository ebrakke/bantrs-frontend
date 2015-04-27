'use strict';

app.factory('Foursquare', function(config, $q, $http) {
    var api = config.foursquare.api;

    var Foursquare = {};

    Foursquare.search = function(lat, lng) {
        var deferred = $q.defer();

        var params = {
            'll': lat + ',' + lng,
            'client_id': config.foursquare.id,
            'client_secret': config.foursquare.secret,
            'v': '20150426',
            'callback': 'JSON_CALLBACK'
        };

        $http({
            url: api + '/venues/search',
            method: 'JSONP',
            params: params
        }).success(function(response) {
            var venues = response.venues;

            deferred.resolve(venues);
        }).error(function(error) {
            console.log(error);
            deferred.reject(error.meta.errorDetail);
        });

        return deferred.promise;
    };

    return Foursquare;
});
