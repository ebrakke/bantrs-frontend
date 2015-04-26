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

function distance(lat1, lng1, lat2, lng2) {
    var deg2rad = function(deg) {
        return deg * (Math.PI/180)
    }
    var R = 6371000; // metres
    var φ1 = deg2rad(lat1);
    var φ2 = deg2rad(lat2);
    var Δφ = deg2rad(lat2-lat1);
    var Δλ = deg2rad(lng2-lng1);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d;
}

// Object of functions to export
utils = {
    'envelope': envelope,
    'distance': distance
};

// Export statement
module.exports = utils;
