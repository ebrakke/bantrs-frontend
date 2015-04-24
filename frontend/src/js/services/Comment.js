'use strict';

app.factory('Comment', function(config, $http, User, Room) {
    var api = config.api + '/comment';

    var Comment = function(data) {
        angular.extend(this, data);
    };

    Comment.create = function() {
        var comment = this;

        return $http.post(api, {
            room: comment.room.rid,
            comment: comment.comment
        }).success(function(response) {
            var data = response.data;

            comment.cid = data.cid;
            comment.room = new Room(data.room);
            comment.author = new User(data.author);
            comment.createdAt = data.createdAt;
        }).error(function(response) {

        });
    };

    Comment.get = function(id) {
        return $http.get(api + '/' + id).success(function(response) {
            var data = response.data;

            return new Comment({
                cid: data.cid,
                room: new Room(data.room),
                author: new User(data.author),
                createdAt: data.createdAt,
                comment: data.comment
            });
        });
    };

    return Comment;
});
