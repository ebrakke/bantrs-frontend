'use strict';

app.controller('RoomCtrl', function($rootScope, $scope, Room) {
    $scope.room = Room.get('955d0efbfe995480798028ee9637f130');
    $scope.comments = null;
    $scope.newComment = null;

    $scope.room.then(function(r) {
        $scope.room = r;
        console.log('[room]', $scope.room);

        $scope.room.getComments().then(function(c) {
            $scope.comments = c.data;
            console.log('[comments]', $scope.comments);
        });
    });

    $scope.postComment = function() {
        var comment = {
            'cid': 'bb5cc2bbd90a5d9bb81ce454d66d940c',
            'rid': '955d0efbfe995480798028ee9637f130',
            'author': {
                'uid': '0603152c09e0d7e37ad35bf8105df067',
                'username': 'tyler',
                'email': 'tylerwaltze@gmail.com',
            },
            'createdAt': new Date(),
            'comment': $scope.newComment
        };

        $scope.comments.push(comment);
        $scope.newComment = null;
    };
});
