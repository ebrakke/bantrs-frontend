'use strict';

app.controller('RoomCtrl', function($rootScope, $scope, Room) {
    $scope.room = Room.get('955d0efbfe995480798028ee9637f130');
    $scope.comments = null;

    $scope.room.then(function(r) {
        $scope.room = r;
        console.log('[room]', $scope.room);

        $scope.room.getComments().then(function(c) {
            $scope.comments = c.data;
            console.log('[comments]', $scope.comments);
        });
    });
});
