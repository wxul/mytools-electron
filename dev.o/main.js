const path = require('path');
const url = require('url');
const glob = require('glob');
const fs = require("fs");
const electron = require('electron');
const req = require("request");

const app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    globalShortcut = electron.globalShortcut,
    ipc = electron.ipcMain;

let mainWindow;
var debug = false;


if (process && process.argv && process.argv.length) {
    let program = require('commander');
    program.version('0.2.0').option('-d, --development', 'Open development mode').parse(process.argv);
    debug = program.development;
}

function createWindow() {
    mainWindow = new BrowserWindow({ width: 880, height: 640 });
    global.mainWindow = mainWindow;

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
    }))

    if (debug) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    })
    mainWindow.webContents.on('did-finish-load', function() {
        var mdpath = path.join(__dirname, './readme.md');
        fs.exists(mdpath, (exist) => {
            if (exist) {
                fs.readFile(mdpath, function(err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    mainWindow.webContents.send('index-md', data.toString());
                });
            } else {
                req("https://raw.githubusercontent.com/wxul/mytools-electron/master/readme.md", (err, res, body) => {
                    if (err) return console.error(err);
                    if (res.statusCode != 200) {
                        console.warn("status:" + res.statusCode + ",response:" + res);
                        var resobj = JSON.stringify(res);
                        mainWindow.webContents.send('index-md', `## Error! \r\n* status:${res.statusCode} \r\n` + (debug ? `* ${resobj}` : ""));
                        return;
                    }
                    mainWindow.webContents.send('index-md', body);
                })
            }
        });

    });
    //register shortcuts
    registershortcuts();
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

app.on('will-quit', function() {
    globalShortcut.unregisterAll();
})

function registershortcuts() {
    globalShortcut.register('CommandOrControl+Alt+Q', function() {
        mainWindow.webContents.send('print-screen-pressed');
    })
}

function loadDemos() {
    var files = glob.sync(path.join(__dirname, 'process/js/*.js'))
    files.forEach(function(file) {
            require(file);
        })
        //autoUpdater.updateMenu()
}
loadDemos();