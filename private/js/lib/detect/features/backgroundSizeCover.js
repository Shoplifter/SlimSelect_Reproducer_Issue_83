module.exports = function(c){
    //return false;//test
    c = ('backgroundSize' in document.documentElement.style);
    if(c){
        var el = document.createElement('div');
        el.style.backgroundSize = 'cover';
        c = el.style.backgroundSize === 'cover';
    }
    return c;
}(false);