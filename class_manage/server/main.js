var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'xwz666'
});

//设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "content-type");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//         // res.header("Content-Type", "application/json;charset=utf-8");

//     next();
// });


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
});

app.get("/list", (req, res) => {
    connection.connect();
    //查询
    connection.query('SELECT *,id,username,password from user', function(err, rows, fields) {
        if (err) throw err;
        console.log('select: ', rows);
    });
    //插入  增加
    connection.query('insert into user(username,password,phone,birthday) values("xiaowangzi",123456,13378789089,3131231)',
            function(err, rows, fields) {
                console.log("insert  :", rows)
            })
        //删除
    connection.query('delete from user where id>13', (err, rows, fields) => {
        console.log("delete :", rows)
    })

    //更改
    connection.query('update user set username="xiaowangzi" where id=13', (err, rows, fields) => {
        console.log("updata  :", rows)
    })
    res.end("111");
});

app.listen(9000);

console.log("启动服务。。。。。。。。。");