/*
 * Wrapper for responses
 */
function envelope(data, err){
    if (err) {
        var data = {
            meta: {
                code: err.code,
                err: err.msg
            },
            data: {}
        }
        return data;
    }
    else {
        data = {
            meta: {
                code: 200,
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
