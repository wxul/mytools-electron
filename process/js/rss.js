const ipc = require('electron').ipcMain;
const fs = require("fs");
const path = require("path");
const BrowserWindow = require('electron').BrowserWindow;

var rsspath = path.resolve(__dirname, "../data/rss.json")

/*
var rss = [{
        "name": "知乎每日精选",
        "file": "综合",
        "url": "https://www.zhihu.com/rss"
    },
    {
        "name": "煎蛋",
        "file": "综合",
        "url": "http://feeds2.feedburner.com/jandan"
    },
    {
        "name": "Matrix67",
        "file": "数学",
        "url": "http://www.matrix67.com/blog/feed"
    },
    {
        "name": "理想生活实验室",
        "file": "艺术设计",
        "url": "http://www.toodaylab.com/feed"
    },
    {
        "name": "时尚生活杂志",
        "file": "艺术设计",
        "url": "http://www.adaymag.com/feed/"
    },
    {
        "name": "优设",
        "file": "艺术设计",
        "url": "http://www.uisdc.com/feed"
    },
    {
        "name": "摄影世界",
        "file": "艺术设计",
        "url": "http://www.photoworld.com.cn/feed"
    },
    {
        "name": "Unsplash",
        "file": "艺术设计",
        "url": "https://unsplash.com/rss"
    },
    {
        "name": "The Sartorialist",
        "file": "艺术设计",
        "url": "http://www.thesartorialist.com/feed/"
    },
    {
        "name": "Evernote",
        "file": "软件",
        "url": "http://evernote-tw.tumblr.com/rss"
    },
    {
        "name": "异次元软件世界",
        "file": "软件",
        "url": "http://feed.iplaysoft.com/"
    },
    {
        "name": "反斗软件",
        "file": "软件",
        "url": "http://www.apprcn.com/feed"
    },
    {
        "name": "Engadget中国版",
        "file": "科技科学",
        "url": "http://cn.engadget.com/rss.xml"
    },
    {
        "name": "cnBeta",
        "file": "科技科学",
        "url": "http://rss.cnbeta.com/rss"
    },
    {
        "name": "月光微博客",
        "file": "科技科学",
        "url": "http://www.williamlong.info/blog/rss.xml"
    },
    {
        "name": "月光博客",
        "file": "科技科学",
        "url": "http://feed.williamlong.info/"
    },
    {
        "name": "泛科學",
        "file": "科技科学",
        "url": "http://pansci.asia/feed"
    },
    {
        "name": "极客公园",
        "file": "科技科学",
        "url": "http://www.geekpark.net/rss"
    },
    {
        "name": "36氪",
        "file": "科技科学",
        "url": "http://36kr.com/feed"
    },
    {
        "name": "爱范儿",
        "file": "科技科学",
        "url": "http://www.ifanr.com/feed"
    },
    {
        "name": "极客范",
        "file": "科技科学",
        "url": "http://www.geekfan.net/feed/"
    },
    {
        "name": "GFW与XX",
        "file": "科技科学",
        "url": "http://www.chinagfw.org/feeds/posts/default?alt=rss"
    },
    {
        "name": "微软亚洲研究院",
        "file": "科技科学",
        "url": "http://blog.sina.com.cn/rss/1286528122.xml"
    },
    {
        "name": "博客园",
        "file": "科技科学",
        "url": "http://feed.cnblogs.com/blog/sitehome/rss"
    },
    {
        "name": "前端观察",
        "file": "科技科学",
        "url": "https://www.qianduan.net/rss/"
    },
    {
        "name": "科学公园",
        "file": "科技科学",
        "url": "http://www.scipark.net/feed/"
    },
    {
        "name": "政见",
        "file": "评论新闻",
        "url": "http://cnpolitics.org/feed/"
    },
    {
        "name": "大家",
        "file": "评论新闻",
        "url": "http://hanhanone.sinaapp.com/feed/dajia"
    },
    {
        "name": "南都周刊",
        "file": "评论新闻",
        "url": "http://www.nbweekly.com/rss/smw/"
    },
    {
        "name": "Human Rights Watch News",
        "file": "评论新闻",
        "url": "https://www.hrw.org/zh-hans/rss/news"
    },
    {
        "name": "海德沙龙",
        "file": "评论新闻",
        "url": "http://headsalon.org/feed"
    },
    {
        "name": "每日鲜果精选",
        "file": "评论新闻",
        "url": "http://xianguo.com/service/dailyshare"
    },
    {
        "name": "网易新闻·有态度专栏",
        "file": "评论新闻",
        "url": "http://news.163.com/special/00011K6L/rss_newsattitude.xml"
    },
    {
        "name": "科学网新闻中心",
        "file": "评论新闻",
        "url": "http://www.sciencenet.cn/xml/news-0.aspx?news=0"
    },
    {
        "name": "纽约时报中文网",
        "file": "评论新闻",
        "url": "http://cn.nytimes.com/rss.html"
    },
    {
        "name": "BBC Chinese",
        "file": "评论新闻",
        "url": "http://feeds.bbci.co.uk/zhongwen/simp/rss.xml"
    },
    {
        "name": "Nhzy资讯",
        "file": "生活购物",
        "url": "http://www.nhzy.org/feed"
    },
    {
        "name": "什么值得买",
        "file": "生活购物",
        "url": "http://feed.smzdm.com/"
    },
    {
        "name": "今日推荐指南",
        "file": "生活购物",
        "url": "http://zh.wikihow.com/feed.rss"
    },
    {
        "name": "战隼的学习探索",
        "file": "效率",
        "url": "http://www.read.org.cn/feed"
    },
    {
        "name": "读书笔记",
        "file": "效率",
        "url": "http://www.write.org.cn/feed"
    },
    {
        "name": "孤岛客",
        "file": "个人博客",
        "url": "http://www.huangjiwei.com/blog/?feed=rss2"
    },
    {
        "name": "学而时嘻之",
        "file": "个人博客",
        "url": "http://www.geekonomics10000.com/feed"
    },
    {
        "name": "徐贲的BLOG",
        "file": "个人博客",
        "url": "http://blog.sina.com.cn/rss/1286402547.xml"
    },
    {
        "name": "读写人",
        "file": "阅读学习",
        "url": "http://www.duxieren.com/duxieren.xml"
    },
    {
        "name": "時尚生活雜誌",
        "file": "阅读学习",
        "url": "http://www.adaymag.com/feed/"
    },
    {
        "name": "词穷先生美文网",
        "file": "阅读学习",
        "url": "http://www.ciqiong.cn/feed"
    },
    {
        "name": "上海书评",
        "file": "阅读学习",
        "url": "http://www.dfdaily.com/rss/1170.xml"
    }
];*/

ipc.on("rss-require", (e) => {
    var result = JSON.parse(fs.readFileSync(rsspath));
    //console.log(result);
    e.returnValue = result;
    //e.sender.send("rss-required-list", result);
});
//console.log(rsspath);
//fs.writeFileSync(rsspath, JSON.stringify(rss));

ipc.on("rss-change", (e, o) => {
    var rsslist = JSON.parse(fs.readFileSync(rsspath));
    switch (o.type) {
        case "add":
            var newrss = { name: o.name, file: o.file, url: o.url };
            rsslist.push(newrss);
            break;
        case "edit":
            rsslist = rsslist.map((e, i) => {
                if (e.url == o.url) {
                    e.name = o.name,
                        e.file = o.file
                }
                return e;
            })
            break;
        case "delrss":
            rsslist = rsslist.filter((e, i) => {
                return e.url != o.url;
            })
            break;
        case "delcat":

            break;
        default:
            break;
    }
    fs.writeFileSync(rsspath, JSON.stringify(rsslist));
    e.sender.send("rss-change-cb", { state: true });
})