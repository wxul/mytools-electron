<template>
    <div class="wating">
        <el-row :gutter="20">
            <el-col :span="19" :offset="1">
                <i class="fa fa-circle-o-notch fa-spin fa-fw"></i> 研究小程序去了~~ 
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
    .wating {
        padding-top: 20px;
    }
</style>