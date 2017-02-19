<template>
    <div class="app">
        <div class="nav">
            <header>广告位招租 <i class="fa fa-spinner fa-pulse fa-fw"></i></header>
            <el-menu mode="vertical" :default-active="select" @select="handleMenuSelect">
                <el-menu-item index="index"><i class="fa fa-home fa-fw"></i> 主页</el-menu-item>
                <el-menu-item-group title="二维码">
                    <el-menu-item index="qr-g"><i class="fa fa-qrcode fa-fw"></i> 生成</el-menu-item>
                    <el-menu-item index="qr-de"><i class="fa fa-picture-o fa-fw"></i> 解码</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="信息">
                    <el-menu-item index="rss-r"><i class="fa fa-rss-square fa-fw"></i> RSS</el-menu-item>
                    <el-menu-item index="email-a"><i class="fa fa-envelope fa-fw"></i> 邮箱</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="HASH与压缩">
                    <el-menu-item index="hash"><i class="fa fa-file-text fa-fw"></i> HASH</el-menu-item>
                    <el-menu-item index="min"><i class="fa fa-file-code-o fa-fw"></i> JS压缩</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="待定">
                    <el-menu-item index="wating"><i class="fa fa-spinner fa-pulse fa-fw"></i> 嗷！</el-menu-item>
                </el-menu-item-group>
            </el-menu>
            <footer>
                <a class="about" href="#">关于</a>
                <a data-openexternal="true" class="github" href="https://github.com/wxul/mytools-electron"><i class="fa fa-github"></i> Github <i class="fa fa-code-fork"></i></a>
            </footer>
        </div>
        <div class="main" id="main">
            <div class="section" :class="select=='index'?'active':''"><indexView></indexView></div>
            <div class="section" :class="select=='hash'?'active':''"><hashView></hashView></div>
            <div class="section" :class="select=='min'?'active':''"><minView></minView></div>
            <div class="section" :class="select=='qr-g'?'active':''"><qrgeView></qrgeView></div>
            <div class="section" :class="select=='qr-de'?'active':''"><qrdeView></qrdeView></div>
            <div class="section" :class="select=='rss-r'?'active':''"><rssreadView></rssreadView></div>
            <div class="section" :class="select=='email-a'?'active':''"><emailadminView></emailadminView></div>
            <div class="section" :class="select=='wating'?'active':''"><watingView></watingView></div>
        </div>
        </select>
    </div>
</template>
<script>
    import '../assets/css/normalize.css';
    import '../assets/css/style.css';
    //import '../assets/fa/css/font-awesome.css';
    import '../assets/fa/less/font-awesome.less';
    import linksex from '../../source/openexlink.js';
    import config from '../assets/config';
    const log = config.log;
    const electron = require("electron");
    const ipc = electron.ipcRenderer;
    const desktopCapturer = electron.desktopCapturer;
    const electronScreen = electron.screen;
    const clipboard = electron.clipboard;

    export default {
        components: {
            "indexView": require('./index.vue'),
            "hashView": require('./hash/hash.vue'),
            "minView": require('./min/min.vue'),
            "qrgeView": require('./qr/ge.vue'),
            "qrdeView": require('./qr/decode.vue'),
            "rssreadView": require('./rss/read.vue'),
            "emailadminView": require('./email/email.vue'),
            "watingView": require('./other/wating.vue')
        },
        data() {
            return {
                select: "index"
            }
        },
        mounted() {
            log(this);
            linksex.linksinit();
            ipc.on("qr-screen-successed", (e) => {
                this.select = "qr-de";
            })

            ipc.on("print-screen-color", e => {
                this.screen = true;
                var thumbSize = this.determineScreenShotSize();
                var options = {
                    types: ['screen'],
                    thumbnailSize: thumbSize
                };

                desktopCapturer.getSources(options, (err, sources) => {
                    if (err) return console.log(err)
                    sources.forEach((s) => {
                        if (s.name === 'Entire screen' || s.name === 'Screen 1') {
                            var base64 = s.thumbnail.toDataURL();
                            ipc.send("print-screen-image", base64);
                        }
                    })
                });
            });
            ipc.on("printed-screen-color", (e, r) => {
                log(r);
                clipboard.writeText(r);
            })
        },
        methods: {
            determineScreenShotSize() {
                const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
                console.log(electronScreen.getPrimaryDisplay())
                const maxDimension = Math.max(screenSize.width, screenSize.height)
                return {
                    width: maxDimension * window.devicePixelRatio,
                    height: maxDimension * window.devicePixelRatio
                }
            },
            handleMenuSelect(i) {
                this.select = i;
            }
        }

    }
</script>
<style lang="less">
    /*scroll-bar*/
    
     ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    
     ::-webkit-scrollbar-track-piece {
        background-color: transparent;
    }
    
    body::-webkit-scrollbar-track-piece {
        background-color: white;
    }
    
     ::-webkit-scrollbar-track-piece:no-button {}
    
     ::-webkit-scrollbar-thumb {
        background-color: #aaa;
        border-radius: 3px;
    }
    
     ::-webkit-scrollbar-thumb:hover {
        background-color: #888;
    }
    
     ::-webkit-scrollbar-thumb:active {
        background-color: #666;
    }
    
     ::-webkit-scrollbar-button {
        display: none;
    }
    
     ::-webkit-scrollbar-button:vertical {
        width: 5px;
    }
    
     ::-webkit-scrollbar-button:horizontal {
        width: 54px;
    }
    
     ::-webkit-scrollbar-button:vertical:start:decrement {
        background-color: #d2d2d2;
    }
    
     ::-webkit-scrollbar-button:vertical:end:increment {
        background-color: #d2d2d2;
    }
    
     ::-webkit-scrollbar-button:horizontal:start:decrement {
        background-color: #d2d2d2;
    }
    
     ::-webkit-scrollbar-button:horizontal:end:increment {
        background-color: #d2d2d2;
    }
    
    .el-upload {
        -webkit-user-drag: auto;
    }
    
    .app {
        display: flex;
        min-height: 100%;
        height: 100%;
        .el-menu-item-group__title {
            padding-bottom: 9px;
        }
        .el-menu-item,
        .el-submenu__title {
            height: 36px;
            line-height: 36px;
        }
        .nav {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 150px;
            overflow-x: hidden;
            overflow-y: auto;
            border-right: 1px solid #ccc;
            background-color: #d2d2d2;
            color: var(--color-subtle);
            border-right: 1px solid var(--color-border);
            background-color: var(--color-bg);
            .el-menu {
                flex: 1;
                overflow-y: auto;
                background: none;
                .el-menu-item {
                    transition-duration: .1s;
                    &.is-active {
                        background-color: #d3dce6;
                    }
                }
            }
            &>header {
                text-align: center;
                line-height: 50px;
                margin-bottom: 1rem;
                border-bottom: 1px solid var(--color-border);
            }
            &>footer {
                margin-top: 1rem;
                padding: 1rem;
                border-top: 1px solid var(--color-border);
                text-align: center;
                &>a {
                    display: block;
                    width: 100%;
                    padding: 0;
                    line-height: 2;
                    font: inherit;
                    font-size: 13px;
                    color: inherit;
                    border: none;
                    background-color: transparent;
                    cursor: default;
                    outline: none;
                    text-align: center;
                    text-decoration: none;
                    cursor: pointer;
                }
            }
        }
        .main {
            flex: 1;
            position: relative;
            overflow: hidden;
            .section {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow-x: hidden;
                overflow-y: auto;
                color: var(--color-accent);
                pointer-events: none;
                visibility: hidden;
                opacity: 0;
                transform: translateX(-20px);
                transition: visibility 0s .12s linear, opacity .12s ease-in, transform .12s ease-in;
                &.active {
                    pointer-events: auto;
                    visibility: visible;
                    opacity: 1;
                    transform: translateX(0);
                    transition: visibility 0s 0s linear, opacity .36s ease-out, transform .36s ease-out;
                }
            }
        }
    }
</style>