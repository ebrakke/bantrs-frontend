/*
 * Wrapper for responses
 */
function envelope(output, error){
    if (error) {
        var data = {
            meta: {
                code: error
            },
            data: {}
        }
        return data;
    }
    else {
        data = {
            meta: {
                code: 200
            },
            data: output
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
