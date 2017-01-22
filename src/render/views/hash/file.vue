<template>
    <div class="h-file">
        <el-row :gutter="20">
            <el-col :span="19" :offset="1">
                <i class="fa fa-circle-o-notch fa-spin fa-fw"></i> 康明宋~~ 
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import config from '../../assets/config';
    const log = config.log;
    export default {
        data() {
            return {}
        }
    }
</script>
<style>
    .h-file {
        padding-top: 20px;
    }
</style>