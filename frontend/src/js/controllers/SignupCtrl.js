'use strict';

app.controller('SignupCtrl', function($scope, $location, User, Auth) {
    $scope.user = new User();
    $scope.error = '';
    $scope.loading = false;

    $scope.register = function() {
        $scope.loading = true;
        console.log('Signup.register', $scope.user);
        $scope.user.create().then(function(data) {

            Auth.setToken(data.bantrsAuth);
            Auth.setUser(data.user);

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
