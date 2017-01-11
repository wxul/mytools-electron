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
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
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

    export default {
        data() {
            return {
                form: {
                    decodetext: ""
                },
                imgurl: "",
                fileList: [],
                imgdata: "",
                dialogVisible: false
            }
        },
        mounted() {
            qrcode.callback = (result) => {
                this.form.decodetext = result;
            }
        },
        methods: {
            handleRemove(file, fileList) {
                //console.log(file, fileList);
                this.imgdata = "";
                this.form.decodetext = "";
            },
            handlePreview(file) {
                //this.dialogVisible = true;
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
    }
</style>