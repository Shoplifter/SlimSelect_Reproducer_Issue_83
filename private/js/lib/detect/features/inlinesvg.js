module.exports = function(el){
    el = document.createElement('div');
    el.innerHTML = '<svg/>';
    return (typeof SVGRect !== 'undefined' && el.firstChild && el.firstChild.namespaceURI) === 'http://www.w3.org/2000/svg';
}();