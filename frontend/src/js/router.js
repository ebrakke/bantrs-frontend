'use strict';

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        redirectTo: '/feed'
    }).when('/feed', {
        templateUrl: 'partials/pages/feed.html',
        controller: 'FeedCtrl'
    }).when('/discover', {
        templateUrl: 'partials/pages/discover.html',
        controller: 'DiscoverCtrl'
    }).when('/room', {
        templateUrl: 'partials/pages/room.html',
        controller: 'RoomCtrl'
    }).when('/create', {
        templateUrl: 'partials/pages/create.html'
    }).when('/create/link', {
        templateUrl: 'partials/pages/create--link.html'
    }).when('/create/location', {
        templateUrl: 'partials/pages/create--location.html',
    });
});
