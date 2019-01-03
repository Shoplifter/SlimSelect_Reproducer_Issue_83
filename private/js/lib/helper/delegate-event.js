/**
 * @see https://gist.github.com/Daniel-Hug/abbded91dd55466e590b
 */
module.exports = function(el, selector, eventType, fn) {
    /* comment in following lines if closest polyfill NOT available */
    //var closest = (function() {
    //    /**
    //     * @type {HTMLElement|{mozMatchesSelector:boolean}}
    //     */
    //    var el = HTMLElement.prototype;
    //    var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    //    return function closest(el, selector) {
    //        if(el) return matches.call(el, selector) ? el : closest(el.parentElement, selector);
    //    };
    //})();
    (el || document).addEventListener(eventType, function(e) {
        //var target = closest(e.target, selector); /* if closest polyfill NOT available */
        var target = e.target.closest(selector); /* if closest polyfill available */
        if (target) { fn.call(target, e); }
    });
};