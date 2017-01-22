<template>
    <div class="el-upload">
        <div class="el-upload__inner el-dragger" 
            @click="handleClick"
            @drop.prevent="onDrop"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
        >
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击添加</em></div>
            <input class="el-upload__input" type="file" ref="input" @change="handleChange" multiple="multiple" accept=".js">
        </div><slot name="tips"></slot>
        
        <transition-group tag="ul" class="el-upload__files" name="list">
            <li
            v-for="file in files"
            class="el-upload__file is-finished"
            :key="file" >
            <a class="el-upload__file__name" >
                <i class="el-icon-document"></i>{{file.name}} ({{sizeformat(file.size)}})
            </a>
            <span class="el-upload__btn-delete" v-show="!upload" @click="delFile(file)">删除</span>
            
            </li>
        </transition-group>
        <el-button size="small" type="primary" @click="submit" :disabled="iszip">{{upload?"正在处理":"DO IT！"}}</el-button>
    </div>
</template>

<script>
    import config from '../../assets/config';
    const log = config.log;

    const ipc = require('electron').ipcRenderer;
    export default {
        name: 'my-upload',
        props: {
            onSubmit: {
                type: Function,
                default: function() {}
            },
            action: {
                type: String,
                required: true
            },
            onError: {
                type: Function,
                default: function() {}
            },
            onSuccess: {
                type: Function,
                default: function() {}
            },
            withCredentials: {
                type: Boolean
            },
            params: {
                type: Object
            },
            headers: {
                type: Object
            }
        },
        data() {
            return {
                upload: false,
                dragOver: false,
                files: [],
                progress: 0,
                iszip: false
            }
        },
        methods: {
            sizeformat(val) {
                if (val > 1024 * 1024) {
                    return (val / (1024 * 1024)).toFixed(2) + " MB";
                } else if (val > 1024) {
                    return (val / (1024)).toFixed(2) + " KB";
                } else {
                    return val + " Byte";
                }
            },
            handleChange(ev) {
                const files = ev.target.files;

                if (!files) {
                    return;
                }
                this.addFile(files);
                this.$refs.input.value = null;
            },
            parsePercentage(val) {
                return parseInt(val, 10);
            },
            handleClick() {
                this.$refs.input.click();
            },
            onDrop(e) {
                this.dragOver = false;
                var files = [].filter.call(e.dataTransfer.files, (e, i) => {
                    return e.type == "application/javascript";
                });
                this.addFile(files);
            },
            addFile(files) {
                this.files = this.files.concat([...files]);
            },
            delFile(file) {
                var files = this.files;
                files.splice(files.indexOf(file), 1);
                /*this.files=this.files.filter((e,i)=>{
                    return e!=file;
                });*/
            },
            onProgress(e) {
                this.progress = e.percent || 0;
            },
            submit() {
                var f = this.files.map((e, i) => {
                    return e.path
                });
                console.log(f);
                this.iszip = true;
                var r = ipc.sendSync("file-zip", f);
                this.iszip = false;
                this.onSuccess(r);
            }
        }
    };
</script>

<style>
    .el-upload,
    .el-upload__tip {
        line-height: normal;
    }
    
    .el-progress {
        margin-bottom: 10px;
    }
</style>