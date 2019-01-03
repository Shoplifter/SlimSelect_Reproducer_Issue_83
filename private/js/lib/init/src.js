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