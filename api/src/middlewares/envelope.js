var _ = require('lodash');

var envelope = function(req, res, next) {
    if (!res.locals.data) {
        next('No data');
        return;
    }
    res.status(200).json({
        meta: {
            code: 200,
            err: {}
        },
        data: res.locals.data});
};

module.exports = envelope;
