//var db = openDatabase('email', '3.0', 'email', 20 * 1024 * 1024);

var db;

var DBContext = function(opt) {
    if (!opt || !opt.dbname || !opt.size) {
        throw Error("参数必须");
    }
    this.dbname = opt.dbname;
    this.size = opt.size;
    this.des = opt.des;
    this.version = '3.0';
    db = openDatabase(opt.dbname, '3.0', opt.des, opt.size);
}

DBContext.prototype.query = function(sql, param = [], cb, err) {
    db.transaction(function(context) {
        context.executeSql(sql, param, (context, result) => {
            typeof cb == "function" && cb.call(db, result);
        }, (context, error) => {
            typeof err == "function" && err.call(db, error);
        });
    });
    //result format
    //interface SQLResultSet {
    //    readonly attribute long insertId;
    //    readonly attribute long rowsAffected;
    //    readonly attribute SQLResultSetRowList rows;
    //};
}

DBContext.prototype.querylist = function(sql = [], param = [], cb, err) {
    var cur = 0,
        r = 0;
    var next = function(ctx, opt) {
        ctx.executeSql(opt.sql, opt.param, (ctx, result) => {
            if (cur < sql.length - 1) {
                cur++;
                r += result.rowsAffected;
                next(ctx, { sql: sql[cur], param: param[cur] || [] });
            } else {
                typeof cb == "function" && cb.call(db, { rowsAffected: r });
            }
        }, (ctx, error) => {
            typeof err == "function" && err.call(db, error);
            return;
        });
    }
    db.transaction(function(context) {
        next(context, { sql: sql[cur], param: param[cur] })
    });
}

export default DBContext;