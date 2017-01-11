const ipc = require('electron').ipcMain;
const ug = require("uglify-js");
const dialog = require('electron').dialog;
console.log(dialog.showOpenDialog);
ipc.on("txt-zip", function(e, m) {
    var code = "";
    try {
        code = ug.minify(m, {
            fromString: true
        }).code;
    } catch (error) {
        code = "不支持的转换";
    }

    e.sender.send("txt-zipped", code);
});

ipc.on('open-file-dialog', function(event, options = {
    title: "选择文件",
    filters: [{ name: "js", extensions: ["*.js"] }],
    properties: ['openFile', 'multiSelections']
}) {
    dialog.showOpenDialog(options, function(files) {
        if (files) event.sender.send('selected-directory', files)
    })
})