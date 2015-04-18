'use strict';

app.controller('SignupCtrl', function($scope, $location, User, Auth) {
    $scope.user = new User();
    $scope.error = '';
    $scope.loading = false;

    $scope.register = function() {
        $scope.loading = true;

        $scope.user.create().then(function(response) {
            var data = response.data;

            Auth.setToken(data.data.auth);
            Auth.setUser(data.data);

            $location.path('/feed');
        }, function(response) {
            if (response.data) {
                $scope.error = response.data.meta.err;
            } else {
                $scope.error = 'Unknown error.';
            }
        }).finally(function() {
            $scope.loading = false;
        });
    };
});
