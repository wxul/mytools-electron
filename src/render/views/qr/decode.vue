<template>
    <div class="qr-de">
        <el-row :gutter="20">
            <el-col :span="19" :offset="1">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="图片">
                        <el-upload
                            action="/test.com"
                            type="drag"
                            :thumbnail-mode="true"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :default-file-list="fileList"
                            :before-upload="handleUpload"
                            >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击添加</em></div>
                            <div class="el-upload__tip" slot="tip">只能添加图片文件</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="热键">
                        使用 <code>Command/Control</code> + <code>Alt</code> + <code>Q</code> 截取屏幕上的二维码
                    </el-form-item>
                    <el-form-item label="解码">
                        <el-input type="textarea" v-model="form.decodetext" :rows="4" :spellcheck="false"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import config from '../../assets/config';
    const log = config.log;
    import qrcode from '../../../source/llqrcode.js';
    const ipc = require('electron').ipcRenderer;

    const electron = require('electron');
    const desktopCapturer = electron.desktopCapturer;
    const electronScreen = electron.screen;

    export default {
        data() {
            return {
                form: {
                    decodetext: ""
                },
                imgurl: "",
                fileList: [],
                imgdata: "",
                dialogVisible: false,
                screen: false
            }
        },
        mounted() {
            qrcode.callback = (result) => {
                this.form.decodetext = result;
                if (this.screen && result !== "error decoding QR Code") {
                    this.screen = false;
                    ipc.send("qr-screen-success");
                }
            };
            ipc.on("print-screen-pressed", e => {
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

                            this.fileList = [{
                                name: "screenshot",
                                url: base64
                            }];
                            qrcode.decode(base64);
                        }
                    })
                });
            });
        },
        methods: {
            determineScreenShotSize() {
                const screenSize = electronScreen.getPrimaryDisplay().workAreaSize
                const maxDimension = Math.max(screenSize.width, screenSize.height)
                return {
                    width: maxDimension * window.devicePixelRatio,
                    height: maxDimension * window.devicePixelRatio
                }
            },
            handleRemove(file, fileList) {
                //console.log(file, fileList);
                this.imgdata = "";
                this.form.decodetext = "";
            },
            handlePreview(file) {
                //this.dialogVisible = true;
                this.LoadImage(file.url, (img) => {
                    ipc.send("show-img-window", {
                        url: file.url,
                        name: file.name,
                        width: img.width,
                        height: img.height
                    });
                })

            },
            LoadImage(imgSrc, callback) {
                var image = new Image();
                image.src = imgSrc;
                if (image.complete) {
                    callback(image);
                    image.onload = function() {};
                } else {
                    image.onload = function() {
                        callback(image);
                        // clear onLoad, IE behaves erratically with animated gifs otherwise
                        image.onload = function() {};
                    }
                    image.onerror = function() {
                        log("Could not load image.");
                    }
                }
            },
            decodeImg(filename, result) {
                this.imgdata = result;
                this.fileList = [{
                    name: filename,
                    url: result
                }];
                qrcode.decode(result);
            },
            handleUpload(file) {
                var _ = this;
                var reader = new FileReader();
                reader.onload = function(f) {
                    _.decodeImg(file.name, f.target.result);
                }
                reader.readAsDataURL(file);
                //this.fileList=[file];
                return false;
            }
        }
    }
</script>
<style lang="less">
    .qr-de {
        padding-top: 20px;
        .el-upload {
            line-height: normal;
        }
        .el-upload__tip {
            line-height: normal;
        }
        .el-dragger {
            height: auto;
            min-height: 180px;
            max-height: 800px;
        }
        .el-dragger__cover {
            position: static;
            font-size: 0;
        }
        .el-dragger__cover__content {
            position: static;
        }
        .el-dialog {
            width: auto;
            max-width: 100%;
        }
        .el-dialog__body {
            padding: 20px 10px;
        }
        code {
            font-family: monospace, monospace;
            padding: 0;
            padding-top: 0.2em;
            padding-bottom: 0.2em;
            margin: 0;
            font-size: 85%;
            background-color: rgba(0, 0, 0, 0.04);
            border-radius: 3px;
        }
    }
</style>