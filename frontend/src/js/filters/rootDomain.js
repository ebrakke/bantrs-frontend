'use strict';

app.filter('rootDomain', function() {
    return function(url) {
        console.log('rootDomain', url);

        var r = /:\/\/(.[^/]+)/;
        return url.match(r) ? url.match(r)[1] : null;
    };
});
