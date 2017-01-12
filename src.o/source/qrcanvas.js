import {QRCode,QRErrorCorrectLevel} from './qrcode.js';

if (true) {
    var extend,
        _extend,
        _isObject;

    _isObject = function(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    }

    _extend = function self(destination, source) {
        var property;
        for (property in destination) {
            if (destination.hasOwnProperty(property)) {

                // 若destination[property]和sourc[property]都是对象，则递归
                if (_isObject(destination[property]) && _isObject(source[property])) {
                    self(destination[property], source[property]);
                };

                // 若sourc[property]已存在，则跳过
                if (source.hasOwnProperty(property)) {
                    continue;
                } else {
                    source[property] = destination[property];
                }
            }
        }
    }

    var $ = new Object();
    $.extend = function() {
        var arr = arguments,
            result = {},
            i;

        if (!arr.length) return {};

        for (i = arr.length - 1; i >= 0; i--) {
            if (_isObject(arr[i])) {
                _extend(arr[i], result);
            };
        }

        arr[0] = result;
        return result;
    }
}


function createQRImage(P, Q, X) {
    function W(a) {
        var b, c, d, e;
        b = "";
        d = a.length;
        for (c = 0; c < d; c++)
            e = a.charCodeAt(c),
            1 <= e && 127 >= e ? b += a.charAt(c) : 2047 < e ? (b += String.fromCharCode(224 | e >> 12 & 15),
                b += String.fromCharCode(128 | e >> 6 & 63),
                b += String.fromCharCode(128 | e >> 0 & 63)) : (b += String.fromCharCode(192 | e >> 6 & 31),
                b += String.fromCharCode(128 | e >> 0 & 63));
        return b
    }
    var l = {
            text: "",
            level: "L",
            width: 300,
            margin: 10,
            round: 0,
            isWater: !1,
            bgColor: "#fff",
            fgColor: "#000",
            inptColor: null,
            ptColor: null,
            gcColor: null,
            gradientWay: "0",
            background: null,
            foreground: null,
            logoimg: null,
            logoType: "border",
            pinType: 0,
            paintColor: "#f00",
            fontEffect: "default",
            fontSize: 28,
            ftColor: null,
            content: null,
            rotate: 0
        },
        a = $.extend({}, l, Q),
        u = this,
        D = document.getElementById(P),
        E = null,
        d = 0,
        F = [],
        k = {},
        K = null,
        B = 300,
        R = null,
        L = 0,
        y = !1,
        w = !1;
    this.drawImage = function(f) {
        f = f || G;
        var b = D.getContext("2d");
        if (D.width = D.height = a.width,
            b.fillStyle = a.bgColor,
            b.fillRect(0, 0, a.width, a.width),
            null != a.background) {
            var c = a.background.width,
                h = a.background.height;
            if (0 < c)
                for (var e = 0; e < a.width; e += c)
                    for (var g = 0; g < a.width; g += h)
                        b.drawImage(a.background, e, g, c, h)
        }
        c = "";
        h = E.length;
        d = (a.width - 2 * a.margin) / h;
        e = a.width / 2;
        if (0 != a.pinType) {
            var n = Math.round(9 * d),
                g = pt_top = Math.floor(a.margin - d),
                p = pt_bottom = Math.ceil(a.width - a.margin - 8 * d);
            switch (b.save(),
                b.beginPath(),
                b.fillStyle = a.ptColor || a.fgColor,
                b.fillRect(a.margin - d + 1, a.margin - d + 1, 9 * d - 2, 9 * d - 2),
                b.fillStyle = a.inptColor || a.fgColor,
                a.pinType) {
                case 7:
                    b.moveTo(4 * d + a.margin - d, 3 * d + a.margin - d);
                    b.lineTo(5.64 * d + a.margin - d, 3.4 * d + a.margin - d);
                    b.lineTo(6.18 * d + a.margin - d, 4.3 * d + a.margin - d);
                    b.lineTo(5.1 * d + a.margin - d, 6.52 * d + a.margin - d);
                    b.lineTo(3.66 * d + a.margin - d, 6.54 * d + a.margin - d);
                    b.lineTo(2.52 * d + a.margin - d, 5.56 * d + a.margin - d);
                    b.lineTo(2.52 * d + a.margin - d, 4.22 * d + a.margin - d);
                    b.fill();
                    break;
                case 2:
                case 3:
                case 4:
                case 6:
                case 9:
                case 10:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                    b.fillRect(a.margin + 1.4 * d - 1, a.margin + 1.4 * d - 1, 4.2 * d + 1, 4.2 * d + 1);
                    break;
                default:
                    b.fillRect(a.margin + 2 * d - 1, a.margin + 2 * d - 1, 3 * d + 1, 3 * d + 1)
            }
            b.rect(a.margin - d, a.margin - d, 9 * d, 9 * d);
            b.clip();
            b.closePath();
            b.globalCompositeOperation = "destination-in";
            b.drawImage(R[L], g, pt_top, n, n);
            b.restore();
            var x = b.getImageData(g, pt_top, n, n),
                n = b.createImageData(x.width, x.height),
                t = b.createImageData(x.width, x.height),
                v = x.data,
                q = n.data,
                u = t.data,
                z = x.data.length,
                w = x.width,
                x = x.height;
            for (let i = 0; i < z; i += 4) {
                var C = Math.floor(i / w / 4),
                    B = i % (4 * w),
                    y = C * w * 4 + (4 * w - B) - 4,
                    C = (x - 1 - C) * w * 4 + B;
                q[y] = u[C] = v[i];
                q[y + 1] = u[C + 1] = v[i + 1];
                q[y + 2] = u[C + 2] = v[i + 2];
                q[y + 3] = u[C + 3] = v[i + 3]
            }
            b.putImageData(n, p, pt_top);
            b.putImageData(t, g, pt_bottom);
            b.restore();
            M(b, g, pt_top);
            M(b, p, pt_top);
            M(b, g, pt_bottom)
        }
        a.gcColor && (K = N(b, a.fgColor, e));
        b.save();
        for (e = 0; e < h; e++)
            for (g = 0; g < h; g++)
                m(e, g) ? 0 != a.pinType && H(e, g, h) || (c = F[e][g] ? a.paintColor : a.ptColor || a.inptColor && H(e, g, h) ? S(e, g, h) : a.fgColor,
                    null == a.gcColor || (a.ptColor || a.inptColor) && H(e, g, h) || (c = K),
                    b.fillStyle = c,
                    b.strokeStyle = c,
                    p = g * d + a.margin,
                    n = e * d + a.margin + d / 2,
                    b.beginPath(),
                    b.moveTo(p, n),
                    a.round ? a.isWater ? (m(e, g - 1) || m(e - 1, g) || m(e - 1, g - 1) ? I(b, g, e, 0) : A(b, g, e, 0),
                        m(e - 1, g) || m(e, g + 1) || m(e - 1, g + 1) ? I(b, g, e, 1) : A(b, g, e, 1),
                        m(e + 1, g) || m(e, g + 1) || m(e + 1, g + 1) ? I(b, g, e, 2) : A(b, g, e, 2),
                        m(e + 1, g) || m(e, g - 1) || m(e + 1, g - 1) ? I(b, g, e, 3) : A(b, g, e, 3)) : (A(b, g, e, 0),
                        A(b, g, e, 1),
                        A(b, g, e, 2),
                        A(b, g, e, 3)) : b.rect(Math.round(g * d + a.margin) + .5, Math.round(e * d + a.margin) + .5, Math.round(d), Math.round(d)),
                    b.closePath(),
                    null != a.foreground ? T(b) : (b.fill(),
                        b.stroke())) : a.isWater && (c = F[e][g] ? a.paintColor : a.ptColor || a.inptColor ? S(e, g, h) : a.fgColor,
                    H(e, g, h) || (m(e - 1, g) && m(e, g - 1) && J(b, g, e, 0, c),
                        m(e + 1, g) && m(e, g - 1) && J(b, g, e, 3, c),
                        m(e + 1, g) && m(e, g + 1) && J(b, g, e, 2, c),
                        m(e - 1, g) && m(e, g + 1) && J(b, g, e, 1, c)));
        b.restore();
        for (e = 0; e < a.rotate; e++) {
            c = b;
            g = h = a.width;
            c.save();
            t = c.getImageData(0, 0, h, g);
            h = c.createImageData(t.width, t.height);
            g = t.data;
            p = h.data;
            n = t.data.length;
            t = t.width;
            for (let i = 0; i < n; i += 4)
                v = i % (4 * t) * t + 4 * (t - Math.floor(i / t / 4) - 1),
                p[v] = g[i],
                p[v + 1] = g[i + 1],
                p[v + 2] = g[i + 2],
                p[v + 3] = g[i + 3];
            c.putImageData(h, 0, 0);
            c.restore()
        }
        if (null != a.logoimg && "L" != a.level)
            switch (c = a.width / l.width,
                a.logoType) {
                case "icon":
                    h = a.logoimg;
                    e = 3 * c;
                    g = k.left * c;
                    p = k.top * c;
                    n = k.width * c;
                    c *= k.height;
                    b.save();
                    U(b, h, 9 + e, g - e, p - e, n + 2 * e, c + 2 * e);
                    b.fillStyle = "#fff";
                    b.fill();
                    b.restore();
                    b.save();
                    U(b, h, 9, g, p, n, c);
                    b.clip();
                    b.drawImage(h, g, p, n, c);
                    b.restore();
                    break;
                case "border":
                    h = a.logoimg;
                    e = 3 * c;
                    g = k.left * c;
                    p = k.top * c;
                    n = k.width * c;
                    c *= k.height;
                    b.save();
                    b.fillStyle = "#fff";
                    b.fillRect(g - e, p - e, n + 2 * e, c + 2 * e);
                    b.drawImage(h, g, p, n, c);
                    b.restore();
                    break;
                case "stroke":
                    h = a.logoimg;
                    e = 3 * c;
                    g = k.left * c;
                    p = k.top * c;
                    n = k.width * c;
                    c *= k.height;
                    b.save();
                    b.shadowBlur = 0;
                    b.shadowColor = "#FFF";
                    for (t = 0; t < 2 * e + 1; t++)
                        for (v = 0; v < 2 * e + 1; v++)
                            b.save(),
                            b.shadowOffsetX = -e - 2E3 + v,
                            b.shadowOffsetY = -e + t,
                            b.drawImage(h, g + 2E3, p, n, c);
                    b.drawImage(h, g, p, n, c);
                    b.restore();
                    b.shadowOffsetX = 0;
                    b.shadowOffsetY = 0;
                    break;
                default:
                    b.drawImage(a.logoimg, k.left * c, k.top * c, k.width * c, k.height * c)
            }
        if (a.content) {
            c = a.gcColor ? N(b, a.fgColor, a.width / 2) : a.fgColor;
            h = a.width / l.width;
            switch (b.globalCompositeOperation = "source-over",
                b.save(),
                b.textBaseline = "middle",
                b.textAlign = "center",
                b.font = "bold " + a.fontSize * h + "px KaiTi_GB2312",
                a.fontEffect) {
                case "in":
                    b.lineWidth = 8 * h;
                    b.fillStyle = c;
                    b.strokeStyle = a.bgColor;
                    b.strokeText(a.content, a.width / 2, a.width / 2);
                    b.fillText(a.content, a.width / 2, a.width / 2);
                    break;
                case "out":
                    b.lineWidth = 8 * h;
                    b.fillStyle = a.bgColor;
                    b.strokeStyle = c;
                    b.strokeText(a.content, a.width / 2, a.width / 2);
                    b.fillText(a.content, a.width / 2, a.width / 2);
                    break;
                case "stretch":
                    r = 16 * h;
                    b.lineWidth = 2 * h;
                    b.fillStyle = a.ftColor ? a.ftColor : c;
                    b.strokeStyle = "#fff";
                    for (c = 0; c < r; c++)
                        b.globalAlpha = (c + 1) / r,
                        b.strokeText(a.content, a.width / 2, a.width / 2 - r + c),
                        b.fillText(a.content, a.width / 2, a.width / 2 - r + c);
                    break;
                case "3d":
                    r = 5 * h;
                    b.lineWidth = 4 * h;
                    b.fillStyle = a.ftColor ? a.ftColor : c;
                    b.strokeStyle = "#fff";
                    for (c = 0; c < r; c++)
                        b.globalAlpha = (c + 1) / r,
                        b.strokeText(a.content, a.width / 2 + r - 2 * c, a.width / 2 - r + c),
                        b.fillText(a.content, a.width / 2 + r - 2 * c, a.width / 2 - r + c);
                    break;
                case "light":
                    b.lineWidth = 2 * h;
                    b.fillStyle = a.ftColor ? a.ftColor : c;
                    b.shadowColor = "#fff";
                    b.shadowOffsetX = 2 * h;
                    b.shadowOffsetY = -2 * h;
                    b.shadowBlur = 6 * h;
                    b.strokeStyle = "#fff";
                    b.strokeText(a.content, a.width / 2, a.width / 2);
                    b.fillText(a.content, a.width / 2, a.width / 2);
                    break;
                default:
                    b.lineWidth = 6 * h,
                        b.strokeStyle = "#fff",
                        b.strokeText(a.content, a.width / 2, a.width / 2),
                        b.fillStyle = a.ftColor || "#000",
                        b.fillText(a.content, a.width / 2, a.width / 2)
            }
            b.restore()
        }
        f()
    };
    this.changeContent = function(f, b) {
        a.content = f;
        this.drawImage()
    };
    this.changeText = function(f, b) {
        b = b ? b : this.nullFn;
        a.text = f;
        z(b)
    };
    this.changeLevel = function(f) {
        a.level = f;
        z()
    };
    this.changeBgColor = function(f) {
        a.background = null;
        a.bgColor = f;
        this.drawImage()
    };
    this.changeFgColor = function(f) {
        a.foreground = null;
        a.fgColor = f;
        this.drawImage()
    };
    this.changePtColor = function(f) {
        a.foreground = null;
        a.ptColor = f;
        this.drawImage()
    };
    this.changeInPtColor = function(f) {
        a.foreground = null;
        a.inptColor = f;
        this.drawImage()
    };
    this.changeGcColor = function(f, b) {
        a.foreground = null;
        a.gradientWay = f;
        a.gcColor = b;
        this.drawImage()
    };
    this.changeGradientWay = function(f, b) {
        a.foreground = null;
        a.gradientWay = f;
        a.gcColor = b;
        this.drawImage()
    };
    this.changeBackground = function(a) {
        O(a, "background")
    };
    this.changeForeground = function(a) {
        O(a, "foreground")
    };
    this.changeLogoimg = function(f, b) {
        a.logoType = b;
        a.level = "H";
        O(f, "logoimg")
    };
    this.changeLogotype = function(f) {
        a.logoType = f;
        this.drawImage()
    };
    this.changeFtColor = function(f) {
        a.ftColor = f;
        this.drawImage()
    };
    this.changeFontEffect = function(f) {
        a.fontEffect = f;
        this.drawImage()
    };
    this.changeFontSize = function(f) {
        a.fontSize = f;
        this.drawImage()
    };
    this.changeMargin = function(f) {
        a.margin = parseInt(f);
        this.drawImage()
    };
    this.changeWidth = function(f) {
        a.width = 300 < f ? 300 : f;
        B = f;
        this.drawImage()
    };
    /*
        this.changePtImage = function(f) {
            a.pinType = f;
            0 != a.pinType ? V(["images/2013/diy/small/pin-" + a.pinType + ".png", "images/2013/diy/big/pin-" + a.pinType + ".png"], function(a) {
                R = a;
                u.drawImage()
            }) : u.drawImage()
        }
        ;*/
    this.changeRotate = function(f) {
        a.rotate = parseInt(f);
        this.drawImage()
    };

    this.changeTemplate = function(f) {
        a = $.extend({}, l, f);
        this.drawImage()
    };
    this.changeRound = function(f, b) {
        a.isWater = f;
        a.round = d * b;
        this.drawImage()
    };
    this.setRound = function(f, b) {
        a.isWater = f;
        a.round = d * b
    };
    /*
        this.resetWidth = function() {
            $("#" + P).attr({
                width: l.width,
                height: l.width
            });
            a.width = l.width;
            this.drawImage()
        }
        ;*/
    this.resetMargin = function() {
        a.margin = l.margin;
        this.drawImage()
    };
    this.resetBgColor = function() {
        a.bgColor = l.bgColor;
        this.drawImage()
    };
    this.resetFgColor = function() {
        a.fgColor = l.fgColor;
        this.drawImage()
    };
    this.resetPtColor = function() {
        a.ptColor = l.ptColor;
        this.drawImage()
    };
    this.resetInPtColor = function() {
        a.inptColor = l.inptColor;
        this.drawImage()
    };
    this.resetGcColor = function() {
        a.gcColor = l.gcColor;
        this.drawImage()
    };
    this.resetBackground = function() {
        a.background = l.background;
        this.drawImage()
    };
    this.resetForeground = function() {
        a.foreground = l.foreground;
        this.drawImage()
    };
    this.clearLogoimg = function() {
        a.logoimg = l.logoimg
    };
    this.resetLogoimg = function(f) {
        a.logoimg = l.logoimg;
        a.logoimg || a.content || (a.level = l.level,
            k = {},
            f());
        z()
    };
    this.resetContent = function(f) {
        a.content = l.content;
        a.logoimg || a.content || (a.level = l.level,
            k = {},
            f());
        z()
    };
    this.resetFtColor = function() {
        a.ftColor = l.ftColor;
        this.drawImage()
    };
    this.resetRound = function() {
        a.round = l.round;
        this.drawImage()
    };
    this.resetPaint = function() {
        paint_data = [];
        this.drawImage()
    };
    this.resetAll = function() {
        var f = a.text;
        a = $.extend({}, l, Q);
        a.text = f;
        z()
    };
    this.getBase64 = function(f) {
        f = f || G;
        var b = "";
        if (B != a.width) {
            var b = B / l.width,
                c = {
                    width: a.width,
                    margin: a.margin,
                    round: a.round
                };
            a.width = B;
            a.margin *= b;
            a.round *= b;
            L = 1;
            u.drawImage();
            b = D.toDataURL().substring(22);
            a = $.extend(a, c);
            L = 0;
            u.drawImage()
        } else
            b = D.toDataURL().substring(22);
        f(b)
    };
    var G = function() {},
        V = function(a, b) {
            function c(e) {
                if (!(e < a.length))
                    return void b(d);
                var g = new Image;
                g.src = a[e];
                d.push(g);
                g.onload = function() {
                    c(++e)
                }
            }
            b = b || G;
            var d = [];
            0 < a.length ? c(0) : b()
        },
        O = function(f, b) {
            var c = f.target.files[0];
            if (c.type && !/image\/\w+/.test(c.type))
                return alert("\u8bf7\u786e\u4fdd\u6587\u4ef6\u4e3a\u56fe\u50cf\u7c7b\u578b"), !1;
            var d = new FileReader;
            d.readAsDataURL(c);
            d.onload = function(c) {
                V([this.result], function(c) {
                    a[b] = c[0];
                    if ("logoimg" == b) {
                        var f;
                        if (null != a.logoimg && "L" != a.level) {
                            f = a.logoimg.width;
                            var e = a.logoimg.height,
                                d = c = 0,
                                h = 0,
                                m = 0,
                                q = 0,
                                q = l.width - 2 * l.margin;
                            switch (a.level) {
                                case "M":
                                    q = Math.floor(q / 5);
                                    break;
                                case "Q":
                                    q = Math.floor(q / 4);
                                    break;
                                case "H":
                                    q = Math.floor(.3 * q);
                                    break;
                                default:
                                    q = Math.floor(.3 * q)
                            }
                            f = (0 < f && (Math.max(f, e) < q ? (c = f,
                                    d = e) : f > e ? (c = q,
                                    d = Math.floor(q / f * e)) : (d = q,
                                    c = Math.floor(q / e * f)),
                                h = Math.floor(l.width / 2 - c / 2),
                                m = Math.floor(l.width / 2 - d / 2)), {
                                left: h,
                                top: m,
                                width: c,
                                height: d
                            })
                        } else
                            f = void 0;
                        k = f;
                        z()
                    } else
                        u.drawImage()
                })
            }
        },
        z = function(f) {
            f = f || G;
            var b = new QRCode(-1, QRErrorCorrectLevel[a.level]);
            b.addData(W(a.text));
            b.make();
            E = b.modules;
            b = b.getModuleCount();
            F = [];
            for (let i = 0; i < b; i++)
                F[i] = [];
            u.drawImage();
            f()
        },
        m = function(a, b) {
            var c = E.length;
            return !(0 > a || 0 > b || a >= c || b >= c) && E[a][b]
        },
        H = function(a, b, c) {
            var d = 0;
            return 2 <= a && 5 > a && 2 <= b && 5 > b ? d = 1 : 7 > a && 7 > b ? d = 1 : a >= c - 5 && a < c - 2 && 2 <= b & 5 > b ? d = 1 : a >= c - 7 && a < c && 0 <= b & 7 > b ? d = 1 : 2 <= a && 5 > a && b >= c - 5 & b < c - 2 ? d = 1 : 0 <= a && 7 > a && b >= c - 7 & b < c && (d = 1),
                d
        },
        T = function(f) {
            f.save();
            f.clip();
            var b = a.foreground.width,
                c = a.foreground.height;
            if (0 < b)
                for (var d = 0; d < a.width; d += b)
                    for (var e = 0; e < a.width; e += c)
                        f.drawImage(a.foreground, d, e, b, c);
            f.restore()
        },
        I = function(f, b, c, h) {
            var e = 0,
                g = 0;
            switch (h) {
                case 0:
                    e = b * d + a.margin;
                    g = c * d + a.margin;
                    f.lineTo(e, g);
                    break;
                case 1:
                    e = b * d + d + a.margin;
                    g = c * d + a.margin;
                    f.lineTo(e, g);
                    break;
                case 2:
                    e = b * d + d + a.margin;
                    g = c * d + d + a.margin;
                    f.lineTo(e, g);
                    break;
                case 3:
                    e = b * d + a.margin,
                        g = c * d + d + a.margin,
                        f.lineTo(e, g)
            }
        },
        A = function(f, b, c, h) {
            var e = 0,
                g = 0;
            switch (h) {
                case 0:
                    e = b * d + a.round + a.margin;
                    g = c * d + a.round + a.margin;
                    f.arc(e, g, a.round, Math.PI, 1.5 * Math.PI, !1);
                    break;
                case 1:
                    e = b * d + d - a.round + a.margin;
                    g = c * d + a.round + a.margin;
                    f.arc(e, g, a.round, 1.5 * Math.PI, 2 * Math.PI, !1);
                    break;
                case 2:
                    e = b * d + d - a.round + a.margin;
                    g = c * d + d - a.round + a.margin;
                    f.arc(e, g, a.round, 0, Math.PI / 2, !1);
                    break;
                case 3:
                    e = b * d + a.round + a.margin,
                        g = c * d + d - a.round + a.margin,
                        f.arc(e, g, a.round, Math.PI / 2, Math.PI, !1)
            }
        },
        J = function(f, b, c, h, e) {
            var g, k;
            a.width / 2;
            switch (f.beginPath(),
                null != a.gcColor && (e = K),
                f.fillStyle = e,
                f.strokeStyle = e,
                h) {
                case 0:
                    g = b * d + a.round + a.margin;
                    k = c * d + a.round + a.margin;
                    f.arc(g, k, a.round, Math.PI, 1.5 * Math.PI, !1);
                    g = b * d + a.margin;
                    k = c * d + a.margin;
                    break;
                case 1:
                    g = b * d + d - a.round + a.margin;
                    k = c * d + a.round + a.margin;
                    f.arc(g, k, a.round, 1.5 * Math.PI, 2 * Math.PI, !1);
                    g = b * d + d + a.margin;
                    k = c * d + a.margin;
                    break;
                case 2:
                    g = b * d + d - a.round + a.margin;
                    k = c * d + d - a.round + a.margin;
                    f.arc(g, k, a.round, 0, Math.PI / 2, !1);
                    g = b * d + d + a.margin;
                    k = c * d + d + a.margin;
                    break;
                case 3:
                    g = b * d + a.round + a.margin,
                        k = c * d + d - a.round + a.margin,
                        f.arc(g, k, a.round, Math.PI / 2, Math.PI, !1),
                        g = b * d + a.margin,
                        k = c * d + d + a.margin
            }
            f.lineTo(g, k);
            f.closePath();
            null != a.foreground ? T(f) : (f.fill(),
                f.stroke())
        },
        N = function(f, b, c) {
            var grd="";
            switch (grd = "",
                a.gradientWay) {
                case "backslash":
                    grd = f.createRadialGradient(0, 0, 0, c, c, a.width);
                    break;
                case "slash":
                    grd = f.createRadialGradient(c, c, a.width, 0, 0, 0);
                    break;
                case "horizontal":
                    grd = f.createLinearGradient(0, 0, a.width, 0);
                    break;
                case "vertical":
                    grd = f.createLinearGradient(0, 0, 0, a.width);
                    break;
                case "circular":
                    grd = f.createRadialGradient(c, c, a.width / 4, c, c, c);
                    break;
                default:
                    grd = a.fgColor
            }
            return 0 != a.gradientWay && (grd.addColorStop(0, b),
                    grd.addColorStop(1, a.gcColor)),
                grd
        },
        S = function(f, b, c) {
            var d = a.inptColor ? a.inptColor : a.fgColor,
                e = a.ptColor ? a.ptColor : a.fgColor;
            return 2 <= f && 5 > f && 2 <= b && 5 > b ? d : 7 > f && 7 > b ? e : f >= c - 5 && f < c - 2 && 2 <= b & 5 > b ? d : f >= c - 7 && f < c && 0 <= b & 7 > b ? e : 2 <= f && 5 > f && b >= c - 5 & b < c - 2 ? d : 0 <= f && 7 > f && b >= c - 7 & b < c ? e : a.fgColor
        },
        M = function(f, b, c) {
            var h = Math.round(9 * d);
            if (null != a.gcColor && !a.ptColor && !a.inptColor) {
                f.save();
                f.globalCompositeOperation = "source-atop";
                var e = N(f, a.ptColor || a.fgColor, a.width / 2);
                f.fillStyle = e;
                f.fillRect(b + 1, c + 1, h - 2, h - 2);
                f.rect(b, c, h, h);
                f.clip();
                f.restore()
            }
            f.save();
            f.globalCompositeOperation = "destination-over";
            f.fillStyle = a.bgColor;
            f.fillRect(b - 1, c - 1, h + 2, h + 2);
            f.globalCompositeOperation = "source-over";
            f.restore()
        },
        U = function(a, b, c, d, e, g, k) {
            a.beginPath();
            a.arc(d + g - c, e + c, c, 0, 1.5 * Math.PI, !0);
            a.lineTo(d + c, e);
            a.arc(d + c, e + c, c, 1.5 * Math.PI, 1 * Math.PI, !0);
            a.lineTo(d, e + k - c);
            a.arc(d + c, e + k - c, c, 1 * Math.PI, .5 * Math.PI, !0);
            a.lineTo(d + g - c, e + k);
            a.arc(d + g - c, e + k - c, c, .5 * Math.PI, 0, !0);
            a.closePath()
        };
    /*(function() {
        var d = 0
          , b = 0;
        $(D).bind({
            mousedown: function(c) {
                var h = a.width / l.width
                  , e = $(this).position()
                  , g = c.clientX - e.left;
                c = c.clientY - e.top + $(window).scrollTop();
                g > k.left * h && g < (k.left + k.width) * h && c > k.top * h && c < (k.top + k.height) * h ? (w = !0,
                d = k.left - g,
                b = k.top - c) : w = !1;
                y = !0
            },
            mouseup: function(a) {
                var b = $(this).position();
                a.clientX - b.left;
                a.clientY - b.top + $(window).scrollTop();
                w = y = !1;
                u.drawImage()
            },
            mousemove: function(c) {
                var h = a.width / l.width
                  , e = $(this).position()
                  , g = c.clientX - e.left;
                c = c.clientY - e.top + $(window).scrollTop();
                g > k.left * h - 8 && g < (k.left + k.width) * h + 8 && c > k.top * h - 8 && c < (k.top + k.height) * h + 8 ? g > k.left * h && g < (k.left + k.width) * h && c > k.top * h && c < (k.top + k.height) * h ? $(this).css("cursor", "move") : $(this).css("cursor", "default") : $(this).css("cursor", "default");
                w ? (k.left = d + g,
                k.top = b + c,
                u.drawImage()) : y && u.drawImage()
            },
            mouseleave: function(a) {
                w = y = !1
            }
        });
        z()
    })()*/
};