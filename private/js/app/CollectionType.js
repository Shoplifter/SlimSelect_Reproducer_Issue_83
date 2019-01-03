module.exports = function(container, addBtn) {
    var index = $.find('.city-row', container).length,
        prototype = container.getAttribute('data-prototype');
    $.delegateEvent(container, '.btn', 'click', function(e){
        e.preventDefault();
        $.remove(this.parentNode);
    });
    addBtn.addEventListener('click', function(e){
        e.preventDefault();
        container.appendChild($.htmlToElement(prototype.replace(/__name__/g, index)));
        index ++;
    });
};