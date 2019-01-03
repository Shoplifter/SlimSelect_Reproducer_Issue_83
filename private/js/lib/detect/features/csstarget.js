module.exports = function(){
    if (!('querySelectorAll' in document)) return false;
    try { document.querySelectorAll(':target'); return true; }
    catch (e) { return false; }
}();