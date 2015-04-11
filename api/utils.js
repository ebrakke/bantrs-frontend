/*
 * Wrapper for responses
 */
function envelope(code, data, err){
    if (err) {
        var data = {
            meta: {
                code: code,
                err: err.msg
            },
            data: {}
        }
        return data;
    }
    else {
        data = {
            meta: {
                code: code,
                err: {}
            },
            data: data
        };
        return data;
    }
}


// Object of functions to export
utils = {
    'envelope': envelope
};

// Export statement
module.exports = utils;
