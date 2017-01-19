const app = require('electron').app;
const dialog = require('electron').dialog;
const autoUpdater = require('electron').autoUpdater;
const appVersion = require('./package.json').version;
const os = require('os');

exports.initialize = function() {
    console.log(os.platform());
    var ostype = os.platform();
    var feed = ostype === 'darwin' ? "http://api.amayading.com/mac/version" : "";

    autoUpdater.on("update-downloaded", function() {
        dialog.showMessageBox({
            type: 'info',
            title: '升级提示',
            message: "更新已下载完毕,是否重启更新?",
            buttons: ['是', '否']
        }, function(index) {
            if (index == 0) {
                autoUpdater.quitAndInstall();
            }
        })

    })
    autoUpdater.setFeedURL(`${feed}?v=${appVersion}`);
    autoUpdater.checkForUpdates();
}