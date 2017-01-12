<template>
    <div class="qr-ge">
        <el-row :gutter="20">
            <el-col :span="12" :offset="1">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="文本" name="txt">
                        <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            :rows="6"
                            v-model="txt">
                        </el-input>
                    </el-tab-pane>
                    <el-tab-pane label="网站" name="url" class="tab-url">
                        <el-input placeholder="请输入内容" v-model="url">
                            <el-select v-model="select" slot="prepend" placeholder="请选择">
                            <el-option label="http://" value="1"></el-option>
                            <el-option label="https://" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-tab-pane>
                    <el-tab-pane label="电话" name="tel">
                        <el-input placeholder="请输入电话号码" v-model="tel">
                        </el-input>
                    </el-tab-pane>
                    <el-tab-pane label="邮箱" name="email">
                        <el-input placeholder="请输入邮箱" v-model="email">
                        </el-input>
                    </el-tab-pane>
                    <el-tab-pane label="名片" name="card" class="tab-card">
                        <el-form ref="form" :model="MECARD" label-width="40px">
                            <el-form-item label="姓名">
                                <el-input v-model="MECARD.N"></el-input>
                            </el-form-item>
                            <el-form-item label="地址">
                                <el-input v-model="MECARD.ADR"></el-input>
                            </el-form-item>
                            <el-form-item label="电话">
                                <el-input v-model="MECARD.TEL"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="MECARD.EMAIL"></el-input>
                            </el-form-item>
                            <el-form-item label="网址">
                                <el-input v-model="MECARD.URL"></el-input>
                            </el-form-item>
                            <el-form-item label="QQ">
                                <el-input v-model="MECARD.QQ"></el-input>
                            </el-form-item>
                            <el-form-item label="职位">
                                <el-input v-model="MECARD.TIL"></el-input>
                            </el-form-item>
                            <el-form-item label="单位">
                                <el-input v-model="MECARD.ORG"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="MECARD.NOTE" type="textarea" :rows="4"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="WIFI" name="wifi" class="tab-wifi">
                        <el-form ref="form" :model="WIFI" label-width="80px">
                            <el-form-item label="SSID">
                                <el-input v-model="WIFI.S"></el-input>
                            </el-form-item>
                            <el-form-item label="加密方式">
                                <el-select v-model="WIFI.T" placeholder="请选择" @change="wifichange">
                                    <el-option
                                    v-for="item in Toptions"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="WIFI.P" :disabled="WIFI.T=='nopass'"></el-input>
                            </el-form-item>
                            <el-form-item label="是否隐藏">
                                <el-switch
                                    v-model="WIFI.H"
                                    on-text="是"
                                    off-text="否"
                                    on-color="#13ce66"
                                    off-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                           
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="短信" name="sms" class="tab-sms">
                        <el-form ref="form" :model="SMS" label-width="80px">
                            <el-form-item label="手机号码">
                                <el-input v-model="SMS.Tel" placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="短信内容">
                                <el-input v-model="SMS.NOTE" placeholder="请输入短信内容" type="textarea" :rows="4"></el-input>
                            </el-form-item>
                           
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="效果" name="other" class="tab-other">
                        <span slot="label"><i class="el-icon-picture"></i> 效果</span>
                        
                        <el-form ref="form" :model="other" label-width="80px">
                            <el-form-item label="样式">
                                <el-slider style="width:90%;" v-model="other.round" :min="-50" :max="50" @change="otherRoundChange"></el-slider>
                            </el-form-item>
                            <el-form-item label="颜色">
                                <div class="inline">
                                    前景色
                                    <color-picker :handleChange="onFGColorChange"></color-picker>
                                </div>
                                
                                <div class="inline">
                                    背景色
                                    <color-picker :handleChange="onBGColorChange"></color-picker>
                                </div>
                                <div class="inline">
                                    外框定位点
                                    <color-picker :handleChange="onPtColorChange"></color-picker>
                                </div>
                                <div class="inline">
                                    内点定位点
                                    <color-picker :handleChange="onInPtColorChange"></color-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="渐变">
                                <div class="inline">
                                    渐变色
                                    <color-picker :handleChange="onGCColorChange"></color-picker>
                                </div>
                                <div class="inline">
                                    渐变方式
                                    <el-select style="width:100px;" size="small" v-model="other.gctype" placeholder="请选择" @change="onGCTypeChange">
                                        <el-option
                                        v-for="item in other.gctypes"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="嵌入图标">
                                <el-select style="width:80px;" size="small" v-model="other.logotype" placeholder="请选择" @change="onLogoTypeChange">
                                    <el-option
                                    v-for="item in other.logotypes"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <input type="file" style="display:none;" ref="logo" accept="image/gif,image/jpg,image/png" @change="logoselect"/>
                                <el-button  type="primary" size="small" @click="handleLogo">选择图片</el-button>
                                <span> {{other.logo.logoimg && other.logo.logoimg.target.files[0].name}}</span>
                            </el-form-item>
                            <el-form-item label="其它设置">
                                <div class="inline">
                                    外边距
                                    <el-select style="width:75px;" size="small" v-model="other.margin" placeholder="请选择" @change="onMarginChange">
                                        <el-option
                                        v-for="item in other.margins"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="inline">
                                    纠错等级
                                    <el-select style="width:75px;" size="small" :disabled="other.levellock" v-model="other.level" placeholder="请选择" @change="onLevelChange">
                                        <el-option
                                        v-for="item in other.levels"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="inline">
                                    旋转
                                    <el-select style="width:75px;" size="small" v-model="other.rotate" placeholder="请选择" @change="onRotateChange">
                                        <el-option
                                        v-for="item in other.rotates"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <el-button type="primary" class="draw" @click="handleDraw">{{activeName=='other'?"清除":"生成"}}</el-button>
            </el-col>
            <el-col :span="10" style="text-align:center;">
                <div>
                    <canvas id="canvas"></canvas>
                </div>
                <el-button style="margin:0 auto;" type="primary" size="small"  @click="handleSave">保存图片</el-button>
                <a :href="dl.base64" :download="dl.name" style="display:none;" ref="btna"></a>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import config from '../../assets/config';
    const log = config.log;
    import createQRImage from '../../../source/qrcanvas.js';
    import ColorPicker from './colorpicker.vue';
    export default {
        components: {
            ColorPicker
        },
        data() {
            return {
                form: {},
                activeName: "",
                canvas: null,
                txt: "",
                url: "",
                select: "1",
                tel: "",
                email: "",
                MECARD: {
                    N: "", //姓名
                    ADR: "", //地址
                    TEL: "", //电话
                    EMAIL: "", //邮箱
                    URL: "", //网址
                    QQ: "", //QQ
                    TIL: "", //职位
                    ORG: "", //单位
                    NOTE: "" //备注
                },
                WIFI: {
                    S: "", //SSID
                    P: "", //Password
                    T: "WPA", //type,WEP/WPA/nopass
                    H: false //是否隐藏
                },
                Toptions: [{
                    value: 'nopass',
                    label: '无加密'
                }, {
                    value: 'WEP',
                    label: 'WEP'
                }, {
                    value: 'WPA',
                    label: 'WPA/WPA2'
                }],
                SMS: {
                    Tel: "",
                    NOTE: ""
                },
                dl: {
                    base64: "",
                    name: "二维码.png"
                },
                other: {
                    round: 0,
                    fgcolor: "",
                    bgcolor: "",
                    ptcolor: "",
                    inptcolor: "",
                    gccolor: "#000",
                    gctype: "circular",
                    gctypes: [{
                        label: "无",
                        value: "0"
                    }, {
                        label: "反斜线",
                        value: "backslash"
                    }, {
                        label: "斜线",
                        value: "slash"
                    }, {
                        label: "圆形",
                        value: "circular"
                    }, {
                        label: "水平",
                        value: "horizontal"
                    }, {
                        label: "垂直",
                        value: "vertical"
                    }],
                    margin: 10,
                    margins: [{
                        label: "0",
                        value: 0
                    }, {
                        label: "10px",
                        value: 10
                    }, {
                        label: "20px",
                        value: 20
                    }, {
                        label: "25px",
                        value: 25
                    }],
                    level: "L",
                    levellock: false,
                    levels: [{
                        label: "最低",
                        value: "L"
                    }, {
                        label: "低",
                        value: "M"
                    }, {
                        label: "中",
                        value: "Q"
                    }, {
                        label: "高",
                        value: "H"
                    }],
                    rotate: "0",
                    rotates: [{
                        label: "0",
                        value: "0"
                    }, {
                        label: "90°",
                        value: "1"
                    }, {
                        label: "180°",
                        value: "2"
                    }, {
                        label: "270°",
                        value: "3"
                    }],
                    logo: {
                        logoimg: "",
                        logotype: ""
                    },
                    logotype: "default",
                    logotypes: [{
                        label: "圆角",
                        value: "icon"
                    }, {
                        label: "白底",
                        value: "border"
                    }, {
                        label: "描边",
                        value: "stroke"
                    }, {
                        label: "原图",
                        value: "default"
                    }]
                }
            }
        },
        mounted() {
            this.canvas = new createQRImage("canvas");
            this.canvas.changeText("https://albert.amayading.com");
        },
        computed: {
            mecard() {
                return this.formatter("MECARD");
            },
            wifi() {
                return this.formatter("WIFI");
            },
            sms() {
                return `smsto:${this.SMS.Tel}:${this.SMS.NOTE}`
            }
        },
        methods: {
            setH() {
                this.other.level = "H";
                this.other.levellock = true;
            },
            onLogoTypeChange(e) {
                this.canvas.changeLogoimg(this.other.logo.logoimg, e);
                this.setH();
            },
            logoselect(e) {
                this.other.logo.logoimg = e;
                this.canvas.changeLogoimg(e, this.other.logotype);
                this.setH();
            },
            handleLogo() {
                this.$refs.logo.click();
            },
            onWidthChange(e) {
                this.canvas.changeWidth(e);
            },
            onRotateChange(e) {
                this.canvas.changeRotate(e);
            },
            onLevelChange(e) {
                this.canvas.changeLevel(e);
            },
            onMarginChange(e) {
                console.log(this.other.margin);
                this.canvas.changeMargin(e);
            },
            onGCTypeChange(e) {
                this.canvas.changeGradientWay(this.other.gctype, this.other.gccolor);
            },
            onGCColorChange(e) {
                this.other.gccolor = e.hex;
                this.canvas.changeGcColor(this.other.gctype, e.hex);
            },
            onInPtColorChange(e) {
                this.other.inptcolor = e.hex;
                this.canvas.changeInPtColor(e.hex);
            },
            onPtColorChange(e) {
                this.other.ptcolor = e.hex;
                this.canvas.changePtColor(e.hex);
            },
            onBGColorChange(e) {
                this.other.bgcolor = e.hex;
                this.canvas.changeBgColor(e.hex);
            },
            onFGColorChange(e) {
                //console.log(e);
                this.other.fgcolor = e.hex;
                //this.other.fg.show = false;
                this.canvas.changeFgColor(e.hex);
            },
            otherRoundChange(e) {
                this.canvas.changeRound(e < 0, Math.abs(e) / 100);
            },
            wifichange(e) {
                if (e == "nopass") {
                    this.WIFI.P = "";
                }
            },
            formatter(objName) {
                var obj = this[objName];
                var tmp = "";
                Object.keys(obj).forEach((e, i) => {
                    var val = obj[e];
                    if (!!val) {
                        tmp += `${e}:${val};`;
                    }
                })
                return `${objName}:${tmp};`;
            },
            handleDraw() {
                switch (this.activeName) {
                    case "txt":
                        this.canvas.changeText(this.txt);
                        break;
                    case "url":
                        this.canvas.changeText((this.select == 1 ? "http://" : "https://") + this.url);
                        break;
                    case "tel":
                        this.canvas.changeText(`tel:${this.tel}`);
                        break;
                    case "email":
                        this.canvas.changeText(`mailto:${this.email}`);
                        break;
                    case "card":
                        this.canvas.changeText(this.mecard);
                        break;
                    case "wifi":
                        this.canvas.changeText(this.wifi);
                        break;
                    case "sms":
                        this.canvas.changeText(this.sms);
                        break;
                    case "other": //清除设置
                        this.canvas.resetAll();
                        this.resetAll();
                        break;
                    default:
                        break;
                }

            },
            resetAll() {
                this.other.round = 0;
                this.other.fgcolor = "";
                this.other.bgcolor = "";
                this.other.ptcolor = "";
                this.other.inptcolor = "";
                this.other.gccolor = "#000";
                this.other.gctype = "circular";
                this.other.margin = 10;
                this.other.level = "L";
                this.other.levellock = false;
                this.other.rotate = "0";
                this.other.logo = {
                    logoimg: "",
                    logotype: ""
                }
            },
            handleClick() {
                //console.log(createQRImage);
            },
            handleSave() {
                this.dl.base64 = document.getElementById("canvas").toDataURL('image/png');
                this.$nextTick(function() {
                    this.$refs.btna.click();
                })
            }
        }
    }
</script>
<style lang="less">
    .qr-ge {
        padding-top: 20px;
        .draw.el-button {
            margin-top: 20px;
            float: right;
        }
        .el-tabs__header {
            float: left;
            margin-right: 10px;
            border: 0;
            border-right: 1px solid #d3dce6;
            .el-tabs__item {
                float: none;
                margin-bottom: 0 !important;
                margin-right: -1px !important;
                transition-duration: .1s !important;
                &.is-active {
                    border-bottom-color: #d3dce6 !important;
                    border-right-color: #fff !important;
                    border-radius: 4px 0 0 4px !important;
                }
            }
        }
        .tab-url .el-select .el-input {
            width: 90px;
        }
        .tab-card .el-form .el-form-item,
        .tab-wifi .el-form .el-form-item,
        .tab-sms .el-form .el-form-item,
        .tab-other .el-form .el-form-item {
            margin-bottom: 10px;
        }
        .inline {
            display: inline-block;
            margin-right: 10px;
        }
        #canvas {
            box-shadow: 0 0 4px #333;
            max-width: 100%;
        }
    }
</style>