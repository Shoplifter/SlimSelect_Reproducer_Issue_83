module.exports = function(pref){
    if (!window.getComputedStyle) return false;
    var el = utl.inject(utl.el('p')),
        s = document.documentElement.style,
        i,
        supported = false;
    if('transform' in s) {
        el.style['transform'] = "translate3d(1px,1px,1px)";
        if(window.getComputedStyle(el).getPropertyValue('transform')) supported = true;
    }
    else {
        for(i=0; i < pref.length; i++) {
            if(pref[i]+'Transform' in s) {
                el.style[pref[i]+'Transform'] = "translate3d(1px,1px,1px)";
                if(window.getComputedStyle(el).getPropertyValue(pref[i].toLowerCase()+'-transform')) supported = true;
            }
        }
    }
    utl.remove_body();
    return supported;
}(require('../utl/_prefixes.js'), require('../utl/_inject.js'));