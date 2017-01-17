import config from '../../assets/config';
const log = config.log;
import xml2json from '../../../source/xml2json';

var rsslist = [{
        name: "知乎每日精选",
        url: "https://www.zhihu.com/rss"
    },
    {
        name: "煎蛋",
        url: "http://feeds2.feedburner.com/jandan"
    },
    //数学
    {
        name: "Matrix67",
        url: "http://www.matrix67.com/blog/feed"
    },
    //艺术设计
    {
        name: "理想生活实验室",
        url: "http://www.toodaylab.com/feed"
    },
    {
        name: "时尚生活杂志",
        url: "http://www.adaymag.com/feed/"
    },
    {
        name: "优设",
        url: "http://www.uisdc.com/feed"
    },
    {
        name: "摄影世界",
        url: "http://www.photoworld.com.cn/feed"
    },
    {
        name: "Unsplash",
        url: "https://unsplash.com/rss"
    },
    {
        name: "The Sartorialist",
        url: "http://www.thesartorialist.com/feed/"
    },
    //软件
    {
        name: "Evernote",
        url: "http://evernote-tw.tumblr.com/rss"
    },
    {
        name: "异次元软件世界",
        url: "http://feed.iplaysoft.com/"
    },
    {
        name: "反斗软件",
        url: "http://www.apprcn.com/feed"
    },
    //科技科学
    {
        name: "Engadget中国版",
        url: "http://cn.engadget.com/rss.xml"
    },
    {
        name: "cnBeta",
        url: "http://rss.cnbeta.com/rss"
    },
    {
        name: "月光微博客",
        url: "http://www.williamlong.info/blog/rss.xml"
    },
    {
        name: "月光博客",
        url: "http://feed.williamlong.info/"
    },
    {
        name: "泛科學",
        url: "http://pansci.asia/feed"
    },
    {
        name: "极客公园",
        url: "http://www.geekpark.net/rss"
    },
    {
        name: "36氪",
        url: "http://36kr.com/feed"
    },
    {
        name: "爱范儿",
        url: "http://www.ifanr.com/feed"
    },
    {
        name: "极客范",
        url: "http://www.geekfan.net/feed/"
    },
    {
        name: "GFW与XX",
        url: "http://www.chinagfw.org/feeds/posts/default?alt=rss"
    },
    {
        name: "微软亚洲研究院",
        url: "http://blog.sina.com.cn/rss/1286528122.xml"
    },
    {
        name: "博客园",
        url: "http://feed.cnblogs.com/blog/sitehome/rss"
    },
    {
        name: "前端观察",
        url: "https://www.qianduan.net/rss/"
    },
    {
        name: "科学公园",
        url: "http://www.scipark.net/feed/"
    },
    //评论新闻
    {
        name: "政见",
        url: "http://cnpolitics.org/feed/"
    },
    {
        name: "大家",
        url: "http://hanhanone.sinaapp.com/feed/dajia"
    },
    {
        name: "南都周刊",
        url: "http://www.nbweekly.com/rss/smw/"
    },
    {
        name: "Human Rights Watch News",
        url: "https://www.hrw.org/zh-hans/rss/news"
    },
    {
        name: "海德沙龙",
        url: "http://headsalon.org/feed"
    },
    {
        name: "每日鲜果精选",
        url: "http://xianguo.com/service/dailyshare"
    },
    {
        name: "网易新闻·有态度专栏",
        url: "http://news.163.com/special/00011K6L/rss_newsattitude.xml"
    },
    {
        name: "科学网新闻中心",
        url: "http://www.sciencenet.cn/xml/news-0.aspx?news=0"
    },
    /*暂不支持rdf
        {
            name: "自由亚洲电台",
            url: "http://www.rfa.org/mandarin/RSS"
        },*/
    {
        name: "纽约时报中文网",
        url: "http://cn.nytimes.com/rss.html"
    },
    {
        name: "BBC Chinese",
        url: "http://feeds.bbci.co.uk/zhongwen/simp/rss.xml"
    },
    //生活购物
    {
        name: "Nhzy资讯",
        url: "http://www.nhzy.org/feed"
    },
    {
        name: "什么值得买",
        url: "http://feed.smzdm.com/"
    },
    {
        name: "今日推荐指南",
        url: "http://zh.wikihow.com/feed.rss"
    },
    //效率时间管理
    /*  暂不支持feed
    {
        name: "褪墨",
        url: "http://feed.mifengtd.cn/"
    },*/
    {
        name: "战隼的学习探索",
        url: "http://www.read.org.cn/feed"
    },
    {
        name: "读书笔记",
        url: "http://www.write.org.cn/feed"
    },
    //个人博客
    {
        name: "孤岛客",
        url: "http://www.huangjiwei.com/blog/?feed=rss2"
    },
    {
        name: "学而时嘻之",
        url: "http://www.geekonomics10000.com/feed"
    },
    {
        name: "徐贲的BLOG",
        url: "http://blog.sina.com.cn/rss/1286402547.xml"
    },
    //阅读学习
    {
        name: "读写人",
        url: "http://www.duxieren.com/duxieren.xml"
    },
    {
        name: "時尚生活雜誌",
        url: "http://www.adaymag.com/feed/"
    },
    {
        name: "词穷先生美文网",
        url: "http://www.ciqiong.cn/feed"
    },
    {
        name: "上海书评",
        url: "http://www.dfdaily.com/rss/1170.xml"
    },
    //综合
    /*
    {
        name: "",
        url: ""
    },
    {
        name: "",
        url: ""
    },
    {
        name: "",
        url: ""
    },
    {
        name: "",
        url: ""
    },
    {
        name: "",
        url: ""
    },
    {
        name: "",
        url: ""
    }*/
];

function getList() {
    var s = localStorage['rsslist'];
    if (!s) return null;
    return JSON.parse(s);
}

function setList(newlist) {
    localStorage['rsslist'] = JSON.stringify(newlist);
}

if (!!localStorage['rsslist'] || localStorage['rsslist'].length == 0) {
    setList(rsslist);
}

/*
var db = openDatabase('rssdb', '3', "rss列表", 2 * 1024);
function createTable(cb) {
    console.log(db);
    db.transaction(function(tx) {
        tx.executeSql('DROP TABLE rsss');
        tx.executeSql('CREATE TABLE IF NOT EXISTS rsss (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, url TEXT NOT NULL, iconurl TEXT)', [], null, (e, err) => {
            console.log(err);
        });
    }, function(e, r) {
        typeof cb == "function" && cb(e, r);
    }, (e, r) => {
        console.log(e, r);
    });
}

function query(sql, params = [], cb) {
    db.transaction(function(tx) {
        tx.executeSql(sql, params, function(tx, result) {
            typeof cb == "function" && cb(result);
        }, function(e, err) { console.log(err); });
    });
}

function insertlist(params = [], cb) {
    db.transaction(function(tx) {
        params.forEach((e, i) => {
            tx.executeSql('INSERT INTO rsss (name, url) VALUES (?, ?)', [params[i].name, params[i].url]);
        });
    }, function(e, r) {
        typeof cb == "function" && cb(e, r);
    });
}

function getCount(cb) {
    query("select count(1) as count from rsss", [], function(re) {
        cb(re.rows[0].count);
    })
}

function insert(val = { name: "test", url: "testurl" }, cb) {
    console.log(val);
    query('INSERT INTO rsss (name, url) VALUES (?, ?)', [val.name, val.url], function(re) {
        console.log(re);
    })
}
createTable();
*/

function fromxmltoobj2(xmldoc) {
    var result = JSON.parse(xml2json(xmldoc, "  "));
    if (!result.rss.channel.lastBuildDate) {
        result.rss.channel.ttl = result.rss.channel.ttl || 60;
    } else {
        if (!result.rss.channel.ttl) {
            var lastBuildDate = new Date(result.rss.channel.lastBuildDate);
            result.rss.channel.ttl = parseInt((new Date() - lastBuildDate) / (1000 * 60)) * 2;
        }
    }
    return result;
}

function fromxmltoobj(xmldoc) {
    var re = {};
    var root = xmldoc.querySelector("rss");
    //log(root.querySelector("channel>title").innerHTML);
    re.title = root.querySelector("channel>title") ? root.querySelector("channel>title").innerHTML : "";
    re.link = root.querySelector("channel>link") ? root.querySelector("channel>link").innerHTML : "";
    re.description = root.querySelector("channel>description") ? root.querySelector("channel>description").innerHTML : "";
    re.lastBuildDate = root.querySelector("channel>lastBuildDate") ? new Date(root.querySelector("channel>lastBuildDate").innerHTML) : new Date();
    re.ttl = root.querySelector("channel>ttl") ? +root.querySelector("channel>ttl").innerHTML : 0;
    if (!re.ttl) {
        let space = (new Date()) - re.lastBuildDate;
        re.ttl = (space / (1000 * 60 * 60 * 24) >= 1) ? (24 * 60) : (space / (1000 * 60) > 180) ? parseInt(space / (1000 * 60)) : 180;
    }
    re.items = [];
    var items = root.querySelectorAll("channel>item");
    [].forEach.call(items, (e, i) => {
        //log(e.__proto__)
        //log(e.querySelector("description").innerHTML,e.querySelector("description").innerHTML.replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/,"$1"));
        var x = {
            title: e.querySelector("title").innerHTML.replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/g, "$1"),
            link: e.querySelector("link").innerHTML,
            pubDate: new Date(e.querySelector("pubDate").innerHTML),
            description: (e.querySelector("description").innerHTML || "") /*.replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/g,"$1")*/ .replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
            content: (e.querySelector("encoded").innerHTML || "") /*.replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/g,"$1")*/ .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        };
        re.items.push(x);
    })
    return re;
}

function fromtxttoxml(txt) {
    var dp = new DOMParser();
    var xml = dp.parseFromString(txt, "text/xml");
    //log(xml.__proto__)
    return xml;
}

export default {
    /*
    getDB() {
        return db;
    },
    getCount,
    insert,
    init(cb) {
        createTable((e, r) => {
            getCount(re => {
                if (re == 0) {
                    insertlist(rsslist, cb);
                }
            });
        })

    },
    getRss(cb) {
        query("select name,url from rsss", [], function(re) {
            cb(re.rows);
        })
    },*/
    getRss() {
        return getList();
    },
    getRssList(url) {
        var p = fetch(url).then(res => {
            return res.text();
        }).then(res => {
            return fromtxttoxml(res);
        }).then(res => {
            log(res);
            return fromxmltoobj2(res).rss;
        })
        return p;
    }
}