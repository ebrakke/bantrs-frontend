'use strict';

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/pages/login.html',
		controller: 'LoginCtrl'
	}).when('/login', {
		templateUrl: 'partials/pages/login.html',
		controller: 'LoginCtrl'
	});
});
