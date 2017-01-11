const ipc = require('electron').ipcMain;
const fs = require("fs");
const path = require('path');

ipc.on("save-file", function(e, options = { content: "hello!", filepath: "" }) {
    fs.exists(options.filepath, function() {

        //var fileurl = path.resolve(options.filepath, options.filename);
        fs.writeFile(options.filepath, options.content, function() {
            e.sender.send("saved-file", options.filepath);
        })
    })
})