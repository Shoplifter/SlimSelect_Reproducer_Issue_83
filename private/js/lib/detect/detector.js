module.exports = new function(t){
    t = {
        touch: require('./features/touch')
        //, cookie: require('./features/cookie')
        //, cssbackgroundsizecover: require('./features/backgroundSizeCover')
        //, csstransform: require('./features/csstransform.js')
        //, csstransform3d: require('./features/csstransform3d.js') /* not implemented*/
        //, csschecked: require('./features/csschecked.js') /* not implemented*/
        //, inlinesvg: require('./features/inlinesvg.js')
        //, placeholder: require('./features/placeholder.js')
        //, csstarget: require('./features/csstarget.js')
    };
    return {
        test: function(prop) {return t[prop];},
        modify: function(rt) {
            var k = rt.className,
                prop;
            for(prop in t) {
                var c = (t[prop] === false ? 'no-':'') + prop,
                    r = new RegExp('\\b(no-){0,1}'+prop+'\\b'),
                    m = k.match(r);
                if(!m) {k = k + ' ' + c;}
                else if(m[0] && m[0] !== c) { k = k.replace(r, c); }
            }
            rt.className = k;
        }
    }
}();