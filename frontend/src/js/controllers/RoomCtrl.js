'use strict';

app.controller('RoomCtrl', function($routeParams, $scope, $interval, Room, Comment, Geolocation) {
    $scope.pageClass = 'page-room';

    $scope.room = null;
    $scope.comments = [];

    $scope.newComment = new Comment();
    $scope.newComment.room = {
        rid: $routeParams.rid
    };

    $scope.error = '';
    $scope.loading = false;

    Room.get($routeParams.rid).then(function(r) {
        $scope.room = r;

        getComments();
        $interval(getComments, 5000);
    }).finally(function() {
    });

    $scope.postComment = function() {
        $scope.loading = true;

        $scope.newComment.create().then(function(response) {
            getComments();
        }, function(response) {
            $scope.error = 'Error message.';
        }).finally(function() {
            $scope.newComment.comment = '';
            $scope.loading = false;
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
        });
    };
});
