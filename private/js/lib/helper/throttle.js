/**
 * @see https://medium.com/@_jh3y/throttling-and-debouncing-in-javascript-b01cad5c8edf
 */
module.exports = function(fn, limit) {
    var inThrottle,
        lastFn,
        lastRan;
    return function() {
        var context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastRan = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    fn.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan))
        }
    };
};