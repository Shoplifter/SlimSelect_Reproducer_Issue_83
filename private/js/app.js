/* polyfills */
//require('./lib/helper/closest');
/* utilities */
$.id = function(id){ return document.getElementById(id);};
//$.find = function(selector, el){ return (el||document).querySelectorAll(selector); };
//$.findOne = function(selector, el){ return (el||document).querySelector(selector); };
//$.hasClass = function(el, klass) { return el.classList.contains(klass); };
//$.addClass = function(el, klass) { el.classList.add(klass); return el; };
//$.style = function(el, style) { for(var prop in style) { el.style[prop] = style[prop]; } return el; };
//$.removeClass = function(el, klass) { el.classList.remove(klass); return el; };
//$.toggleClass = function(el, klass, force) { el.classList.toggle(klass, force); return el; };
//$.remove = function(el){ return el.parentNode.removeChild(el); };
//$.empty = function(el){el.innerHTML = ''; return el;};
//$.insertAfter = function(el, ref){return ref.parentNode.insertBefore(el, ref.nextSibling);};
//$.insertBefore = function(el, ref){return ref.parentNode.insertBefore(el, ref);};
//$.htmlToElement = function(html) {var div = document.createElement('div'); div.innerHTML = html.trim(); return div.firstChild;};
//$.delegateEvent = require('./lib/helper/delegate-event');
//$.debounce = require('./lib/helper/debounce');
//$.throttle = require('./lib/helper/throttle');
$.SlimSelect = require('slim-select');
$.xhr = require('nanoajax');
$.domready(function(){
    var s_no_ajax = $.id('slim-no-ajax'),
        s_ajax = $.id('slim-ajax'),
        getData = function(el) {
        var data = [], l = el.options.length, j, o,
            badge = function(o){
                return ((o.hasAttribute('data-badge')))
                    ? '<i class="ss-badge">'+o.getAttribute('data-badge')+'</i>'
                    : '';
            };
        for(j = 0; j < l; j++) {
            o = el.options[j];
            if(j === 0 && o.hasAttribute('data-placeholder')) {
                data[j] = {
                    text: '',
                    placeholder: true
                };
            }
            else {
                data[j] = {
                    value: o.value,
                    text: o.text,
                    disabled: o.hasAttribute('disabled'),
                    innerHTML: o.text + badge(o),
                    selected: o.selected, /* not documented, does not work for original select if select is disabled */
                    data: o.dataset
                };
            }
        }
        return data;
    };

    new $.SlimSelect({
        select: s_no_ajax,
        data: getData(s_no_ajax)
    });
    new $.SlimSelect({
        select: s_ajax,
        data: getData(s_ajax),
        ajax: function(search, callback) {
            if(search.length < 2) {
                callback('Need 2 characters');
                return;
            }
            try {
                xhr.abort();
            } catch(e){}
            var xhr = $.xhr.ajax({
                    url: 'xhr.php',
                    method: 'POST',
                    body: 'search='+search
                },
                function(status, responseText) {
                    if(status !== 200) {
                        if(status !== 0 /* cancelled */) {
                            /** @todo handle errors if any */
                            console.error(responseText);
                        }
                        return;
                    }
                    try {
                        // work in progress: select multiple with badges
                        var result = JSON.parse(responseText).result,
                            l = result.length,
                            i = 0;
                        while (i < l) {
                            result[i].innerHTML = result[i].text + '<i class="ss-badge">'+result[i].badge+'</i>';
                            i++;
                        }
                        callback(result);
                    }
                    catch (e) {
                        console.error(e);
                        console.log(status, responseText);
                        callback(false);
                    }
                }
            );
        }
    });
    //console.log(slim);
    console.log($.getRuntime(), 'initialized')
});
