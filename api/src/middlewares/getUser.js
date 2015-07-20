var User = require('../models/User');

var getUser = function(req, res, next) {
    var user = new User();
    if (req.params.username) {
        user.username = req.params.username;
        user.get().then(function() {
            res.locals.user = user;
            return;
        }).fail(function(err) {
            next(err);
            return;
        });
    }
    next({err: 'No username supplied', code: 400});
};

module.exports = getUser;
