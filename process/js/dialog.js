const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;
const fs = require('fs');

ipc.on('open-file-dialog', function(event, options = {
    title: "选择文件",
    filters: [{ name: "js文件", extensions: ["js"] }],
    properties: ['openFile', 'multiSelections']
}) {
    dialog.showOpenDialog(options, function(files) {
        if (files) event.sender.send('selected-directory', files)
    })
});
ipc.on('save-file-dialog', function(event, options = {
    title: "保存",
    defaultPath: ""
}) {
    dialog.showSaveDialog(options, function(filepath) {
        if (filepath) event.sender.send('selected-save-directory', filepath)
    })
})

ipc.on("err-dialog", (e, o = { title: "error", txt: "ERROR!!" }) => {
    dialog.showErrorBox(o.title, o.txt);
})