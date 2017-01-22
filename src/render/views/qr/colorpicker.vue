<template>
    <div class="color-picker">
        <el-tooltip placement="top" :manual="true" :value="show">
            <div slot="content">
                <chrome-picker v-model="colors" @change-color="colorChange" :closeView="()=>{show=false}"></chrome-picker>
            </div>
            <div class="colordiv" :style="{backgroundColor:color}" @click="e=>{show=!show;e.stopPropagation();}"></div>
        </el-tooltip>
    </div>
</template>
<script>
    import chrome from 'vue-color/src/components/Chrome.vue';
    export default {
        name: "color-picker",
        components: {
            'chrome-picker': chrome
        },
        props: {
            handleChange: {
                type: Function,
                default: () => {}
            }
        },
        mounted() {
            var _ = this;
            document.addEventListener("click", function(e) {
                _.show = false;
            })
        },
        data() {
            return {
                show: false,
                colors: "",
                color: "#000"
            }
        },
        methods: {
            colorChange(e) {
                this.color = e.hex;
                this.handleChange(e);
            }
        }
    }
</script>
<style>
    .color-picker {
        display: inline-block;
    }
    
    .color-picker .colordiv {
        width: 20px;
        height: 20px;
        cursor: pointer;
        vertical-align: middle;
    }
    
    .color-picker .el-tooltip__rel {
        vertical-align: middle;
    }
</style>