import config from '../../assets/config';
const log = config.log;
import xml2json from '../../../source/xml2json';
const electron = require("electron");
const ipc = electron.ipcRenderer;

var rsslist = [];

function getList(cb) {
    var result = ipc.sendSync("rss-require");
    rsslist = result;
    typeof cb == "function" && cb(result);
}

/*
function getList() {
    var s = localStorage['rsslist'];
    if (!s) return null;
    return JSON.parse(s);
}

function setList(newlist) {
    localStorage['rsslist'] = JSON.stringify(newlist);
}

if (!localStorage['rsslist'] || localStorage['rsslist'].length == 0) {
    setList(rsslist);
}*/

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
    getRss(cb) {
        return getList(cb);
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