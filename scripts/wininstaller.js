const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')
const rimraf = require('rimraf')

deleteOutputFolder()
    .then(getInstallerConfig)
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig() {
    const rootPath = path.join(__dirname, '..')
    const outPath = path.join(rootPath, 'out')

    return Promise.resolve({
        appDirectory: path.join(outPath, 'coooooool-win32-ia32'),
        exe: "coooooool.exe",
        //loadingGif: path.join(rootPath, 'assets', 'img', 'loading.gif'),
        loadingGif: "",
        name: "ToolsByAlbert",
        authors: "Albert",
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        setupExe: 'ThisIsCooooool.exe',
        setupIcon: path.join(rootPath, 'app-icon', 'win', 'app.ico'),
        skipUpdateIcon: true
    })
}

function deleteOutputFolder() {
    return new Promise((resolve, reject) => {
        rimraf(path.join(__dirname, '..', 'out', 'windows-installer'), (error) => {
            error ? reject(error) : resolve()
        })
    })
}