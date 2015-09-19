'use strict';

app.filter('rootDomain', function() {
    return function(url) {
        var r = /:\/\/(.[^/]+)/;
        return url.match(r) ? url.match(r)[1] : null;
    };
});
