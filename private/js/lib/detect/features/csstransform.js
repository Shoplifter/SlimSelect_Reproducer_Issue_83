module.exports = function(pref){
    if(navigator.userAgent.indexOf('Android 2.') !== -1) return false; // rule out false positives
    var s = document.documentElement.style;
    if('transform' in s) return true;
    /** @type {{prefixes:Array}} */
    for(var i=0; i < pref.length; i++) {
        if(pref[i]+'Transform' in s) return true;
    }
}(require('../utl/_prefixes.js'));