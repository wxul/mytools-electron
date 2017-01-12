const ipc = require('electron').ipcMain;
const fs = require("fs");
const BrowserWindow = require('electron').BrowserWindow;
const path = require('path');

var imgwindow = null;

ipc.on("show-img-window", function(e, imgoption = { url: "", width: 100, height: 100 }) {
    if (!imgoption.url) return;
    if (imgwindow == null) {
        var modalPath = path.join('file://', __dirname, '../html/imgwindow.html');
        imgwindow = new BrowserWindow();
        imgwindow.on('close', function() { imgwindow = null });
        imgwindow.loadURL(modalPath);
        imgwindow.webContents.on('did-finish-load', function() {
            imgwindow.webContents.send('img-path', { url: imgoption.url, name: imgoption.name });
        });
    } else {
        imgwindow.webContents.send('img-path', { url: imgoption.url, name: imgoption.name });
    }
    imgwindow.setSize(imgoption.width, imgoption.height, true);

    imgwindow.show();
});

ipc.on("qr-screen-success", (e) => {
    var mainWindow = global.mainWindow;
    if (mainWindow !== null) {
        mainWindow.focus();
        mainWindow.webContents.send('qr-screen-successed');
    }
})