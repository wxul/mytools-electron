<template>
    <div class="h-txt">
        <el-row :gutter="20">
            <el-col :span="19" :offset="1">
                <el-form :model="fileform" label-width="80px">
                    <el-form-item label="文件">
                        <i class="fa fa-circle-o-notch fa-spin fa-fw"></i> 康明宋~~ 
                    </el-form-item>
                </el-form>
                <el-form :model="form" label-width="80px">
                    <el-form-item label="文本">
                        <el-input type="textarea" v-model="form.text" :rows="4"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">HASH!</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    <el-form-item label="大小写">
                        <el-switch on-text="大写" off-text="小写" v-model="form.isupper"></el-switch>
                    </el-form-item>
                    <el-form-item label="MD5">
                        <el-input v-model="comMd5"></el-input>
                    </el-form-item>
                    <el-form-item label="SHA1">
                        <el-input v-model="comSha1"></el-input>
                    </el-form-item>
                    <el-form-item label="Base64">
                        <el-input type="textarea" v-model="form.base64" :rows="4"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onDecode">Base解码</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import hash from '../../../source/hash';
    export default {
        data() {
            return {
                form: {
                    text: "",
                    isupper: true,
                    md5: "",
                    sha1: "",
                    base64: ""
                },
                fileform: {}
            }
        },
        computed: {
            comMd5() {
                return this.form.isupper ? this.form.md5.toUpperCase() : this.form.md5.toLowerCase();
            },
            comSha1() {
                return this.form.isupper ? this.form.sha1.toUpperCase() : this.form.sha1.toLowerCase();
            }
        },
        methods: {
            onSubmit() {
                this.form.md5 = hash.md5(this.form.text);
                this.form.sha1 = hash.sha1(this.form.text);
                this.form.base64 = hash.base64(this.form.text);
            },
            onDecode() {
                this.form.text = hash.base64_decode(this.form.base64)
            }
        }
    }
</script>
<style>
    .h-txt {
        padding-top: 20px;
    }
</style>