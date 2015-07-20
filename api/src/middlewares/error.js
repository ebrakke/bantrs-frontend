var handleError = function(err, req, res, next) {
    try {
        var meta = {code: err.code, err: err.msg};
        res.status(err.code).json({meta: meta, data: {}});
    } catch (e) {
        res.status(500).json({});
    }
};

module.exports = handleError;
