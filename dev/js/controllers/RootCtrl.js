'use strict';

app.controller('RootCtrl', function($scope, $location, Auth) {
    console.log('[isLogged]', Auth.isLogged());

    if (Auth.isLogged()) {
        $location.path('/feed');
    } else {
        $location.path('/login');
    }
});
