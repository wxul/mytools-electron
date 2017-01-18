<template>
    <div class="rss-read">
        <el-menu :default-active="currss" class="el-menu-vertical-demo" :unique-opened="true" @select="readrss">
            <li class="el-menu-item toolmenu" style="padding-left: 10px;">
                <span>管理</span>
                <div class="menus">
                    <span @click="rssdialog.add=true" title="添加RSS源"><i class="fa fa-rss fa-fw"></i></span>
                    <span @click="rssedit" title="编辑"><i class="fa fa-edit fa-fw"></i></span>
                    <span @click="rssreload" title="刷新"><i class="fa fa-refresh fa-fw"></i></span>
                    <span @click="rssdel" title="删除当前"><i class="fa fa-trash fa-fw"></i></span>
                </div>
            </li>
            <el-submenu :index="f" v-for="(item,f) in catrss" v-if="f!='_nonefile_'">
                <template slot="title"><i class="el-icon-message"></i> {{f}}</template>
<el-menu-item :index="r.url" v-for="r in item" v-text="r.name"></el-menu-item>
</el-submenu>
<el-menu-item :index="r.url" v-for="r in catrss['_nonefile_']" v-text="r.name"></el-menu-item>
</el-menu>

<div class="rss-content">
    <ul class="el-titles el-menu" :class="curtopic==null?'':'hidden'">
        <li class="el-menu-item updatetime" v-show="currsschannel && currsschannel.item && dateformat(currsschannel.lastBuildDate)!==null">更新于:{{datestring(currsschannel.lastBuildDate)}}</li>
        <li class="el-menu-item" v-for="item in currsschannel.item" @click="curtopic=item">
            <time class="uptime">[{{datestring(item.pubDate)}}]</time>
            <p v-html="clearCDATA(item.title)"></p>
        </li>
    </ul>
    <div class="topic" :class="curtopic!=null?'':'hidden'">
        <el-button style="position: fixed;right:20px;top:10px;" size="mini" type="info" @click="curtopic=null">返回</el-button>
        <p class="title">
            <a :href="clearCDATA(topic.link)" v-html="clearCDATA(topic.title)"></a>
        </p>
        <p v-html="clearCDATA(topic.description)"></p>
        <p v-html="clearCDATA(topic['content:encoded'])"></p>
    </div>
</div>
<el-dialog title="添加" v-model="rssdialog.add">
    <el-form :model="addrssform">
        <el-form-item label="名称" label-width="70px">
            <el-input v-model="addrssform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="70px">
            <el-select v-model="addrssform.rsscat" filterable allow-create placeholder="请选择或输入分类">
                <el-option v-for="item in cats" :label="item.n" :value="item.v">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="RSS源" label-width="70px">
            <el-input v-model="addrssform.rsslink" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="rssdialog.add=false">取 消</el-button>
        <el-button type="primary" @click="handleAddRss">确 定</el-button>
    </div>
</el-dialog>
<el-dialog title="编辑" v-model="rssdialog.edit">
    <el-form :model="editrssform">
        <el-form-item label="名称" label-width="70px">
            <el-input v-model="editrssform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="70px">
            <el-select v-model="editrssform.rsscat" filterable allow-create placeholder="请选择或输入分类">
                <el-option v-for="item in cats" :label="item.n" :value="item.v">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="RSS源" label-width="70px">
            <el-input v-model="editrssform.rsslink" disabled auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="rssdialog.edit=false">取 消</el-button>
        <el-button type="primary" @click="handleEditRss">确 定</el-button>
    </div>
</el-dialog>
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
                rsss: [], //所有rss源
                currss: "", //已选中rss的url
                channels: [], //所有已加载的rss频道
                currsschannel: {}, //当前显示的rss频道
                curtopic: null, //当前显示的文章
                ispending: false,
                cururl: "", //已选中的rss的url
                rssdialog: {
                    add: false,
                    edit: false
                },
                addrssform: {
                    name: "",
                    rsscat: "无",
                    rsslink: ""
                },
                editrssform: {
                    name: "",
                    rsscat: "",
                    rsslink: ""
                }
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
            },
            cats() {
                if (!this.rsss) return [];
                var t = [];
                var cat = {};
                this.rsss.forEach((e, i) => {
                    var f = e.file;
                    if (!f) {
                        f = "_nonefile_";
                    }
                    if (!(f in cat)) {
                        cat[f] = [];
                        t.push(f == '_nonefile_' ? {
                            n: "无",
                            v: ""
                        } : {
                            n: f,
                            v: f
                        });
                    }
                    //cat[f].push(e);
                });
                return t;
            },
            catrss() {
                if (!this.rsss) return [];
                var cat = {};
                this.rsss.forEach((e, i) => {
                    var f = e.file;
                    if (!f) {
                        f = "_nonefile_";
                    }
                    if (!(f in cat)) {
                        cat[f] = [];
                    }
                    cat[f].push(e);

                });
                return cat;
            }
        },
        mounted() {
            this.loadrss();

            ipc.on("rss-change-cb", (e, r) => {
                if (r.state) {
                    for (var k in this.rssdialog) {
                        this.rssdialog[k] = false;
                    }
                    this.loadrss();
                }
            })
        },
        methods: {
            handleAddRss() {
                console.log(this.addrssform)
                if (this.addrssform.name && this.addrssform.rsslink) {
                    if (this.findrssbyurl(this.addrssform.rsslink) !== null) {
                        ipc.send("err-dialog", {
                            title: "错误",
                            txt: "该链接已存在！"
                        });
                        return;
                    } else {
                        ipc.send("rss-change", {
                            type: "add",
                            name: this.addrssform.name,
                            file: this.addrssform.rsscat,
                            url: this.addrssform.rsslink
                        });
                    }
                }
            },
            findrssbyurl(url) {
                var re = this.rsss.filter(e => {
                    return e.url == url || e.url.indexOf(url) >= 0 || url.indexOf(e.url) >= 0;
                })
                return re.length > 0 ? re[0] : null;
            },
            handleEditRss() {
                if (this.editrssform.name) {
                    ipc.send("rss-change", {
                        type: "edit",
                        name: this.editrssform.name,
                        file: this.editrssform.rsscat,
                        url: this.currss
                    });
                }
            },
            rssedit() {
                if (!this.currss) return;
                var rss = this.findrssbyurl(this.currss);
                this.editrssform = {
                    name: rss.name,
                    rsscat: rss.file,
                    rsslink: rss.url
                }
                this.rssdialog.edit = true;
            },
            rssreload() {
                this.loadrss();
            },
            rssdel() {
                if (!this.currss) return;
                var rss = this.findrssbyurl(this.currss);

                this.$confirm(`确定删除RSS ${rss.name}, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    ipc.send("rss-change", {
                        type: "delrss",
                        url: this.currss
                    });
                    this.currss = "";
                }).catch(() => {});
            },
            clearCDATA(str) {
                //console.log(str, typeof str);
                //return 1;
                return !!str ? typeof str == "object" ? str['#cdata'] : str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1") : "";
            },
            loadrss() {
                rsdb.getRss((list) => {
                    this.rsss = list;
                    log(list);

                })
            },
            selectrss(index) {
                console.log(index);
                var obj = this.rsss.filter((e) => {
                    return e.url == index;
                });
                if (obj && obj.length) {
                    this.readrss(obj[0]);
                }
            },
            readrss(url) {
                console.log(url);
                this.curtopic = null;
                this.currss = url;
                this.cururl = url;
                this.getRss(url);
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
                    }).catch((e) => {
                        ipc.send("err-dialog", {
                            title: "错误",
                            txt: "请求错误或者不支持的格式！"
                        });
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
                    var d = new Date(str);
                    return d == 'Invalid Date' ? str : d;
                }
                return null;
            },
            datestring(str) {
                var date = this.dateformat(this.clearCDATA(str));
                return date ? (date instanceof Date) ? date.toLocaleString() : date : "未知时间";
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
        & .toolmenu {
            width: 100%;
            height: 26px;
            line-height: 26px;
            box-sizing: border-box;
            font-size: 12px;
            cursor: default;
            .menus {
                float: right;
                height: 26px;
                &>span {
                    cursor: pointer;
                    font-size: 14px;
                }
            }
        }
        &>.el-menu {
            height: 100%;
            font-size: 12px;
            &.el-menu-vertical-demo {
                overflow-y: auto;
                min-width: 160px;
                .el-menu-item {
                    height: 36px;
                    line-height: 36px;
                    padding: 0 10px !important;
                }
                .el-submenu__title {
                    padding-left: 10px !important;
                    padding-right: 10px;
                    .el-submenu__icon-arrow {
                        right: 10px;
                    }
                }
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