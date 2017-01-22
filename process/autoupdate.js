const app = require('electron').app;
const dialog = require('electron').dialog;
const autoUpdater = require('electron').autoUpdater;
const os = require('os');

exports.initialize = function() {
    var ostype = os.platform();
    if (ostype === 'darwin') return; //dmg需要developerID才能自动更新
    var feed = ostype === 'darwin' ? "http://api.amayading.com/mac/version" : "http://eleupdate.amayading.com/win";

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
    autoUpdater.on('error', function() {
        dialog.showErrorBox('An Error Message', 'Demonstrating an error message.')
    })
    autoUpdater.setFeedURL(`${feed}?v=${app.getVersion()}`);
    autoUpdater.checkForUpdates();
}