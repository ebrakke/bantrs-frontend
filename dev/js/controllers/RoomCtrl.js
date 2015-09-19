'use strict';

app.controller('RoomCtrl', function($routeParams, $scope, Room, Comment, Geolocation) {
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
        postComment: false,
        join: false
    };

    Room.get($routeParams.rid).then(function(r) {
        $scope.room = r;

        getComments();
    }).finally(function() {
        $scope.loading.room = false;
    });

    $scope.postComment = function() {
        $scope.loading.postComment = true;

        $scope.newComment.create().then(function(response) {
            $scope.comments.push(angular.copy($scope.newComment));
            getComments();
        }, function(error) {
            $scope.error = error;
        }).finally(function() {
            $scope.newComment.comment = '';
            $scope.loading.postComment = false;
        });
    };

    $scope.join = function() {
        $scope.loading.join = true;

        Geolocation.getLocation().then(function(position) {
            $scope.room.join(position.coords.latitude, position.coords.longitude).then(function(response) {

            }, function(error) {

            }).finally(function() {
                $scope.loading.join = false;
            });
        });
    };

    // Method to continually load comments.
    // Once you load the room's comments, immediately
    // start loading them again.
    $scope.loadComments = true;
    var getComments = function() {
        console.log('[getComments]');
        $scope.room.getComments().then(function(c) {
            $scope.comments = c;

            // Recursively load comments.
            if ($scope.loadComments) {
                getComments();
            }
        }).finally(function() {
            $scope.loading.comments = false;
        });
    };

    $scope.$on('$destroy', function() {
        // Stop loading comments when the user
        // leaves the page.
        $scope.loadComments = false;
    });
});
