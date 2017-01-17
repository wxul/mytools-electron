<template>
    <div class="rss-read">
        <ul class="el-menu" :class="ispending && 'disable'">
             <li class="el-menu-item" :class="r==currss && 'is-active'" v-for="r in rsss" @click="readrss(r)" v-text="r.name"></li>
        </ul>
        <div class="rss-content">
            <ul class="el-titles el-menu" :class="curtopic==null?'':'hidden'">
                <li class="el-menu-item updatetime" v-show="currsschannel && currsschannel.item && dateformat(currsschannel.lastBuildDate)!==null">更新于:{{datestring(currsschannel.lastBuildDate)}}</li>
                <li class="el-menu-item" v-for="item in currsschannel.item" @click="curtopic=item">
                    <time class="uptime">[{{datestring(item.pubDate)}}]</time><p v-html="clearCDATA(item.title)"></p>
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
                curtopic: null,
                ispending: false,
                cururl: ""
            }
        },
        watch: {
            cururl(oldv, newv) {
                console.log(oldv, newv);
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
                //console.log(str, typeof str);
                //return 1;
                return !!str ? typeof str == "object" ? str['#cdata'] : str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1") : "";
            },
            readrss(r) {
                this.curtopic = null;
                this.currss = r;
                this.cururl = r.url;
                this.getRss(r.url);
            },
            getRss(url) {
                var obj = this.findbyurl(url);

                if (obj != null) {
                    console.log(this.isexpire(obj.rss));
                }
                if (obj == null || this.isexpire(obj.rss)) {
                    this.ispending = true;
                    rsdb.getRssList(url).then(res => {
                        //log(res);
                        /*this.delchannels(obj);
                        this.channels.push({
                            url: url,
                            rss: res.channel
                        });*/
                        if (obj == null) {
                            this.channels.push({
                                url: url,
                                rss: res.channel
                            });
                        } else {
                            this.changechannel(url, res.channel);
                        }
                        this.currsschannel = res.channel;
                        this.ispending = false;
                    })
                } else {
                    this.currsschannel = obj.rss;
                }
            },
            changechannel(url, newchannel) {
                this.channels.map((e) => {
                    if (e.url == url) {
                        e.rss = newchannel;
                    }
                    return e;
                });
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
            dateformat(str) {
                if (!str) {
                    return new Date();
                } else if (typeof str === "string") {
                    return new Date(str);
                }
                return null;
            },
            datestring(str) {
                var date = this.dateformat(this.clearCDATA(str));
                return date ? date.toLocaleString() : "未知时间";
            },
            isexpire(rssobj) {
                var now = new Date();
                var builddate = this.dateformat(rssobj.lastBuildDate);
                if (now == null) return false;
                var expire = builddate.setMinutes(builddate.getMinutes() + rssobj.ttl);
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
            overflow-y: auto;
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
                background-color: #fff;
                li {
                    cursor: pointer;
                    &.updatetime {
                        cursor: default;
                        color: #1D8CE0;
                        &:hover {
                            background-color: #fff;
                        }
                    }
                    .uptime {
                        float: right;
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