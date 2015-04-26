'use strict';

app.controller('RoomCtrl', function($rootScope, $routeParams, $scope, $interval, Room, Comment, Geolocation) {
    $scope.pageClass = 'page-room';

    $scope.room = null;
    $scope.comments = [];

    $scope.newComment = new Comment();
    $scope.newComment.room = {
        rid: $routeParams.rid
    };

    $scope.error = '';
    $scope.loading = {
        room: true,
        comments: true,
        postComment: false
    };

    Room.get($routeParams.rid).then(function(r) {
        $scope.room = r;

        getComments();

        // super ugly hack. Fix later.
        $rootScope.fetchComments = $interval(getComments, 5000);
    }).finally(function() {
        $scope.loading.room = false;
    });

    $scope.postComment = function() {
        $scope.loading.postComment = true;

        $scope.newComment.create().then(function(response) {
            getComments();
        }, function(response) {
            $scope.error = 'Error message.';
        }).finally(function() {
            $scope.newComment.comment = '';
            $scope.loading.postComment = false;
        });
    };

    $scope.join = function() {
        Geolocation.getLocation().then(function(position) {
            $scope.room.join(position.coords.latitude, position.coords.longitude).then(function(response) {

            }, function(error) {

            });
        });
    };

    var getComments = function() {
        console.log('[getComments]');
        $scope.room.getComments().then(function(c) {
            $scope.comments = c;
        }).finally(function() {
            $scope.loading.comments = false;
        });
    };
}).run(function($rootScope, $interval) {
    // More of the ugle hack.
    $rootScope.$on('$routeChangeStart', function() {
        $interval.cancel($rootScope.fetchComments);
    });
});
