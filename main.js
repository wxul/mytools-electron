const path = require('path');
const url = require('url');
const glob = require('glob');
const fs = require("fs");
const electron = require('electron');
const app = electron.app,
    BrowserWindow = electron.BrowserWindow;

let mainWindow;

console.log(__dirname);

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
    }))

    if (process.env.NODE_ENV == "development") {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    })
    mainWindow.webContents.on('did-finish-load', function() {
        fs.readFile('./readme.md', function(err, data) {
            if (err) {
                return console.log(err);
            }
            mainWindow.webContents.send('index-md', data.toString());
        });

    });

}

app.on('ready', createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow == null) {
        createWindow();
    }
})

function loadDemos() {
    var files = glob.sync(path.join(__dirname, 'process/*.js'))
    files.forEach(function(file) {
            require(file);
        })
        //autoUpdater.updateMenu()
}

loadDemos();
