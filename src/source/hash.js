var crypto = require('crypto');
var Buffer = require("buffer").Buffer;

export default {
    md5: function(val, isfile = false) {
        if (isfile) { return ""; } else {
            var buf = new Buffer(val);
            var str = buf.toString("binary");
            return crypto.createHash("md5").update(str).digest("hex");
        }
    },
    sha1: function(val, isfile = false) {
        if (isfile) { return ""; } else {
            var buf = new Buffer(val);
            var str = buf.toString("binary");
            return crypto.createHash("sha1").update(str).digest("hex");
        }
    },
    base64: function(val, isfile = false) {
        if (isfile) { return ""; } else {
            var b = new Buffer(val).toString('base64');
            return b;
        }
    },
    base64_decode: function(val) {
        return new Buffer(val, 'base64').toString();
    }
}