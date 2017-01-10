<template>
    <div class="index markdown-body" v-html="mdhtml">this is index!</div>
</template>
<script>
    import '../assets/css/md.css';
    import marked from 'marked';
    import config from '../assets/config';
    import fs from 'fs';

    const log = config.log;
    export default {
        data() {
            return {
                md: "# 加载中..."
            }
        },
        computed: {
            mdhtml() {
                return marked(this.md, {
                    sanitize: true
                });
            }
        },
        mounted() {
            var _ = this;
            
            fs.readFile('./readme.md', function(err, data) {
                if (err) {
                    return log(err);
                }
                log("异步读取: " + data.toString());
                _.md = data.toString();
            });
        }
    }
</script>
<style>

</style>