<template>
    <div class="min-file">
        <el-row :gutter="20">
            <el-col :span="19" :offset="1">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="文件">
                        <my-upload
                            :action='action'
                            type="drag"
                            accept=".js"
                            :onSuccess="success"
                            >
                            <div class="el-upload__tip" slot="tips">只能添加js文件</div>
                        </my-upload>
                    </el-form-item>
                    <el-form-item label="压缩后">
                        <el-button size="small" type="primary" @click="savefiledialog" :disabled="!hasfile">{{hasfile?"保存文件":"等待处理"}}</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
    </div>
    
</template>

<script>
    import MyUpload from './upload.vue';
    import config from '../../assets/config';
    const log = config.log;

    const ipc = require('electron').ipcRenderer;
    export default {
        components: {
            MyUpload
        },
        data() {
            return {
                fileList: [],
                action: `/js/file`,
                form: {},
                filecontent: "",
                selectfilepath: ""
            }
        },
        computed: {
            showdl() {
                return !!this.dl.href;
            },
            hasfile() {
                return !!this.filecontent;
            }
        },
        methods: {
            success(data) {
                this.filecontent = data;
            },
            savefiledialog() {
                ipc.on("selected-save-directory", (e, filepath) => {
                    this.selectfilepath = filepath;
                    console.log(filepath);
                    this.savefile();
                })
                ipc.send("save-file-dialog", {
                    title: "保存",
                    defaultPath: this.selectfilepath,
                    filters: [{
                        name: "js文件",
                        extensions: ["js"]
                    }]
                });
            },
            savefile() {
                ipc.send("save-file", {
                    content: this.filecontent,
                    filepath: this.selectfilepath
                });
            }
        }
    }
</script>

<style>
    .min-file {
        padding-top: 20px;
    }
</style>