(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./lib/detect/detector.js":2,"./lib/init/ready.js":4,"./lib/init/script.js":5,"./lib/init/src.js":6}],2:[function(require,module,exports){
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
},{"./features/touch":3}],3:[function(require,module,exports){
module.exports = (('ontouchstart' in window) || window.DocumentTouch && document.documentElement instanceof DocumentTouch) || false;
},{}],4:[function(require,module,exports){
module.exports = new function () {
  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener);
    loaded = 1;
    while (listener = fns.shift()) listener()
  });
  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }
}();
},{}],5:[function(require,module,exports){
module.exports = function () {
  var doc = document
    , head = doc.getElementsByTagName('head')[0]
  //, s = 'string' /* comment out by <tb@arbyte.net> as var is not needed */
    , f = false
    , push = 'push'
    , readyState = 'readyState'
    , onreadystatechange = 'onreadystatechange'
    , list = {}
    , ids = {}
    , delay = {}
    , scripts = {}
    , scriptpath
    , urlArgs
    ;

  function every(ar, fn) {
    for (var i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f;
    return 1
  }
  function each(ar, fn) {
    every(ar, function (el) {
      fn(el);
      return 1
    })
  }

  function $script(paths, idOrDone, optDone) {
    paths = paths[push] ? paths : [paths];
    var idOrDoneIsDone = idOrDone && idOrDone.call
      , done = idOrDoneIsDone ? idOrDone : optDone
      , id = idOrDoneIsDone ? paths.join('') : idOrDone
      , queue = paths.length;
    function loopFn(item) {
      return item.call ? item() : list[item]
    }
    function callback() {
      if (!--queue) {
        list[id] = 1;
        done && done();
        for (var dset in delay) {
          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = [])
        }
      }
    }
    setTimeout(function () {
      each(paths, function loading(path, force) {
        if (path === null) return callback();
        
        if (!force && !/^https?:\/\//.test(path) && scriptpath) {
          path = (path.indexOf('.js') === -1) ? scriptpath + path + '.js' : scriptpath + path;
        }
        
        if (scripts[path]) {
          if (id) ids[id] = 1;
          return (scripts[path] === 2) ? callback() : setTimeout(function () { loading(path, true) }, 0)
        }

        scripts[path] = 1;
        if (id) ids[id] = 1;
        create(path, callback)
      })
    }, 0);
    return $script
  }

  function create(path, fn) {
    var el = doc.createElement('script'), loaded;
    el.onload = el.onerror = el[onreadystatechange] = function () {
      if ((el[readyState] && !(/^c|loade/.test(el[readyState]))) || loaded) return;
      el.onload = el[onreadystatechange] = null;
      loaded = 1;
      scripts[path] = 2;
      fn()
    };
    el.async = 1;
    el.src = urlArgs ? path + (path.indexOf('?') === -1 ? '?' : '&') + urlArgs : path;
    head.insertBefore(el, head.lastChild)
  }

  $script.get = create;

  $script.order = function (scripts, id, done) {
    (function callback(s) {
      s = scripts.shift();
      !scripts.length ? $script(s, id, done) : $script(s, callback)
    }())
  };

  $script.path = function (p) {
    scriptpath = p
  };
  $script.urlArgs = function (str) {
    urlArgs = str;
  };
  $script.ready = function (deps, ready, req) {
    deps = deps[push] ? deps : [deps];
    var missing = [];
    !each(deps, function (dep) {
      list[dep] || missing[push](dep);
    }) && every(deps, function (dep) {return list[dep]}) ?
      ready() : !function (key) {
      delay[key] = delay[key] || [];
      delay[key][push](ready);
      req && req(missing)
    }(deps.join('|'));
    return $script
  };

  $script.done = function (idOrDone) {
    $script([null], idOrDone)
  };

  return $script
}();

},{}],6:[function(require,module,exports){
module.exports = function() {
    var s = document.getElementsByTagName('script'),
        l = arguments.length,
        p = [], i = 0, m;
    while(s[i]) {
        /* basePath = m[1], fingerprintSuffix = m[2] */
        //m = s[i].getAttribute('src').match(/^(.*)init(\.[0-9a-f]{32})?\.js$/); // md5 hashed
        m = s[i].getAttribute('src').match(/^(.*)init(\.[0-9a-f]{8})?\.js$/); // crc32b hashed
        if(!m) continue;
        for (i = 0; i < l; ++i) {
            p[i] = m[1] + arguments[i] + (m[2] || '') + '.js';
        }
        return p;
    }
    return null;
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VzZXJzL2JhdW0vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwicHJpdmF0ZS9qcy9pbml0LmpzIiwicHJpdmF0ZS9qcy9saWIvZGV0ZWN0L2RldGVjdG9yLmpzIiwicHJpdmF0ZS9qcy9saWIvZGV0ZWN0L2ZlYXR1cmVzL3RvdWNoLmpzIiwicHJpdmF0ZS9qcy9saWIvaW5pdC9yZWFkeS5qcyIsInByaXZhdGUvanMvbGliL2luaXQvc2NyaXB0LmpzIiwicHJpdmF0ZS9qcy9saWIvaW5pdC9zcmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ3aW5kb3cuJCA9IG5ldyBmdW5jdGlvbiAoZCwgcnQsIGUgLyogcHVibGljICovLCBpIC8qIHByaXZhdGUgKi8pIHtcclxuICAgIGUuc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIGUuZ2V0UnVudGltZSA9IGZ1bmN0aW9uKCl7cmV0dXJuIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtICQuc3RhcnQpO307IC8qIG1pbGxpc2Vjb25kcyAqL1xyXG4gICAgZS5qcyA9IHJlcXVpcmUoJy4vbGliL2luaXQvc2NyaXB0LmpzJyk7IC8qIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvc2NyaXB0LmpzICovXHJcbiAgICBpLnNyYyA9IHJlcXVpcmUoJy4vbGliL2luaXQvc3JjLmpzJyk7XHJcbiAgICBlLmpzKGkuc3JjKCdhcHAnKSwgJ2J1bmRsZScpO1xyXG4gICAgZS5kb21yZWFkeSA9IHJlcXVpcmUoJy4vbGliL2luaXQvcmVhZHkuanMnKTsgLyogSUU5KyBodHRwczovL2dpdGh1Yi5jb20vZGVkL2RvbXJlYWR5L3RyZWUvbWFzdGVyICovXHJcbiAgICBlLmRldGVjdG9yID0gcmVxdWlyZSgnLi9saWIvZGV0ZWN0L2RldGVjdG9yLmpzJyk7XHJcbiAgICBydC5jbGFzc05hbWUgPSBydC5jbGFzc05hbWUucmVwbGFjZSgvXFxibm8tanNcXGIvLCdqcycpO1xyXG4gICAgZS5kZXRlY3Rvci5tb2RpZnkocnQpO1xyXG4gICAgZS5sYW5nID0gIGQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbGFuZycpO1xyXG4gICAgZS5yZWFkeSA9IGZ1bmN0aW9uKGNiKXtlLmRvbXJlYWR5KGZ1bmN0aW9uKCl7ZS5qcy5yZWFkeSgnYnVuZGxlJywgY2IpfSl9O1xyXG4gICAgZS5yZWFkeShmdW5jdGlvbigpe2NvbnNvbGUubG9nKCQuZ2V0UnVudGltZSgpLCAncmVhZHknKX0pO1xyXG4gICAgZS5kb21yZWFkeShmdW5jdGlvbigpe2NvbnNvbGUubG9nKCQuZ2V0UnVudGltZSgpLCAnZG9tcmVhZHknKX0pO1xyXG4gICAgZS5qcy5yZWFkeSgnYnVuZGxlJywgZnVuY3Rpb24oKXtjb25zb2xlLmxvZygkLmdldFJ1bnRpbWUoKSwgJ2pzIGxvYWRlZCcpfSk7XHJcbiAgICByZXR1cm4gZTtcclxufShkb2N1bWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7fSwge30pOyIsIm1vZHVsZS5leHBvcnRzID0gbmV3IGZ1bmN0aW9uKHQpe1xyXG4gICAgdCA9IHtcclxuICAgICAgICB0b3VjaDogcmVxdWlyZSgnLi9mZWF0dXJlcy90b3VjaCcpXHJcbiAgICAgICAgLy8sIGNvb2tpZTogcmVxdWlyZSgnLi9mZWF0dXJlcy9jb29raWUnKVxyXG4gICAgICAgIC8vLCBjc3NiYWNrZ3JvdW5kc2l6ZWNvdmVyOiByZXF1aXJlKCcuL2ZlYXR1cmVzL2JhY2tncm91bmRTaXplQ292ZXInKVxyXG4gICAgICAgIC8vLCBjc3N0cmFuc2Zvcm06IHJlcXVpcmUoJy4vZmVhdHVyZXMvY3NzdHJhbnNmb3JtLmpzJylcclxuICAgICAgICAvLywgY3NzdHJhbnNmb3JtM2Q6IHJlcXVpcmUoJy4vZmVhdHVyZXMvY3NzdHJhbnNmb3JtM2QuanMnKSAvKiBub3QgaW1wbGVtZW50ZWQqL1xyXG4gICAgICAgIC8vLCBjc3NjaGVja2VkOiByZXF1aXJlKCcuL2ZlYXR1cmVzL2Nzc2NoZWNrZWQuanMnKSAvKiBub3QgaW1wbGVtZW50ZWQqL1xyXG4gICAgICAgIC8vLCBpbmxpbmVzdmc6IHJlcXVpcmUoJy4vZmVhdHVyZXMvaW5saW5lc3ZnLmpzJylcclxuICAgICAgICAvLywgcGxhY2Vob2xkZXI6IHJlcXVpcmUoJy4vZmVhdHVyZXMvcGxhY2Vob2xkZXIuanMnKVxyXG4gICAgICAgIC8vLCBjc3N0YXJnZXQ6IHJlcXVpcmUoJy4vZmVhdHVyZXMvY3NzdGFyZ2V0LmpzJylcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRlc3Q6IGZ1bmN0aW9uKHByb3ApIHtyZXR1cm4gdFtwcm9wXTt9LFxyXG4gICAgICAgIG1vZGlmeTogZnVuY3Rpb24ocnQpIHtcclxuICAgICAgICAgICAgdmFyIGsgPSBydC5jbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgICBwcm9wO1xyXG4gICAgICAgICAgICBmb3IocHJvcCBpbiB0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9ICh0W3Byb3BdID09PSBmYWxzZSA/ICduby0nOicnKSArIHByb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgciA9IG5ldyBSZWdFeHAoJ1xcXFxiKG5vLSl7MCwxfScrcHJvcCsnXFxcXGInKSxcclxuICAgICAgICAgICAgICAgICAgICBtID0gay5tYXRjaChyKTtcclxuICAgICAgICAgICAgICAgIGlmKCFtKSB7ayA9IGsgKyAnICcgKyBjO31cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYobVswXSAmJiBtWzBdICE9PSBjKSB7IGsgPSBrLnJlcGxhY2UociwgYyk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBydC5jbGFzc05hbWUgPSBrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpOyIsIm1vZHVsZS5leHBvcnRzID0gKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpIHx8IGZhbHNlOyIsIm1vZHVsZS5leHBvcnRzID0gbmV3IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgZm5zID0gW10sIGxpc3RlbmVyXHJcbiAgICAsIGRvYyA9IGRvY3VtZW50XHJcbiAgICAsIGhhY2sgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsXHJcbiAgICAsIGRvbUNvbnRlbnRMb2FkZWQgPSAnRE9NQ29udGVudExvYWRlZCdcclxuICAgICwgbG9hZGVkID0gKGhhY2sgPyAvXmxvYWRlZHxeYy8gOiAvXmxvYWRlZHxeaXxeYy8pLnRlc3QoZG9jLnJlYWR5U3RhdGUpO1xyXG5cclxuICBpZiAoIWxvYWRlZClcclxuICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyKTtcclxuICAgIGxvYWRlZCA9IDE7XHJcbiAgICB3aGlsZSAobGlzdGVuZXIgPSBmbnMuc2hpZnQoKSkgbGlzdGVuZXIoKVxyXG4gIH0pO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcclxuICAgIGxvYWRlZCA/IHNldFRpbWVvdXQoZm4sIDApIDogZm5zLnB1c2goZm4pXHJcbiAgfVxyXG59KCk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGRvYyA9IGRvY3VtZW50XHJcbiAgICAsIGhlYWQgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxyXG4gIC8vLCBzID0gJ3N0cmluZycgLyogY29tbWVudCBvdXQgYnkgPHRiQGFyYnl0ZS5uZXQ+IGFzIHZhciBpcyBub3QgbmVlZGVkICovXHJcbiAgICAsIGYgPSBmYWxzZVxyXG4gICAgLCBwdXNoID0gJ3B1c2gnXHJcbiAgICAsIHJlYWR5U3RhdGUgPSAncmVhZHlTdGF0ZSdcclxuICAgICwgb25yZWFkeXN0YXRlY2hhbmdlID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcclxuICAgICwgbGlzdCA9IHt9XHJcbiAgICAsIGlkcyA9IHt9XHJcbiAgICAsIGRlbGF5ID0ge31cclxuICAgICwgc2NyaXB0cyA9IHt9XHJcbiAgICAsIHNjcmlwdHBhdGhcclxuICAgICwgdXJsQXJnc1xyXG4gICAgO1xyXG5cclxuICBmdW5jdGlvbiBldmVyeShhciwgZm4pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gYXIubGVuZ3RoOyBpIDwgajsgKytpKSBpZiAoIWZuKGFyW2ldKSkgcmV0dXJuIGY7XHJcbiAgICByZXR1cm4gMVxyXG4gIH1cclxuICBmdW5jdGlvbiBlYWNoKGFyLCBmbikge1xyXG4gICAgZXZlcnkoYXIsIGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBmbihlbCk7XHJcbiAgICAgIHJldHVybiAxXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gJHNjcmlwdChwYXRocywgaWRPckRvbmUsIG9wdERvbmUpIHtcclxuICAgIHBhdGhzID0gcGF0aHNbcHVzaF0gPyBwYXRocyA6IFtwYXRoc107XHJcbiAgICB2YXIgaWRPckRvbmVJc0RvbmUgPSBpZE9yRG9uZSAmJiBpZE9yRG9uZS5jYWxsXHJcbiAgICAgICwgZG9uZSA9IGlkT3JEb25lSXNEb25lID8gaWRPckRvbmUgOiBvcHREb25lXHJcbiAgICAgICwgaWQgPSBpZE9yRG9uZUlzRG9uZSA/IHBhdGhzLmpvaW4oJycpIDogaWRPckRvbmVcclxuICAgICAgLCBxdWV1ZSA9IHBhdGhzLmxlbmd0aDtcclxuICAgIGZ1bmN0aW9uIGxvb3BGbihpdGVtKSB7XHJcbiAgICAgIHJldHVybiBpdGVtLmNhbGwgPyBpdGVtKCkgOiBsaXN0W2l0ZW1dXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjYWxsYmFjaygpIHtcclxuICAgICAgaWYgKCEtLXF1ZXVlKSB7XHJcbiAgICAgICAgbGlzdFtpZF0gPSAxO1xyXG4gICAgICAgIGRvbmUgJiYgZG9uZSgpO1xyXG4gICAgICAgIGZvciAodmFyIGRzZXQgaW4gZGVsYXkpIHtcclxuICAgICAgICAgIGV2ZXJ5KGRzZXQuc3BsaXQoJ3wnKSwgbG9vcEZuKSAmJiAhZWFjaChkZWxheVtkc2V0XSwgbG9vcEZuKSAmJiAoZGVsYXlbZHNldF0gPSBbXSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBlYWNoKHBhdGhzLCBmdW5jdGlvbiBsb2FkaW5nKHBhdGgsIGZvcmNlKSB7XHJcbiAgICAgICAgaWYgKHBhdGggPT09IG51bGwpIHJldHVybiBjYWxsYmFjaygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghZm9yY2UgJiYgIS9eaHR0cHM/OlxcL1xcLy8udGVzdChwYXRoKSAmJiBzY3JpcHRwYXRoKSB7XHJcbiAgICAgICAgICBwYXRoID0gKHBhdGguaW5kZXhPZignLmpzJykgPT09IC0xKSA/IHNjcmlwdHBhdGggKyBwYXRoICsgJy5qcycgOiBzY3JpcHRwYXRoICsgcGF0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHNjcmlwdHNbcGF0aF0pIHtcclxuICAgICAgICAgIGlmIChpZCkgaWRzW2lkXSA9IDE7XHJcbiAgICAgICAgICByZXR1cm4gKHNjcmlwdHNbcGF0aF0gPT09IDIpID8gY2FsbGJhY2soKSA6IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBsb2FkaW5nKHBhdGgsIHRydWUpIH0sIDApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzY3JpcHRzW3BhdGhdID0gMTtcclxuICAgICAgICBpZiAoaWQpIGlkc1tpZF0gPSAxO1xyXG4gICAgICAgIGNyZWF0ZShwYXRoLCBjYWxsYmFjaylcclxuICAgICAgfSlcclxuICAgIH0sIDApO1xyXG4gICAgcmV0dXJuICRzY3JpcHRcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZShwYXRoLCBmbikge1xyXG4gICAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLCBsb2FkZWQ7XHJcbiAgICBlbC5vbmxvYWQgPSBlbC5vbmVycm9yID0gZWxbb25yZWFkeXN0YXRlY2hhbmdlXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKChlbFtyZWFkeVN0YXRlXSAmJiAhKC9eY3xsb2FkZS8udGVzdChlbFtyZWFkeVN0YXRlXSkpKSB8fCBsb2FkZWQpIHJldHVybjtcclxuICAgICAgZWwub25sb2FkID0gZWxbb25yZWFkeXN0YXRlY2hhbmdlXSA9IG51bGw7XHJcbiAgICAgIGxvYWRlZCA9IDE7XHJcbiAgICAgIHNjcmlwdHNbcGF0aF0gPSAyO1xyXG4gICAgICBmbigpXHJcbiAgICB9O1xyXG4gICAgZWwuYXN5bmMgPSAxO1xyXG4gICAgZWwuc3JjID0gdXJsQXJncyA/IHBhdGggKyAocGF0aC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHVybEFyZ3MgOiBwYXRoO1xyXG4gICAgaGVhZC5pbnNlcnRCZWZvcmUoZWwsIGhlYWQubGFzdENoaWxkKVxyXG4gIH1cclxuXHJcbiAgJHNjcmlwdC5nZXQgPSBjcmVhdGU7XHJcblxyXG4gICRzY3JpcHQub3JkZXIgPSBmdW5jdGlvbiAoc2NyaXB0cywgaWQsIGRvbmUpIHtcclxuICAgIChmdW5jdGlvbiBjYWxsYmFjayhzKSB7XHJcbiAgICAgIHMgPSBzY3JpcHRzLnNoaWZ0KCk7XHJcbiAgICAgICFzY3JpcHRzLmxlbmd0aCA/ICRzY3JpcHQocywgaWQsIGRvbmUpIDogJHNjcmlwdChzLCBjYWxsYmFjaylcclxuICAgIH0oKSlcclxuICB9O1xyXG5cclxuICAkc2NyaXB0LnBhdGggPSBmdW5jdGlvbiAocCkge1xyXG4gICAgc2NyaXB0cGF0aCA9IHBcclxuICB9O1xyXG4gICRzY3JpcHQudXJsQXJncyA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgIHVybEFyZ3MgPSBzdHI7XHJcbiAgfTtcclxuICAkc2NyaXB0LnJlYWR5ID0gZnVuY3Rpb24gKGRlcHMsIHJlYWR5LCByZXEpIHtcclxuICAgIGRlcHMgPSBkZXBzW3B1c2hdID8gZGVwcyA6IFtkZXBzXTtcclxuICAgIHZhciBtaXNzaW5nID0gW107XHJcbiAgICAhZWFjaChkZXBzLCBmdW5jdGlvbiAoZGVwKSB7XHJcbiAgICAgIGxpc3RbZGVwXSB8fCBtaXNzaW5nW3B1c2hdKGRlcCk7XHJcbiAgICB9KSAmJiBldmVyeShkZXBzLCBmdW5jdGlvbiAoZGVwKSB7cmV0dXJuIGxpc3RbZGVwXX0pID9cclxuICAgICAgcmVhZHkoKSA6ICFmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgIGRlbGF5W2tleV0gPSBkZWxheVtrZXldIHx8IFtdO1xyXG4gICAgICBkZWxheVtrZXldW3B1c2hdKHJlYWR5KTtcclxuICAgICAgcmVxICYmIHJlcShtaXNzaW5nKVxyXG4gICAgfShkZXBzLmpvaW4oJ3wnKSk7XHJcbiAgICByZXR1cm4gJHNjcmlwdFxyXG4gIH07XHJcblxyXG4gICRzY3JpcHQuZG9uZSA9IGZ1bmN0aW9uIChpZE9yRG9uZSkge1xyXG4gICAgJHNjcmlwdChbbnVsbF0sIGlkT3JEb25lKVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAkc2NyaXB0XHJcbn0oKTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpLFxyXG4gICAgICAgIGwgPSBhcmd1bWVudHMubGVuZ3RoLFxyXG4gICAgICAgIHAgPSBbXSwgaSA9IDAsIG07XHJcbiAgICB3aGlsZShzW2ldKSB7XHJcbiAgICAgICAgLyogYmFzZVBhdGggPSBtWzFdLCBmaW5nZXJwcmludFN1ZmZpeCA9IG1bMl0gKi9cclxuICAgICAgICAvL20gPSBzW2ldLmdldEF0dHJpYnV0ZSgnc3JjJykubWF0Y2goL14oLiopaW5pdChcXC5bMC05YS1mXXszMn0pP1xcLmpzJC8pOyAvLyBtZDUgaGFzaGVkXHJcbiAgICAgICAgbSA9IHNbaV0uZ2V0QXR0cmlidXRlKCdzcmMnKS5tYXRjaCgvXiguKilpbml0KFxcLlswLTlhLWZdezh9KT9cXC5qcyQvKTsgLy8gY3JjMzJiIGhhc2hlZFxyXG4gICAgICAgIGlmKCFtKSBjb250aW51ZTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIHBbaV0gPSBtWzFdICsgYXJndW1lbnRzW2ldICsgKG1bMl0gfHwgJycpICsgJy5qcyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07Il19
