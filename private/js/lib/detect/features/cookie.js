module.exports = function(r){
    document.cookie = "testcookie=1";
    r = (parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)testcookie\s*=\s*([^;]*).*$)|^.*$/, "$1")) === 1);
    if(r) document.cookie = 'testcookie=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    return r;
}(false);