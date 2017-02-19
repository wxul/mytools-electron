var crypto = require('crypto');
var Buffer = require("buffer").Buffer;
var fs = require("fs");

var hash = function(val, type, options) {
    options = options || {};
    if (!type) throw new Error("必须指定方式");
    var isfile = !!options.isfile;

    if (isfile) {
        var noo = function() {};
        var hs = {};
        if (!type instanceof Array) {
            type = [type];
        }
        type.forEach((e) => {
            hs[e] = { h: crypto.createHash(e) }
        })
        typeof options.progress != 'function' && (options.progress = noo);
        typeof options.end != 'function' && (options.end = noo);
        typeof options.err != 'function' && (options.err = noo);
        var start = new Date().getTime();
        fs.stat(val, function(err, stats) {
            if (err) throw err;
            var len = stats.size,
                curlen = 0;
            var stream = fs.createReadStream(val);
            stream.on("data", function(chunk) {
                for (var t in hs) {
                    hs[t].h.update(chunk);
                }
                curlen += chunk.length;
                options.progress(curlen / len);
            })
            stream.on("end", function() {
                for (var t in hs) {
                    hs[t].txt = hs[t].h.digest("hex");
                }
                options.end(hs, (new Date().getTime() - start));
            })
            stream.on("error", function(e) {
                options.err(e);
            })
        });
        return null;
    } else {
        var h = crypto.createHash(type);
        var buf = new Buffer(val);
        var str = buf.toString("binary");
        return h.update(str).digest("hex");
    }
}

export default {
    md5: function(val) {
        var type = "md5";
        return hash(val, type);
    },
    sha1: function(val) {
        var type = "sha1";
        return hash(val, type);
    },
    base64: function(val, isfile = false) {
        if (isfile) { return ""; } else {
            var b = new Buffer(val).toString('base64');
            return b;
        }
    },
    base64_decode: function(val) {
        return new Buffer(val, 'base64').toString();
    },
    file: function(filepath, types, options) {
        return hash(filepath, types, options);
    }
}