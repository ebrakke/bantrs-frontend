var validate = require('validate.js');
var VALIDATION_ERROR = {msg: 'Validation failed', code: 400};

exports.comment = function(req, res, next) {
    var commentData = req.body;
    var constraints = {
        room: {
            presence: true
        },
        comment: {
            presence: true
        }
    };
    var errors = validate(commentData, constraints);
    if (errors) {
        VALIDATION_ERROR.msg = errors;
        next(VALIDATION_ERROR);
        return;
    }
    next();
};
