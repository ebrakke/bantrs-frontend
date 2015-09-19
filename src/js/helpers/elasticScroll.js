'use strict';

var disableElasticScroll = function() {
    var xStart = 0;
    var yStart = 0;

    document.addEventListener('touchstart', function(e) {
        xStart = e.touches[0].screenX;
        yStart = e.touches[0].screenY;
    });

    document.addEventListener('touchmove', function(e) {
        var xMovement = Math.abs(e.touches[0].screenX - xStart);
        var yMovement = Math.abs(e.touches[0].screenY - yStart);
        if ((yMovement * 3) > xMovement) {
            e.preventDefault();
        }
    });
};
