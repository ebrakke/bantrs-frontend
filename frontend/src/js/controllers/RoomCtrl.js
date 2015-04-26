'use strict';

app.controller('RoomCtrl', function($routeParams, $scope, Room, Comment, Geolocation) {
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

        $scope.room.getComments().then(function(c) {
            $scope.comments = c;
        });
    }).finally(function() {
    });

    $scope.postComment = function() {
        $scope.loading = true;

        $scope.newComment.create().then(function(response) {

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

    // $scope.getRootDomain = function(url) {
    //     var r = /:\/\/(.[^/]+)/;
    //     return url.match(r);
    // };
});
