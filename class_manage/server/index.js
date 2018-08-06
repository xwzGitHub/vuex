var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'xwz666'
});

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
        // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//初始化
app.get('/', function(req, res) {
    res.send('hello world');
});

//登录接口
app.post('/login', jsonParser, (req, res) => {
    // console.log("login....", req.body)
    connection.query(`select count(*) as num from user where username = ?`, [req.body.username],
        function(err, rows, fields) {
            if (err) throw err;
            if (rows[0].num) {
                connection.query(`select count(*) as num from user where username = ? and password = ?`, [req.body.username, req.body.password], (err, rows, fields) => {
                    // console.log(rows[0].num);
                    if (rows[0].num == 1) {
                        res.json({
                            code: 0,
                            msg: '登陆成功'
                        })
                    } else {
                        res.json({
                            code: -1,
                            msg: '登陆失败'
                        })
                    }
                })
            } else {
                connection.query(`insert into user (username,password,phone,birthday) values('${req.body.username}','${req.body.password}','13000000000',${+ new Date()})`, (err, rows, fields) => {
                    console.log(rows)
                    if (rows.insertId) {
                        res.json({
                            code: 0,
                            msg: "新增成功"
                        })
                    } else {
                        // console.log('插入失败')
                        res.json({
                            code: -2,
                            msg: '新建用户失败'
                        })
                    }
                })

                // res.json({
                //     code: -2,
                //     msg: '不允许创建新用户'
                // })
            }
        })
})

//获取用户信息
app.get("/userList", (req, res) => {
    connection.query('select id,username,birthday,phone,address from user', function(err, rows, fields) {
        if (err) throw err;
        // console.log(rows)
        if (rows[0]) {
            res.json({
                code: 0,
                data: rows
            })
        } else {
            res.json({
                code: -1,
                msg: "暂无匹配"
            })
        }
    })
})

//匹配角色信息
app.get("/rolerList", (req, res) => {
    //选中用户的id  roler的角色信息
    let id = req.query.id,
        //角色列表
        allRoler = [];
    //拉取角色列表信息 
    connection.query("select id,rolename from roler", function(err, rows, fields) {
        // console.log("rolerList......", rows)
        if (err) throw err;
        allRoler = rows;
        if (id) {
            //当前用户下的角色id  角色职位  表名称   匹配  当前有角色id下有的职位    
            connection.query(`select rid,rolename from user_roler,roler where user_roler.rid=roler.id and user_roler.uid=${id} and user_roler.status=1`, (err, rows, fields) => {
                if (err) throw err;
                // console.log("rolerList2...........", rows);
                res.json({
                    code: 0,
                    allRoler,
                    myRoler: rows
                })
            })
        } else {
            res.json({
                code: 0,
                allRoler,
                myRoler: []
            })
        }

    })
})

//添加角色
app.get('/addRoler', (req, res) => {
    let rid = req.query.rid; //角色
    let uid = req.query.uid; //用户个人
    // 先查询用户是否有该角色，如果有则不添加    添加一个过滤  默认为1
    connection.query(`select rid from user_roler where uid=? and rid=? and status=1`, [uid, rid], function(err, rows, fields) {
        if (err) throw err;
        // console.log(rows)
        if (rows.length) {
            res.json({
                code: -1,
                msg: "已有该角色"
            })
        } else {
            connection.query(`insert into user_roler (uid, rid) values(?,?)`, [uid, rid], function(err, rows, fields) {
                if (err) throw err;
                // console.log("addRoler..........", rows)
                if (rows.insertId) {
                    res.json({
                        code: 0,
                        msg: "添加成功"
                    })
                } else {
                    res.json({
                        code: 1,
                        msg: "添加失败"
                    })
                }

            })
        }
    })

})

//删除角色
app.get('/removeRouler', (req, res) => {
    let uid = req.query.uid,
        rid = req.query.rid;
    // console.log("remobeId", req.query)
    connection.query(`delete from user_roler where uid=? and rid=?`, [uid, rid], function(err, rows, fields) {
        if (err) throw err;
        //删除的角色
        // console.log("remove.........", rows);
        if (rows.affectedRows) {
            res.json({
                code: 0,
                msg: '删除角色成功'
            })
        } else {
            res.json({
                code: -1,
                msg: '删除角色失败'
            })
        }
    });
})

//点名
app.get("/userName", (req, res) => {
    connection.query("select username from user", function(err, rows, fields) {
        if (err) throw err;
        if (rows.length) {
            res.json({
                code: 0,
                msg: rows
            })
        } else {
            res.json({
                code: -1,
                msg: "获取数据失败"
            })
        }
    })
})

//生成成绩单数据
app.get('/reportList', (req, res) => {
    connection.query(`select username from user`, function(err, rows, fields) {
        if (err) throw err;
        // 拿到所有用户的id rows
        //生成（天数？）的成绩
        // let report = []; //总成绩单
        let dayStr = ``;
        for (let i = 21; i <= 31; i++) {
            // let dayScore = []; //存储每天的成绩数据
            for (let y = 1; y < rows.length; y++) { // 给每个用户生成一个成绩
                // dayScore.push({
                //     id: rows[y],
                //     score: Math.floor(Math.random() * 20) + 80
                // })
                dayStr += `('${rows[y].username}', ${Math.floor((Math.random()*20))+80}, '2018-07-${i}'),`
            }
            // report.push({
            //     date: `2018-07-${i}`,
            //     list: dayScore
            // })
        }
        connection.query(`insert into report (username, score, date) values ${dayStr.slice(0, dayStr.length-1)}`, (err, rows, fields) => {
            if (err) throw err;
            console.log("添加", rows);
        })
    })
})

//请求成绩单
app.get("/seeList", (req, res) => {
    connection.query(`select id,username,score,date from report`, function(err, rows, fields) {
        if (err) throw err;
        // console.log("seeList.....", rows)
        if (rows.length) {
            res.json({
                code: 0,
                msg: rows
            })
        } else {
            res.json({
                code: -1,
                msg: "获取数据失败"
            })
        }
    })
})

//请求学生个人成绩
app.get("/seeUser", (req, res) => {
    connection.query(`select * from report where username='${req.query.user}'`, function(err, rows, fields) {
        // console.log("seeUser......", rows)
        if (rows.length) {
            res.json({
                code: 0,
                msg: rows
            })
        } else {
            res.json({
                code: -1,
                msg: "您查找的用户不存在"
            })
        }
    })
})

//请求学生个人成绩
app.get("/sign", (req, res) => {
    connection.query(`select username from user where username='${req.query.user}'`, function(err, rows, fields) {
        // console.log("seeUser......", rows)
        if (rows.length) {
            res.json({
                code: 0,
                msg: rows
            })
        }
    })
})

//获取权限
app.get('/access', (req, res) => {
    console.log(req.query.user)
        //说明：uid=用户   rid=职位  aid=权限
        //user=用户列表   user_loler=职位列表  roler_access=权限列表  access=权限名称列表
    connection.query(`select id from user where username='${req.query.user}'`, function(err, rows, fields) {
        if (err) throw err;
        connection.query(` select access.accessname from user,user_roler,roler_access,access where user.id=user_roler.uid 
        and user_roler.rid = roler_access.rid and roler_access.aid = access.id and uid=${rows[0].id} and user_roler.status=1 group by access.id`, function(err, rows, fields) {
            if (err) throw err;
            //匹配成功  返回对应权限
            console.log(rows)
            res.json({
                code: 0,
                msg: rows
            })
        })
    })
})

app.listen(9000);


console.log("启动服务。。。。。。。。。");