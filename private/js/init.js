window.$ = new function (d, rt, e /* public */, i /* private */) {
    e.start = new Date().getTime();
    e.getRuntime = function(){return (new Date().getTime() - $.start);}; /* milliseconds */
    e.js = require('./lib/init/script.js'); /* https://github.com/ded/script.js */
    i.src = require('./lib/init/src.js');
    e.js(i.src('app'), 'bundle');
    e.domready = require('./lib/init/ready.js'); /* IE9+ https://github.com/ded/domready/tree/master */
    e.detector = require('./lib/detect/detector.js');
    rt.className = rt.className.replace(/\bno-js\b/,'js');
    e.detector.modify(rt);
    e.lang =  d.documentElement.getAttribute('lang');
    e.ready = function(cb){e.domready(function(){e.js.ready('bundle', cb)})};
    e.ready(function(){console.log($.getRuntime(), 'ready')});
    e.domready(function(){console.log($.getRuntime(), 'domready')});
    e.js.ready('bundle', function(){console.log($.getRuntime(), 'js loaded')});
    return e;
}(document, document.documentElement, {}, {});