<template>
    <div class="app">
        <div class="nav">
            <header>Albert的工具们</header>
            <el-menu mode="vertical" default-active="index" @select="handleMenuSelect">
                <el-menu-item index="index"><i class="fa fa-home fa-fw"></i> 主页</el-menu-item>
                <el-menu-item-group title="HASH">
                    <el-menu-item index="h-txt"><i class="fa fa-file-text fa-fw"></i> 文本</el-menu-item>
                    <el-menu-item index="h-file"><i class="fa fa-file fa-fw"></i> 文件</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="压缩">
                    <el-menu-item index="z-txt"><i class="fa fa-file-text-o fa-fw"></i> 文本</el-menu-item>
                    <el-menu-item index="z-file"><i class="fa fa-file-code-o fa-fw"></i> 文件</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="二维码">
                    <el-menu-item index="qr-g"><i class="fa fa-qrcode fa-fw"></i> 生成</el-menu-item>
                    <el-menu-item index="qr-de"><i class="fa fa-picture-o fa-fw"></i> 解码</el-menu-item>
                </el-menu-item-group>
            </el-menu>
            <footer>
                <a class="about" href="#">关于</a>
                <a class="github" href="#"><i class="fa fa-github"></i> Github <i class="fa fa-code-fork"></i></a>
            </footer>
        </div>
        <div class="main" id="main">
            <div class="section" :class="select=='index'?'active':''"><indexView></indexView></div>
            <div class="section" :class="select=='h-txt'?'active':''"><hashtxtView></hashtxtView></div>
            <div class="section" :class="select=='h-file'?'active':''"><indexView></indexView></div>
            <div class="section" :class="select=='z-txt'?'active':''"><mintxtView></mintxtView></div>
            <div class="section" :class="select=='z-file'?'active':''"><minfileView></minfileView></div>
            <div class="section" :class="select=='qr-g'?'active':''"><indexView></indexView></div>
            <div class="section" :class="select=='qr-de'?'active':''"><indexView></indexView></div>
        </div>
        </select>
    </div>
</template>
<script>
    import '../assets/css/normalize.css';
    import '../assets/css/style.css';
    //import '../assets/fa/css/font-awesome.css';
    import '../assets/fa/less/font-awesome.less';

    import config from '../assets/config';

    const log = config.log;

    export default {
        components: {
            "indexView": require('./index.vue'),
            "hashtxtView": require('./hash/txt.vue'),
            "mintxtView": require('./min/txt.vue'),
            "minfileView":require('./min/file.vue')
        },
        data() {
            return {
                select: "index"
            }
        },
        mounted() {
            log(this);
        },
        methods: {
            handleMenuSelect(i) {
                this.select = i;
            }
        }

    }
</script>
<style lang="less">
    .app {
        display: flex;
        min-height: 100%;
        .el-menu-item-group__title {
            padding-bottom: 9px;
        }
        .el-menu-item,
        .el-submenu__title {
            height: 36px;
            line-height: 36px;
        }
        .nav {
            width: 200px;
            overflow-x: hidden;
            overflow-y: auto;
            border-right: 1px solid #ccc;
            background-color: #d2d2d2;
            color: var(--color-subtle);
            border-right: 1px solid var(--color-border);
            background-color: var(--color-bg);
            .el-menu {
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
                padding: 2rem;
                border-top: 1px solid var(--color-border);
                text-align: center;
                &>a {
                    display: block;
                    width: 100%;
                    padding: 0;
                    margin-bottom: .75rem;
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
                padding-top: 10px;
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