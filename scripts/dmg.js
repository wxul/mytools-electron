const createDMG = require('electron-installer-dmg');
const path = require('path')
const rimraf = require('rimraf')
var fs = require('fs')

deleteOutputFolder()
    .then(createFolder)
    .then(getInstallerConfig)
    .then((a, b) => {
        createDMG(a, function done(err) {
            console.log(err);
        })
    })
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig() {
    const rootPath = path.join(__dirname, '..')
    const outPath = path.join(rootPath, 'out')

    return Promise.resolve({
        appPath: path.join(outPath, 'coooooool-darwin-x64'),
        name: "ToolsByAlbert",
        authors: "Albert",
        overwrite: true,
        out: path.join(outPath, 'dmg-installer'),
        icon: path.join(rootPath, 'app-icon', 'mac', 'app.icns')
    })
}

function deleteOutputFolder() {
    return new Promise((resolve, reject) => {
        rimraf(path.join(__dirname, '..', 'out', 'dmg-installer'), (error) => {
            error ? reject(error) : resolve()
        })
    })
}

function createFolder() {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(__dirname, '..', 'out', 'dmg-installer'), 0777, function(err) {
            err ? reject(err) : resolve()
        })
    })
}