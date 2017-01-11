## Electron+Vue+Webpack搭建的跨平台应用实例

[API](https://github.com/wxul/mytools-api) 和 [前端页面](https://github.com/wxul/mytools-vue)
整合而成的Electron应用

1. [下载](https://github.com/wxul/mytools-electron/archive/master.zip) 或者clone应用
2. `npm run installar` 使用淘宝镜像安装依赖，因为electron安装有可能超时报错
2. `npm run build` 
3. `npm run package` 打包成win32、mac、linux应用，也可以使用 `npm run pack-win`,`npm run pack-mac`,`npm run pack-linux`分别打包成对应平台应用
4. 其它: `npm run start` build后直接运行不用打包; `npm run devbuild &` 热更新开发构建，构建之后使用 `npm run devstart &` 运行，然后在菜单->view->reload查看页面热更新
***
### 目录:
* `main.js`: 入口js
* `index.html`: 主窗口
* `process`: main-process文件夹，涉及后台功能，不会被webpack打包
* `src`: render-process文件夹，前端功能
* `dev.o`: `npm run devbuild` 输出的文件夹，开发使用，不会被electron打包
* `release`: `npm run build` 发布的文件夹
* `out`: electron打包输出位置

electron-packager参数请参考 
> [electron-packager-usage](https://github.com/electron-userland/electron-packager/blob/master/usage.txt)