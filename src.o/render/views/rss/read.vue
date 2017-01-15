<template>
    <div class="rss-read">
        <ul class="el-menu">
             <li class="el-menu-item" :class="r==currss && 'is-active'" v-for="r in rsss" @click="readrss(r)" v-text="r.name"></li>
        </ul>
        <div class="rss-content">
            <ul class="el-titles" :class="curtopic==null?'':'hidden'">
                <li v-for="item in currsschannel.item" @click="curtopic=item">
                    <p v-html="clearCDATA(item.title)"></p>
                </li>
            </ul>
            <div class="topic" :class="curtopic!=null?'':'hidden'">
                <el-button style="position: fixed;right:20px;top:10px;" size="mini" type="info" @click="curtopic=null">返回</el-button>
                <p class="title"><a :href="topic.link" v-html="clearCDATA(topic.title)"></a></p>
                <p v-html="clearCDATA(topic.description)"></p>
                <p v-html="clearCDATA(topic['content:encoded'])"></p>
            </div>
        </div>
    </div>
</template>
<script>
    import config from '../../assets/config';
    const log = config.log;
    import rsdb from './rss';

    const ipc = require('electron').ipcRenderer;

    export default {
        data() {
            return {
                rsss: [],
                currss: {},
                channels: [],
                currsschannel: {},
                curtopic: null
            }
        },
        computed: {
            topic() {
                return this.curtopic || {};
            }
        },
        mounted() {
            log(rsdb.getRss())
            this.rsss = rsdb.getRss();
        },
        methods: {
            clearCDATA(str) {
                console.log(str, typeof str);
                //return 1;
                return !!str ? typeof str == "object" ? str['#cdata'] : str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1") : "";
            },
            readrss(r) {
                this.curtopic = null;
                this.currss = r;
                this.getRss(r.url);
            },
            getRss(url) {
                var obj = this.findbyurl(url);
                if (obj == null || this.isexpire(obj.rss)) {
                    this.delchannels(obj);
                    rsdb.getRssList(url).then(res => {
                        log(res);
                        this.channels.push({
                            url: url,
                            rss: res.channel
                        });
                        this.currsschannel = res.channel;
                    })
                } else {
                    this.currsschannel = obj.rss;
                }
            },
            findbyurl(url) {
                var re = this.channels.filter(e => {
                    return e.url == url;
                })
                return re.length > 0 ? re[0] : null;
            },
            delchannels(obj) {
                this.channels = this.channels.splice(this.channels.indexOf(obj));
            },
            isexpire(rssobj) {
                var now = new Date();
                if (!rssobj.lastBuildDate) {
                    rssobj.lastBuildDate = new Date();
                } else if (typeof rssobj.lastBuildDate === "string") {
                    rssobj.lastBuildDate = new Date(rssobj.lastBuildDate);
                }
                var expire = rssobj.lastBuildDate.setMinutes(rssobj.lastBuildDate.getMinutes() + rssobj.ttl);
                return now > expire;
            }
        }
    }
</script>
<style lang="less">
    .rss-read {
        height: 100%;
        display: flex;
        &>.el-menu {
            height: 100%;
            font-size: 12px;
            el-menu-item {
                cursor: pointer;
            }
        }
        &>.rss-content {
            a[href] {
                color: #1D8CE0;
                cursor: pointer;
            }
            flex: 1;
            overflow-y: scroll;
            &>.hidden {
                display: none;
            }
            img {
                max-width: 100%;
            }
            &>.el-titles {
                li {
                    cursor: pointer;
                    &:hover{
                        background-color: #ccc;
                    }
                }
            }
            &>.topic {
                -webkit-user-select: text;
                padding: 10px;
                &>p.title {
                    font-size: 20px;
                    font-weight: 600;
                    a {
                        text-decoration: none;
                    }
                }
            }
        }
    }
</style>