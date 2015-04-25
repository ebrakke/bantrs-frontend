'use strict';

app.controller('RoomCtrl', function($rootScope, $scope, $timeout, Room, Comment) {
    $scope.room = Room.get('955d0efbfe995480798028ee9637f130');
    $scope.comments = [];

    $scope.newComment = new Comment();
    $scope.newComment.room = {
        rid: '955d0efbfe995480798028ee9637f130'
    };

    $scope.error = '';
    $scope.loading = false;

    $scope.room.then(function(r) {
        $scope.room = r;
        console.log('[room]', $scope.room);

        $scope.room.getComments().then(function(c) {
            $scope.comments = c.data;
            console.log('[comments]', $scope.comments);
        });
    });

    $scope.postComment = function() {
        $scope.loading = true;

        // $scope.comments.push(comment);

        $scope.newComment.create().success(function(response) {

        }).error(function(response) {
            $scope.error = 'Error message.';
        }).then(function() {
            $scope.newComment.comment = '';
            $scope.loading = false;
        });
    };
});
