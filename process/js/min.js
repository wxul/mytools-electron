const ipc = require('electron').ipcMain;
const ug = require("uglify-js");

ipc.on("txt-zip", function(e, m) {
    var code = "";
    try {
        code = ug.minify(m, {
            fromString: true
        }).code;
    } catch (error) {
        code = "不支持的转换";
    }
    e.returnValue = code;
});

ipc.on("file-zip", function(e, m = []) {
    var code = "";
    if (m.length > 0) {
        try {
            code = ug.minify(m).code;
        } catch (error) {}
    }
    e.returnValue = code;
})