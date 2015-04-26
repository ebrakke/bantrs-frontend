'use strict';

app.config(function($routeProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/pages/splash.html',
        controller: 'RootCtrl'
    }).when('/feed', {
        templateUrl: 'partials/pages/feed.html',
        controller: 'FeedCtrl'
    }).when('/discover', {
        templateUrl: 'partials/pages/discover.html',
        controller: 'DiscoverCtrl'
    }).when('/room/:rid', {
        templateUrl: 'partials/pages/room.html',
        controller: 'RoomCtrl'
    }).when('/create', {
        templateUrl: 'partials/pages/create.html',
        controller: 'CreateCtrl'
    }).when('/create/link', {
        templateUrl: 'partials/pages/create--link.html',
        controller: 'CreateCtrl'
    }).when('/create/location', {
        templateUrl: 'partials/pages/create--location.html',
    }).when('/login', {
        templateUrl: 'partials/pages/landing.html',
        controller: 'LoginCtrl'
    }).when('/signup', {
        templateUrl: 'partials/pages/signup.html',
        controller: 'SignupCtrl'
    }).when('/settings', {
        templateUrl: 'partials/pages/settings.html',
        controller: 'SettingsCtrl'
    });

    // Handle authentication requirements
    $httpProvider.interceptors.push(function($q, $location, $localStorage) {
        return {
            'request': function(config) {
                config.headers = config.headers || {};

                // If auth token exists, send it with each request
                if ($localStorage.token) {
                    config.headers.Authorization = $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                // If server responds with 401, user is not authorized.
                // Send them to login page.
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
});
