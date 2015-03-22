'use strict';

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/pages/feed.html',
		controller: 'FeedCtrl'
	});
});
