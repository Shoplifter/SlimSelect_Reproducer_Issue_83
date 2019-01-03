/**
 * @see https://medium.com/@_jh3y/throttling-and-debouncing-in-javascript-b01cad5c8edf
 */
module.exports = function(fn, delay) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        return timeout = setTimeout(function() {
            return fn.apply(context, args);
        }, delay);
    }
};