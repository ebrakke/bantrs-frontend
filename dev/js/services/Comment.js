'use strict';

app.factory('Comment', function(config, $q, $http) {
    var api = config.api + '/comment';

    var Comment = function(data) {
        angular.extend(this, data);
    };

    Comment.prototype.create = function() {
        var comment = this;
        var deferred = $q.defer();

        $http.post(api, {
            room: comment.room.rid,
            comment: comment.comment
        }).success(function(response) {
            var data = response.data;

            comment.cid = data.cid;
            comment.room = data.room;
            comment.author = data.author;
            comment.createdAt = data.createdAt;

            deferred.resolve();
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    Comment.get = function(id) {
        var deferred = $q.defer();

        $http.get(api + '/' + id).success(function(response) {
            var data = response.data;

            var comment = new Comment({
                cid: data.cid,
                room: data.room,
                author: data.author,
                createdAt: data.createdAt,
                comment: data.comment
            });

            deferred.resolve(comment);
        }).error(function(error) {
            deferred.reject(error.meta.err);
        });

        return deferred.promise;
    };

    return Comment;
});
