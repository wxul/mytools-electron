<template>
    <div class="email">
        <el-menu :default-active="defaultindex" class="email-menu" :unique-opened="false" @select="menuclick">
            <li class="el-menu-item toolmenu" style="padding-left: 10px;">
                <span>管理</span>
                <div class="menus">
                    <span @click="addemail" title="添加"><i class="fa fa-plus fa-fw"></i></span>
                    <span  title="编辑"><i class="fa fa-edit fa-fw"></i></span>
                    <span @click="load" title="刷新"><i class="fa fa-refresh fa-fw"></i></span>
                    <span  title="删除当前"><i class="fa fa-trash fa-fw"></i></span>
                </div>
            </li>
            <el-submenu v-for="user in users" class="email_tt" :index="user.id+''">
                <template slot="title">{{user.email}}</template>
<el-menu-item :index="'write_'+user.id"><i class="fa fa-pencil-square-o fa-fw"></i> 写信</el-menu-item>
<el-menu-item :index="'inbox_'+user.id" @click="inbox(user)"><i class="fa fa-inbox fa-fw"></i> 收件箱</el-menu-item>
<el-menu-item :index="'unread_'+user.id"><i class="fa fa-envelope-o fa-fw"></i> 未读邮件</el-menu-item>
</el-submenu>
<el-submenu index="contact">
    <template slot="title"><i class="fa fa-address-book fa-fw"></i> 联系人</template>
    <el-menu-item index="write">全部</el-menu-item>
    <el-menu-item index="inbox">分类1</el-menu-item>
    <el-menu-item index="unread">分类2</el-menu-item>
</el-submenu>
</el-menu>
<el-dialog title="添加" v-model="userdialog.add">
    <el-form :model="adduserform">
        <el-form-item label="名称" label-width="70px">
            <el-input v-model="adduserform.ename" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="70px">
            <el-input v-model="adduserform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px">
            <el-input type="password" v-model="adduserform.pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收件服务" label-width="70px">
            <el-input v-model="adduserform.rec" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="SMTP" label-width="70px">
            <el-input v-model="adduserform.send" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别" label-width="70px">
            <el-select v-model="adduserform.etype" placeholder="请选择或输入分类">
                <el-option v-for="item in etype" :label="item.name" :value="item.v">
                </el-option>
            </el-select>
        </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="userdialog.add=false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
    </div>
</el-dialog>
</div>
</template>
<script>
    import config from '../../assets/config';
    const log = config.log;
    import db from './emdb';
    import imap from './imap';

    export default {
        data() {
            return {
                promise: Object,
                users: [],
                userdialog: {
                    add: false
                },
                etype: [{
                    name: "POP3",
                    v: "POP3"
                }, {
                    name: "IMAP",
                    v: "IMAP"
                }],
                adduserform: {
                    ename: "",
                    email: "",
                    pwd: "",
                    etype: "IMAP",
                    send: "",
                    rec: ""
                }
            }
        },
        mounted() {
            this.load();
            /*
            db.promise.catch(err => {
                console.error(err);
            })*/
        },
        computed: {
            defaultindex() {
                return (this.users && this.users.length) ? ('inbox_' + this.users[0].id) : "";
            }
        },
        methods: {
            menuclick(index) {
                console.log(index);
                if (index.indexOf('inbox_') == 0) {
                    let id = index.replace('inbox_', "");
                    console.log(id)
                }
            },
            load() {
                var tmp = [];
                db.getusers().then(re => {
                    console.log(re.rows);
                    [].forEach.call(re.rows, (e, i) => {
                        tmp.push(e);
                    })
                    this.users = tmp;
                })
            },
            handleAddUser() {
                console.log(this.adduserform)
                db.adduser({
                    name: this.adduserform.ename,
                    email: this.adduserform.email,
                    pwd: this.adduserform.pwd,
                    type: this.adduserform.etype,
                    send: this.adduserform.send,
                    rec: this.adduserform.rec
                }).then(re => {
                    console.log(re);
                    if (re.rowsAffected > 0) {
                        this.load();
                        this.userdialog.add = false;
                    }

                })
            },
            addemail() {
                this.adduserform = {
                    ename: "",
                    email: "",
                    pwd: "",
                    etype: "IMAP",
                    send: "",
                    rec: ""
                };
                this.userdialog.add = true;
                /*
                db.adduser({
                    name: "wlj",
                    email: "www",
                    type: "pop3",
                    send: "pop",
                    rec: "imap"
                }).then(re => {
                    console.log(re);
                });*/
            }
        }
    }
</script>
<style lang="less">
    .email {
        display: flex;
        height: 100%;
        .email-menu {
            min-width: 140px;
            max-width: 180px;
            overflow-y: auto;
            font-size: 12px;
            li.el-menu-item {
                transition-duration: .1s;
                height: 36px;
                line-height: 36px;
                padding: 0 10px !important;
                overflow-x: hidden;
                text-overflow: ellipsis;
            }
            .el-submenu__title {
                padding-left: 5px !important;
                .el-submenu__icon-arrow {
                    right: 5px;
                }
            }
            .el-menu-item-group__title {
                padding-top: 6px;
                padding-bottom: 4px;
            }
            .email_tt {
                .el-submenu__title {
                    text-overflow: ellipsis;
                    overflow-x: hidden;
                    white-space: nowrap;
                }
            }
            .toolmenu {
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
        }
    }
</style>