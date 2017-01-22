import DBContext from '../../../source/sqlitedb';
import config from '../../assets/config';

var db = new DBContext({ dbname: "email", size: 20 * 1024 * 1024 });
var debug = config.DEBUG && false;

var initTable = function() {
    var sql = [],
        param = [];
    //email用户表
    if (debug) {
        sql.push("DROP TABLE IF EXISTS emailusers");
        param.push([]);
    }
    sql.push("CREATE TABLE IF NOT EXISTS emailusers (id INTEGER PRIMARY KEY AUTOINCREMENT, ename TEXT NOT NULL, email TEXT NOT NULL, pwd TEXT NOT NULL, etype TEXT NOT NULL, send TEXT NOT NULL, rec TEXT NOT NULL)");
    param.push([]);

    return new Promise((res, rej) => {
        db.querylist(sql, param, (re) => {
            res(re);
        }, err => {
            rej(err);
        })
    })
}

var init = function() {
    var p = initTable();

    return p;
}

var promise = init();

function getusers() {
    var sql = "select * from emailusers";
    return new Promise((res, rej) => {
        db.query(sql, [], (re) => {
            res(re);
        }, err => {
            rej(err);
        })
    })
}

function adduser(opt = { name: "", email: "", pwd: "", type: "", send: "", rec: "" }) {
    var sql = "insert into emailusers (ename,email,pwd,etype,send,rec) values (?,?,?,?,?,?)";
    return new Promise((res, rej) => {
        db.query(sql, [opt.name, opt.email, opt.pwd, opt.type, opt.send, opt.rec], (re) => {
            res(re);
        }, err => {
            rej(err);
        })
    })
}

function checkemail(email) {
    var sql = "select * from emailusers where email=?",
        param = [email];
    return new Promise((res, rej) => {
        db.query(sql, param, (re) => {
            res(re);
        }, err => {
            rej(err);
        })
    })
}

function finduserbyid(id) {
    var sql = "select * from emailusers where id=?",
        param = [id];
    return new Promise((res, rej) => {
        db.query(sql, param, (re) => {
            res(re);
        }, err => {
            rej(err);
        })
    })
}

export default {
    promise,
    adduser,
    getusers
}