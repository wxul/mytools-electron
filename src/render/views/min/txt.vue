<template>
    <div class="min-txt">
        <el-row :gutter="20">
            <el-col :span="19" :offset="1">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="文本内容">
                        <el-input type="textarea" v-model="form.text" :rows="6"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">压缩!</el-button>
                    </el-form-item>
                    <el-form-item label="压缩后">
                        <el-input type="textarea" v-model="form.min" :rows="4"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
    </div>
    
</template>

<script>
    //import min from '../../../source/min';
    import config from '../../assets/config';
    const log = config.log;

    const ipc = require('electron').ipcRenderer;
    export default {
        data() {
            return {
                form: {
                    text: "",
                    min: ""
                }
            }
        },
        methods: {
            onSubmit() {
                var r = ipc.sendSync("txt-zip", this.form.text);
                log(r);
                this.form.min = r;
            }
        }
    }
</script>

<style>
    .min-txt {
        padding-top: 20px;
    }
</style>