const path = require('path');
const url = require('url');
const glob = require('glob');
const fs = require("fs");
const electron = require('electron');
const req = require("request");
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const autoUpdater = require('./process/autoupdate');

const app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    globalShortcut = electron.globalShortcut,
    ipc = electron.ipcMain;

let mainWindow;

const debug = process.env.NODE_ENV == "development";

function createWindow() {
    mainWindow = new BrowserWindow({ width: 880, height: 740 });
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

app.on('ready', function() {
    createWindow();
    if (!debug) {
        //autoUpdater.initialize();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

const menu = new Menu();
menu.append(new MenuItem({ label: '复制', role: 'copy', accelerator: 'CommandOrControl+C' }));
menu.append(new MenuItem({ label: '粘贴', role: 'paste', accelerator: 'CommandOrControl+V' }));

app.on('browser-window-created', function(event, win) {
    win.webContents.on('context-menu', function(e, params) {
        menu.popup(win, params.x, params.y)
    })
})

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

    globalShortcut.register('Alt+A', function() {
        mainWindow.webContents.send('print-screen-color');
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

/**/
var handleStartupEvent = function() {
    if (process.platform !== 'win32') {
        return false;
    }

    var squirrelCommand = process.argv[1];

    switch (squirrelCommand) {
        case '--squirrel-install':
        case '--squirrel-updated':
            install();
            return true;
        case '--squirrel-uninstall':
            uninstall();
            app.quit();
            return true;
        case '--squirrel-obsolete':
            app.quit();
            return true;
    }
    // 安装
    function install() {
        var cp = require('child_process');
        var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
        var target = path.basename(process.execPath);
        var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
        child.on('close', function(code) {
            app.quit();
        });
    }
    // 卸载
    function uninstall() {
        var cp = require('child_process');
        var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
        var target = path.basename(process.execPath);
        var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
        child.on('close', function(code) {
            app.quit();
        });
    }

};

if (handleStartupEvent()) {
    return;
}