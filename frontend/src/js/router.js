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
	});
});
