!function(){return function e(t,i,n){function s(o,l){if(!i[o]){if(!t[o]){var r="function"==typeof require&&require;if(!l&&r)return r(o,!0);if(a)return a(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var d=i[o]={exports:{}};t[o][0].call(d.exports,function(e){return s(t[o][1][e]||e)},d,d.exports,e,t,i,n)}return i[o].exports}for(var a="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}}()({1:[function(e,t,i){(function(e){var t=["responseType","withCredentials","timeout","onprogress"];function n(e,t,i){e[t]=e[t]||i}i.ajax=function(i,s){var a=i.headers||{},o=i.body,l=i.method||(o?"POST":"GET"),r=!1,c=function(t){if(t&&e.XDomainRequest&&!/MSIE 1/.test(navigator.userAgent))return new XDomainRequest;if(e.XMLHttpRequest)return new XMLHttpRequest}(i.cors);function d(e,t){return function(){r||(s(void 0===c.status?e:c.status,0===c.status?"Error":c.response||c.responseText||t,c),r=!0)}}c.open(l,i.url,!0);var h=c.onload=d(200);c.onreadystatechange=function(){4===c.readyState&&h()},c.onerror=d(null,"Error"),c.ontimeout=d(null,"Timeout"),c.onabort=d(null,"Abort"),o&&(n(a,"X-Requested-With","XMLHttpRequest"),e.FormData&&o instanceof e.FormData||n(a,"Content-Type","application/x-www-form-urlencoded"));for(var u=0,p=t.length;u<p;u++)void 0!==i[f=t[u]]&&(c[f]=i[f]);for(var f in a)c.setRequestHeader(f,a[f]);return c.send(o),c}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,i){var n,s;n=window,s=function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2)}([function(e,t,i){"use strict";t.__esModule=!0,t.hasClassInTree=function(e,t){function i(e,t){return t&&e&&e.classList&&e.classList.contains(t)?e:null}return i(e,t)||function e(t,n){return t&&t!==document?i(t,n)?t:e(t.parentNode,n):null}(e,t)},t.ensureElementInView=function(e,t){var i=e.scrollTop+e.offsetTop,n=i+e.clientHeight,s=t.offsetTop,a=s+t.clientHeight;s<i?e.scrollTop-=i-s:n<a&&(e.scrollTop+=a-n)},t.putContent=function(e,t,i){var n=e.offsetHeight,s=e.getBoundingClientRect(),a=i?s.top:s.top-n,o=i?s.bottom:s.bottom+n;return a<=0?"below":o>=window.innerHeight?"above":i?t:"below"},t.debounce=function(e,t,i){var n;return void 0===t&&(t=100),void 0===i&&(i=!1),function(){var s=self,a=arguments,o=i&&!n;clearTimeout(n),n=setTimeout(function(){n=null,i||e.apply(s,a)},t),o&&e.apply(s,a)}},t.isValueInArrayOfObjects=function(e,t,i){if(!Array.isArray(e))return e[t]===i;for(var n=0;n<e.length;n++)if(e[n]&&e[n][t]&&e[n][t]===i)return!0;return!1},t.highlight=function(e,t,i){var n=n||e,s=new RegExp("("+t.trim()+")(?![^<]*>[^<>]*</)","i");if(!e.match(s))return e;var a=e.match(s).index,o=a+e.match(s)[0].toString().length,l=e.substring(a,o);return n.replace(s,'<mark class="'+i+'">'+l+"</mark>")},function(){var e=window;function t(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var i=document.createEvent("CustomEvent");return i.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),i}"function"!=typeof e.CustomEvent&&(t.prototype=e.Event.prototype,e.CustomEvent=t)}()},function(e,t,i){"use strict";t.__esModule=!0;var n=function(){function e(e){this.contentOpen=!1,this.contentPosition="below",this.isOnChangeEnabled=!0,this.main=e.main,this.searchValue="",this.data=[],this.filtered=null,this.parseSelectData(),this.setSelectedFromSelect()}return e.prototype.newOption=function(e){return{id:e.id?e.id:String(Math.floor(1e8*Math.random())),value:e.value?e.value:"",text:e.text?e.text:"",innerHTML:e.innerHTML?e.innerHTML:"",selected:!!e.selected&&e.selected,display:void 0===e.display||e.display,disabled:!!e.disabled&&e.disabled,placeholder:!!e.placeholder&&e.placeholder,data:e.data?e.data:{}}},e.prototype.add=function(e){var t={id:String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:"",selected:!1,display:!0,disabled:!1,placeholder:!1,data:{}};this.data.push(t)},e.prototype.parseSelectData=function(){this.data=[];for(var e=this.main.select.element.childNodes,t=0;t<e.length;t++)if("OPTGROUP"===e[t].nodeName){for(var i={label:e[t].label,options:[]},n=e[t].childNodes,s=0;s<n.length;s++)if("OPTION"===n[s].nodeName){var a=this.pullOptionData(n[s]);i.options.push(a),a.placeholder&&""!==a.text.trim()&&(this.main.config.placeholderText=a.text)}this.data.push(i)}else"OPTION"===e[t].nodeName&&(a=this.pullOptionData(e[t]),this.data.push(a),a.placeholder&&""!==a.text.trim()&&(this.main.config.placeholderText=a.text))},e.prototype.pullOptionData=function(e){return{id:!!e.dataset&&e.dataset.id||String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:e.innerHTML,selected:e.selected,disabled:e.disabled,placeholder:"true"===e.dataset.placeholder,data:e.dataset}},e.prototype.setSelectedFromSelect=function(){var e=this.main.select.element.options;if(this.main.config.isMultiple){for(var t=[],i=0;i<e.length;i++)if((s=e[i]).selected){var n=this.getObjectFromData(s.value,"value");n&&n.id&&t.push(n.id)}this.setSelected(t,"id")}else if(-1!==e.selectedIndex){var s,a=(s=e[e.selectedIndex]).value;this.setSelected(a,"value")}},e.prototype.setSelected=function(e,t){void 0===t&&(t="id");for(var i=0;i<this.data.length;i++)if(this.data[i].hasOwnProperty("label")){if(this.data[i].hasOwnProperty("options")){var n=this.data[i].options;if(n)for(var s=0;s<n.length;s++)n[s].placeholder||(n[s].selected=this.shouldBeSelected(n[s],e,t))}}else this.data[i].selected=this.shouldBeSelected(this.data[i],e,t)},e.prototype.shouldBeSelected=function(e,t,i){if(void 0===i&&(i="id"),Array.isArray(t)){for(var n=0;n<t.length;n++)if(i in e&&String(e[i])===String(t[n]))return!0}else if(i in e&&String(e[i])===String(t))return!0;return!1},e.prototype.getSelected=function(){for(var e={text:""},t=[],i=0;i<this.data.length;i++)if(this.data[i].hasOwnProperty("label")){if(this.data[i].hasOwnProperty("options")){var n=this.data[i].options;if(n)for(var s=0;s<n.length;s++)n[s].selected&&(this.main.config.isMultiple?t.push(n[s]):e=n[s])}}else this.data[i].selected&&(this.main.config.isMultiple?t.push(this.data[i]):e=this.data[i]);return this.main.config.isMultiple?t:e},e.prototype.addToSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){var i=[],n=this.getSelected();if(Array.isArray(n))for(var s=0;s<n.length;s++)i.push(n[s][t]);i.push(e),this.setSelected(i,t)}},e.prototype.removeFromSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){for(var i=[],n=this.getSelected(),s=0;s<n.length;s++)String(n[s][t])!==String(e)&&i.push(n[s][t]);this.setSelected(i,t)}},e.prototype.onDataChange=function(){this.main.onChange&&this.isOnChangeEnabled&&this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())))},e.prototype.getObjectFromData=function(e,t){void 0===t&&(t="id");for(var i=0;i<this.data.length;i++){if(t in this.data[i]&&String(this.data[i][t])===String(e))return this.data[i];if(this.data[i].hasOwnProperty("options")){var n=this.data[i];if(n.options)for(var s=0;s<n.options.length;s++)if(String(n.options[s][t])===String(e))return n.options[s]}}return null},e.prototype.search=function(e){if(""!==(this.searchValue=e).trim()){var t=this.data.slice(0);e=e.trim().toLowerCase();var i=t.map(function(t){if(t.hasOwnProperty("options")){var i=t,n=[];if(i.options&&(n=i.options.filter(function(t){return-1!==t.text.toLowerCase().indexOf(e)})),0!==n.length){var s=Object.assign({},i);return s.options=n,s}}return t.hasOwnProperty("text")&&-1!==t.text.toLowerCase().indexOf(e)?t:null});this.filtered=i.filter(function(e){return e})}else this.filtered=null},e}();function s(e){return void 0!==e.text||(console.error("Data object option must have at least have a text value. Check object: "+JSON.stringify(e)),!1)}t.default=n,t.validateData=function(e){if(!e)return console.error("Data must be an array of objects"),!1;for(var t=0,i=0;i<e.length;i++)if(e[i].hasOwnProperty("label")){if(e[i].hasOwnProperty("options")){var n=e[i].options;if(n)for(var a=0;a<n.length;a++)s(n[a])||t++}}else s(e[i])||t++;return 0===t},t.validateOption=s},function(e,t,i){"use strict";t.__esModule=!0;var n=i(3),s=i(0),a=i(4),o=i(1),l=i(5),r=function(){function e(e){var t=this;this.ajax=null,this.addable=null,this.beforeOnChange=null,this.onChange=null,this.beforeOpen=null,this.afterOpen=null,this.beforeClose=null,this.afterClose=null;var i=this.validate(e);i.dataset.ssid&&this.destroy(i.dataset.ssid),e.ajax&&(this.ajax=e.ajax),e.addable&&(this.addable=e.addable),this.config=new n.default({select:i,isAjax:!!e.ajax,showSearch:e.showSearch,searchPlaceholder:e.searchPlaceholder,searchText:e.searchText,searchingText:e.searchingText,searchHighlight:e.searchHighlight,closeOnSelect:e.closeOnSelect,showContent:e.showContent,placeholderText:e.placeholder,allowDeselect:e.allowDeselect,isEnabled:e.isEnabled,valuesUseText:e.valuesUseText,showOptionTooltips:e.showOptionTooltips,limit:e.limit}),this.select=new a.default({select:i,main:this}),this.data=new o.default({main:this}),this.slim=new l.default({main:this}),this.select.element.parentNode&&this.select.element.parentNode.insertBefore(this.slim.container,this.select.element.nextSibling),e.data?this.setData(e.data):this.render(),document.addEventListener("click",function(e){e.target&&!s.hasClassInTree(e.target,t.config.id)&&t.close()}),window.addEventListener("scroll",s.debounce(function(e){t.data.contentOpen&&"auto"===t.config.showContent&&("above"===s.putContent(t.slim.content,t.data.contentPosition,t.data.contentOpen)?t.moveContentAbove():t.moveContentBelow())}),!1),e.beforeOnChange&&(this.beforeOnChange=e.beforeOnChange),e.onChange&&(this.onChange=e.onChange),e.beforeOpen&&(this.beforeOpen=e.beforeOpen),e.afterOpen&&(this.afterOpen=e.afterOpen),e.beforeClose&&(this.beforeClose=e.beforeClose),e.afterClose&&(this.afterClose=e.afterClose),this.config.isEnabled||this.disable()}return e.prototype.validate=function(e){var t="string"==typeof e.select?document.querySelector(e.select):e.select;if(!t)throw new Error("Could not find select element");if("SELECT"!==t.tagName)throw new Error("Element isnt of type select");return t},e.prototype.selected=function(){if(this.config.isMultiple){for(var e=this.data.getSelected(),t=[],i=0;i<e.length;i++)t.push(e[i].value);return t}return(e=this.data.getSelected())?e.value:""},e.prototype.set=function(e,t,i,n){void 0===t&&(t="value"),void 0===i&&(i=!0),void 0===n&&(n=!0),this.config.isMultiple&&!Array.isArray(e)?this.data.addToSelected(e,t):this.data.setSelected(e,t),this.select.setValue(),this.data.onDataChange(),this.render(),i&&this.close()},e.prototype.setSelected=function(e,t,i,n){void 0===t&&(t="value"),void 0===i&&(i=!0),void 0===n&&(n=!0),this.set(e,t,i,n)},e.prototype.setData=function(e){if(o.validateData(e)){var t=JSON.parse(JSON.stringify(e)),i=this.data.getSelected();if(this.config.isAjax&&i)if(this.config.isMultiple)for(var n=i.reverse(),s=0;s<n.length;s++)t.unshift(n[s]);else t.unshift(this.data.getSelected()),t.unshift({text:"",placeholder:!0});this.select.create(t),this.data.parseSelectData(),this.data.setSelectedFromSelect()}else console.error("Validation problem on: #"+this.select.element.id)},e.prototype.addData=function(e){if(o.validateData([e])){var t=this.data.newOption(e);this.data.add(t),this.select.create(this.data.data),this.data.parseSelectData(),this.data.setSelectedFromSelect(),this.render()}else console.error("Validation problem on: #"+this.select.element.id)},e.prototype.open=function(){var e=this;if(this.config.isEnabled&&!this.data.contentOpen){if(this.slim.search.input.focus(),this.beforeOpen&&this.beforeOpen(),this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.plus.classList.add("ss-cross"):this.slim.singleSelected&&(this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-up")),this.slim[this.config.isMultiple?"multiSelected":"singleSelected"].container.classList.add("above"===this.data.contentPosition?this.config.openAbove:this.config.openBelow),this.slim.content.classList.add(this.config.open),"up"===this.config.showContent.toLowerCase()?this.moveContentAbove():"down"===this.config.showContent.toLowerCase()?this.moveContentBelow():"above"===s.putContent(this.slim.content,this.data.contentPosition,this.data.contentOpen)?this.moveContentAbove():this.moveContentBelow(),!this.config.isMultiple){var t=this.data.getSelected();if(t){var i=t.id,n=this.slim.list.querySelector('[data-id="'+i+'"]');n&&s.ensureElementInView(this.slim.list,n)}}setTimeout(function(){e.data.contentOpen=!0,e.afterOpen&&e.afterOpen()},300)}},e.prototype.close=function(){var e=this;this.data.contentOpen&&(this.beforeClose&&this.beforeClose(),this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.plus.classList.remove("ss-cross")):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-up")),this.slim.content.classList.remove(this.config.open),this.data.contentOpen=!1,this.search(""),setTimeout(function(){e.slim.content.removeAttribute("style"),e.data.contentPosition="below",e.config.isMultiple&&e.slim.multiSelected?(e.slim.multiSelected.container.classList.remove(e.config.openAbove),e.slim.multiSelected.container.classList.remove(e.config.openBelow)):e.slim.singleSelected&&(e.slim.singleSelected.container.classList.remove(e.config.openAbove),e.slim.singleSelected.container.classList.remove(e.config.openBelow)),e.slim.search.input.blur(),e.afterClose&&e.afterClose()},300))},e.prototype.moveContentAbove=function(){var e=0;this.config.isMultiple&&this.slim.multiSelected?e=this.slim.multiSelected.container.offsetHeight:this.slim.singleSelected&&(e=this.slim.singleSelected.container.offsetHeight);var t=e+this.slim.content.offsetHeight-1;this.slim.content.style.margin="-"+t+"px 0 0 0",this.slim.content.style.height=t-e+1+"px",this.slim.content.style.transformOrigin="center bottom",this.data.contentPosition="above",this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.container.classList.add(this.config.openAbove)):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.container.classList.add(this.config.openAbove))},e.prototype.moveContentBelow=function(){this.slim.content.removeAttribute("style"),this.data.contentPosition="below",this.config.isMultiple&&this.slim.multiSelected?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.add(this.config.openBelow)):this.slim.singleSelected&&(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.add(this.config.openBelow))},e.prototype.enable=function(){this.config.isEnabled=!0,this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.container.classList.remove(this.config.disabled):this.slim.singleSelected&&this.slim.singleSelected.container.classList.remove(this.config.disabled),this.select.triggerMutationObserver=!1,this.select.element.disabled=!1,this.slim.search.input.disabled=!1,this.select.triggerMutationObserver=!0},e.prototype.disable=function(){this.config.isEnabled=!1,this.config.isMultiple&&this.slim.multiSelected?this.slim.multiSelected.container.classList.add(this.config.disabled):this.slim.singleSelected&&this.slim.singleSelected.container.classList.add(this.config.disabled),this.select.triggerMutationObserver=!1,this.select.element.disabled=!0,this.slim.search.input.disabled=!0,this.select.triggerMutationObserver=!0},e.prototype.search=function(e){if(this.data.searchValue!==e)if(this.slim.search.input.value=e,this.config.isAjax){var t=this;this.config.isSearching=!0,this.render(),this.ajax&&this.ajax(e,function(i){t.config.isSearching=!1,Array.isArray(i)?(i.unshift({text:"",placeholder:!0}),t.setData(i),t.data.search(e),t.render()):"string"==typeof i?t.slim.options(i):t.render()})}else this.data.search(e),this.render()},e.prototype.setSearchText=function(e){this.config.searchText=e},e.prototype.render=function(){this.config.isMultiple?this.slim.values():(this.slim.placeholder(),this.slim.deselect()),this.slim.options()},e.prototype.destroy=function(e){void 0===e&&(e=null);var t=e?document.querySelector("."+e):this.slim.container,i=e?document.querySelector("[data-ssid="+e+"]"):this.select.element;t&&i&&(i.style.display=null,delete i.dataset.ssid,i.slim=null,t.parentElement&&t.parentElement.removeChild(t))},e}();t.default=r},function(e,t,i){"use strict";t.__esModule=!0;t.default=function(e){this.id="",this.isMultiple=!1,this.isAjax=!1,this.isSearching=!1,this.showSearch=!0,this.searchHighlight=!1,this.closeOnSelect=!0,this.showContent="auto",this.searchPlaceholder="Search",this.searchText="No Results",this.searchingText="Searching...",this.placeholderText="Select Value",this.allowDeselect=!1,this.isEnabled=!0,this.valuesUseText=!1,this.showOptionTooltips=!1,this.limit=0,this.main="ss-main",this.singleSelected="ss-single-selected",this.arrow="ss-arrow",this.multiSelected="ss-multi-selected",this.add="ss-add",this.plus="ss-plus",this.values="ss-values",this.value="ss-value",this.valueText="ss-value-text",this.valueDelete="ss-value-delete",this.content="ss-content",this.open="ss-open",this.openAbove="ss-open-above",this.openBelow="ss-open-below",this.search="ss-search",this.searchHighlighter="ss-search-highlight",this.addable="ss-addable",this.list="ss-list",this.optgroup="ss-optgroup",this.optgroupLabel="ss-optgroup-label",this.option="ss-option",this.highlighted="ss-highlighted",this.disabled="ss-disabled",this.hide="ss-hide",this.id="ss-"+Math.floor(1e5*Math.random()),this.style=e.select.style.cssText,this.class=e.select.classList,this.isMultiple=e.select.multiple,this.isAjax=e.isAjax,this.showSearch=!1!==e.showSearch,this.searchHighlight=!0===e.searchHighlight,this.closeOnSelect=!1!==e.closeOnSelect,e.showContent&&(this.showContent=e.showContent),this.isEnabled=!1!==e.isEnabled,e.searchPlaceholder&&(this.searchPlaceholder=e.searchPlaceholder),e.searchText&&(this.searchText=e.searchText),e.searchingText&&(this.searchingText=e.searchingText),e.placeholderText&&(this.placeholderText=e.placeholderText),this.allowDeselect=!0===e.allowDeselect,e.valuesUseText&&(this.valuesUseText=e.valuesUseText),e.showOptionTooltips&&(this.showOptionTooltips=e.showOptionTooltips),e.limit&&(this.limit=e.limit)}},function(e,t,i){"use strict";t.__esModule=!0;var n=function(){function e(e){this.triggerMutationObserver=!0,this.element=e.select,this.main=e.main,this.element.disabled&&(this.main.config.isEnabled=!1),this.addAttributes(),this.addEventListeners(),this.mutationObserver=null,this.addMutationObserver(),this.element.slim=e.main}return e.prototype.setValue=function(){if(this.main.data.getSelected()){if(this.main.config.isMultiple)for(var e=this.main.data.getSelected(),t=this.element.options,i=0;i<t.length;i++){var n=t[i];n.selected=!1;for(var s=0;s<e.length;s++)e[s].value===n.value&&(n.selected=!0)}else e=this.main.data.getSelected(),this.element.value=e?e.value:"";this.main.data.isOnChangeEnabled=!1,this.element.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this.main.data.isOnChangeEnabled=!0}},e.prototype.addAttributes=function(){this.element.tabIndex=-1,this.element.style.display="none",this.element.dataset.ssid=this.main.config.id},e.prototype.addEventListeners=function(){var e=this;this.element.addEventListener("change",function(t){e.main.data.setSelectedFromSelect(),e.main.render()})},e.prototype.addMutationObserver=function(){var e=this;this.main.config.isAjax||(this.mutationObserver=new MutationObserver(function(t){e.triggerMutationObserver&&(e.main.data.parseSelectData(),e.main.data.setSelectedFromSelect(),e.main.render(),t.forEach(function(t){"class"===t.attributeName&&e.main.slim.updateContainerDivClass(e.main.slim.container)}))}),this.observeMutationObserver())},e.prototype.observeMutationObserver=function(){this.mutationObserver&&this.mutationObserver.observe(this.element,{attributes:!0,childList:!0,characterData:!0})},e.prototype.disconnectMutationObserver=function(){this.mutationObserver&&this.mutationObserver.disconnect()},e.prototype.create=function(e){this.element.innerHTML="";for(var t=0;t<e.length;t++)if(e[t].hasOwnProperty("options")){var i=e[t],n=document.createElement("optgroup");if(n.label=i.label,i.options)for(var s=0;s<i.options.length;s++)n.appendChild(this.createOption(i.options[s]));this.element.appendChild(n)}else this.element.appendChild(this.createOption(e[t]))},e.prototype.createOption=function(e){var t=document.createElement("option");return t.value=e.value||e.text,t.innerHTML=e.innerHTML||e.text,e.selected&&(t.selected=e.selected),e.disabled&&(t.disabled=!0),e.placeholder&&t.setAttribute("data-placeholder","true"),e.data&&"object"==typeof e.data&&Object.keys(e.data).forEach(function(i){t.setAttribute("data-"+i,e.data[i])}),t},e}();t.default=n},function(e,t,i){"use strict";t.__esModule=!0;var n=i(0),s=i(1),a=function(){function e(e){this.main=e.main,this.container=this.containerDiv(),this.content=this.contentDiv(),this.search=this.searchDiv(),this.list=this.listDiv(),this.options(),this.singleSelected=null,this.multiSelected=null,this.main.config.isMultiple?(this.multiSelected=this.multiSelectedDiv(),this.container.appendChild(this.multiSelected.container)):(this.singleSelected=this.singleSelectedDiv(),this.container.appendChild(this.singleSelected.container)),this.container.appendChild(this.content),this.content.appendChild(this.search.container),this.content.appendChild(this.list)}return e.prototype.containerDiv=function(){var e=document.createElement("div");return e.style.cssText=this.main.config.style,this.updateContainerDivClass(e),e},e.prototype.updateContainerDivClass=function(e){this.main.config.class=this.main.select.element.classList,e.className="",e.classList.add(this.main.config.id),e.classList.add(this.main.config.main);for(var t=0;t<this.main.config.class.length;t++)e.classList.add(this.main.config.class[t])},e.prototype.singleSelectedDiv=function(){var e=this,t=document.createElement("div");t.classList.add(this.main.config.singleSelected);var i=document.createElement("span");i.classList.add("placeholder"),t.appendChild(i);var n=document.createElement("span");n.innerHTML="X",n.classList.add("ss-deselect"),n.onclick=function(t){t.stopPropagation(),e.main.config.isEnabled&&e.main.set("")},t.appendChild(n);var s=document.createElement("span");s.classList.add(this.main.config.arrow);var a=document.createElement("span");return a.classList.add("arrow-down"),s.appendChild(a),t.appendChild(s),t.onclick=function(){e.main.config.isEnabled&&(e.main.data.contentOpen?e.main.close():e.main.open())},{container:t,placeholder:i,deselect:n,arrowIcon:{container:s,arrow:a}}},e.prototype.placeholder=function(){var e=this.main.data.getSelected();if(null===e||e&&e.placeholder){var t=document.createElement("span");t.classList.add(this.main.config.disabled),t.innerHTML=this.main.config.placeholderText,this.singleSelected&&(this.singleSelected.placeholder.innerHTML=t.outerHTML)}else{var i="";e&&(i=e.innerHTML&&!0!==this.main.config.valuesUseText?e.innerHTML:e.text),this.singleSelected&&(this.singleSelected.placeholder.innerHTML=e?i:"")}},e.prototype.deselect=function(){if(this.singleSelected){if(!this.main.config.allowDeselect)return void this.singleSelected.deselect.classList.add("ss-hide");""===this.main.selected()?this.singleSelected.deselect.classList.add("ss-hide"):this.singleSelected.deselect.classList.remove("ss-hide")}},e.prototype.multiSelectedDiv=function(){var e=this,t=document.createElement("div");t.classList.add(this.main.config.multiSelected);var i=document.createElement("div");i.classList.add(this.main.config.values),t.appendChild(i);var n=document.createElement("div");n.classList.add(this.main.config.add);var s=document.createElement("span");return s.classList.add(this.main.config.plus),s.onclick=function(t){e.main.data.contentOpen&&(e.main.close(),t.stopPropagation())},n.appendChild(s),t.appendChild(n),t.onclick=function(t){e.main.config.isEnabled&&(t.target.classList.contains(e.main.config.valueDelete)||e.main.open())},{container:t,values:i,add:n,plus:s}},e.prototype.values=function(){if(this.multiSelected){for(var e,t=this.multiSelected.values.childNodes,i=this.main.data.getSelected(),n=[],s=0;s<t.length;s++){e=!0;for(var a=t[s],o=0;o<i.length;o++)String(i[o].id)===String(a.dataset.id)&&(e=!1);e&&n.push(a)}for(var l=0;l<n.length;l++)n[l].classList.add("ss-out"),this.multiSelected.values.removeChild(n[l]);for(t=this.multiSelected.values.childNodes,o=0;o<i.length;o++){for(e=!1,s=0;s<t.length;s++)a=t[s],String(i[o].id)===String(a.dataset.id)&&(e=!0);e||(0!==t.length&&HTMLElement.prototype.insertAdjacentElement?0===o?this.multiSelected.values.insertBefore(this.valueDiv(i[o]),t[o]):t[o-1].insertAdjacentElement("afterend",this.valueDiv(i[o])):this.multiSelected.values.appendChild(this.valueDiv(i[o])))}if(0===i.length){var r=document.createElement("span");r.classList.add(this.main.config.disabled),r.innerHTML=this.main.config.placeholderText,this.multiSelected.values.innerHTML=r.outerHTML}}},e.prototype.valueDiv=function(e){var t=this,i=document.createElement("div");i.classList.add(this.main.config.value),i.dataset.id=e.id;var n=document.createElement("span");n.classList.add(this.main.config.valueText),n.innerHTML=e.innerHTML&&!0!==this.main.config.valuesUseText?e.innerHTML:e.text,i.appendChild(n);var s=document.createElement("span");return s.classList.add(this.main.config.valueDelete),s.innerHTML="x",s.onclick=function(i){if(i.preventDefault(),i.stopPropagation(),t.main.config.isEnabled)if(t.main.beforeOnChange){for(var n=t.main.data.getSelected(),s=JSON.parse(JSON.stringify(n)),a=0;a<s.length;a++)s[a].id===e.id&&s.splice(a,1);!1!==t.main.beforeOnChange(s)&&(t.main.data.removeFromSelected(e.id,"id"),t.main.render(),t.main.select.setValue())}else t.main.data.removeFromSelected(e.id,"id"),t.main.render(),t.main.select.setValue(),t.main.data.onDataChange()},i.appendChild(s),i},e.prototype.contentDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.content),e},e.prototype.searchDiv=function(){var e=this,t=document.createElement("div"),i=document.createElement("input");t.classList.add(this.main.config.search),this.main.config.showSearch||(t.classList.add(this.main.config.hide),i.readOnly=!0),i.type="search",i.placeholder=this.main.config.searchPlaceholder,i.tabIndex=0,i.onclick=function(t){setTimeout(function(){""===t.target.value&&e.main.search("")},10)},i.onkeydown=function(t){"ArrowUp"===t.key?(e.main.open(),e.highlightUp(),t.preventDefault()):"ArrowDown"===t.key?(e.main.open(),e.highlightDown(),t.preventDefault()):"Tab"===t.key?e.main.close():"Enter"===t.key&&t.preventDefault()},i.onkeyup=function(t){var n=t.target;if("Enter"===t.key){if(e.main.addable&&t.ctrlKey)return a.click(),t.preventDefault(),void t.stopPropagation();var s=e.list.querySelector("."+e.main.config.highlighted);s&&s.click()}else"ArrowUp"===t.key||"ArrowDown"===t.key||("Escape"===t.key?e.main.close():e.main.config.showSearch&&e.main.data.contentOpen?e.main.search(n.value):i.value="");t.preventDefault(),t.stopPropagation()},i.onfocus=function(){e.main.open()},t.appendChild(i);var n={container:t,input:i};if(this.main.addable){var a=document.createElement("div");a.classList.add(this.main.config.addable),a.innerHTML="+",a.onclick=function(t){if(e.main.addable){t.preventDefault(),t.stopPropagation();var i=e.search.input.value;if(""===i.trim())return void e.search.input.focus();var n=e.main.addable(i),a="";if(!n)return;"object"==typeof n?s.validateOption(n)&&(e.main.addData(n),a=n.value?n.value:n.text):(e.main.addData(e.main.data.newOption({text:n,value:n})),a=n),e.main.search(""),setTimeout(function(){e.main.set(a,"value",!1,!1)},100),e.main.config.closeOnSelect&&setTimeout(function(){e.main.close()},100)}},t.appendChild(a),n.addable=a}return n},e.prototype.highlightUp=function(){var e=this.list.querySelector("."+this.main.config.highlighted),t=null;if(e)for(t=e.previousSibling;null!==t&&t.classList.contains(this.main.config.disabled);)t=t.previousSibling;else{var i=this.list.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")");t=i[i.length-1]}if(t&&t.classList.contains(this.main.config.optgroupLabel)&&(t=null),null===t){var s=e.parentNode;if(s.classList.contains(this.main.config.optgroup)&&s.previousSibling){var a=s.previousSibling.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")");a.length&&(t=a[a.length-1])}}t&&(e&&e.classList.remove(this.main.config.highlighted),t.classList.add(this.main.config.highlighted),n.ensureElementInView(this.list,t))},e.prototype.highlightDown=function(){var e=this.list.querySelector("."+this.main.config.highlighted),t=null;if(e)for(t=e.nextSibling;null!==t&&t.classList.contains(this.main.config.disabled);)t=t.nextSibling;else t=this.list.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")");if(null===t&&null!==e){var i=e.parentNode;i.classList.contains(this.main.config.optgroup)&&i.nextSibling&&(t=i.nextSibling.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")"))}t&&(e&&e.classList.remove(this.main.config.highlighted),t.classList.add(this.main.config.highlighted),n.ensureElementInView(this.list,t))},e.prototype.listDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.list),e.addEventListener("wheel",function(t){var i=e.scrollTop,n=e.scrollHeight,s=e.offsetHeight,a=Math.round(-t.deltaY),o=0<a,l=function(){return t.stopPropagation(),t.preventDefault(),t.returnValue=!1};return!o&&n-s-i<-a?(e.scrollTop=n,l()):o&&i<a?(e.scrollTop=0,l()):void 0}),e},e.prototype.options=function(e){void 0===e&&(e="");var t,i=this.main.data.filtered||this.main.data.data;if((this.list.innerHTML="")!==e)return(t=document.createElement("div")).classList.add(this.main.config.option),t.classList.add(this.main.config.disabled),t.innerHTML=e,void this.list.appendChild(t);if(this.main.config.isAjax&&this.main.config.isSearching)return(t=document.createElement("div")).classList.add(this.main.config.option),t.classList.add(this.main.config.disabled),t.innerHTML=this.main.config.searchingText,void this.list.appendChild(t);if(0===i.length){var n=document.createElement("div");return n.classList.add(this.main.config.option),n.classList.add(this.main.config.disabled),n.innerHTML=this.main.config.searchText,void this.list.appendChild(n)}for(var s=0;s<i.length;s++)if(i[s].hasOwnProperty("label")){var a=i[s],o=document.createElement("div");o.classList.add(this.main.config.optgroup);var l=document.createElement("div");l.classList.add(this.main.config.optgroupLabel),l.innerHTML=a.label,o.appendChild(l);var r=a.options;if(r)for(var c=0;c<r.length;c++)o.appendChild(this.option(r[c]));this.list.appendChild(o)}else this.list.appendChild(this.option(i[s]))},e.prototype.option=function(e){if(e.placeholder){var t=document.createElement("div");return t.classList.add(this.main.config.option),t.classList.add(this.main.config.hide),t}var i=document.createElement("div");i.classList.add(this.main.config.option);var s=this.main.data.getSelected();i.dataset.id=e.id,this.main.config.searchHighlight&&this.main.slim&&e.innerHTML&&""!==this.main.slim.search.input.value.trim()?i.innerHTML=n.highlight(e.innerHTML,this.main.slim.search.input.value,this.main.config.searchHighlighter):e.innerHTML&&(i.innerHTML=e.innerHTML),this.main.config.showOptionTooltips&&i.textContent&&i.setAttribute("title",i.textContent);var a=this;return i.addEventListener("click",function(e){if(e.preventDefault(),e.stopPropagation(),!(a.main.config.limit&&Array.isArray(s)&&a.main.config.limit<=s.length)){var t=this.dataset.id;if(a.main.beforeOnChange){var i=void 0,n=JSON.parse(JSON.stringify(a.main.data.getObjectFromData(t)));n.selected=!0,a.main.config.isMultiple?(i=JSON.parse(JSON.stringify(s))).push(n):i=JSON.parse(JSON.stringify(n)),!1!==a.main.beforeOnChange(i)&&a.main.set(t,"id",a.main.config.closeOnSelect)}else a.main.set(t,"id",a.main.config.closeOnSelect)}}),(e.disabled||s&&n.isValueInArrayOfObjects(s,"id",e.id))&&(i.onclick=null,i.classList.add(this.main.config.disabled)),i},e}();t.default=a}]).default},"object"==typeof i&&"object"==typeof t?t.exports=s():"function"==typeof define&&define.amd?define([],s):"object"==typeof i?i.SlimSelect=s():n.SlimSelect=s()},{}],3:[function(e,t,i){$.id=function(e){return document.getElementById(e)},$.SlimSelect=e("slim-select"),$.xhr=e("nanoajax"),$.domready(function(){var e=$.id("slim-no-ajax"),t=$.id("slim-ajax"),i=function(e){var t,i,n=[],s=e.options.length,a=function(e){return e.hasAttribute("data-badge")?'<i class="ss-badge">'+e.getAttribute("data-badge")+"</i>":""};for(t=0;t<s;t++)i=e.options[t],0===t&&i.hasAttribute("data-placeholder")?n[t]={text:"",placeholder:!0}:n[t]={value:i.value,text:i.text,disabled:i.hasAttribute("disabled"),innerHTML:i.text+a(i),selected:i.selected,data:i.dataset};return n};new $.SlimSelect({select:e,data:i(e)}),new $.SlimSelect({select:t,data:i(t),ajax:function(e,t){if(e.length<2)t("Need 2 characters");else{try{i.abort()}catch(e){}var i=$.xhr.ajax({url:"xhr.php",method:"POST",body:"search="+e},function(e,i){if(200===e)try{for(var n=JSON.parse(i).result,s=n.length,a=0;a<s;)n[a].innerHTML=n[a].text+'<i class="ss-badge">'+n[a].badge+"</i>",a++;t(n)}catch(n){console.error(n),console.log(e,i),t(!1)}else 0!==e&&console.error(i)})}}}),console.log($.getRuntime(),"initialized")})},{nanoajax:1,"slim-select":2}]},{},[3]);