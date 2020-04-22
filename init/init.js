// 初始化
//载入express框架
const express = require('express');
//载入fs文件读写
const fs = require('fs')
global.express = express
global.fs=fs
//载入cookie
const cookieParser = require('cookie-parser');
const app = express();
global.app=app
// 使用 cookieParser 中间件;
app.use(cookieParser());

//载入公共函数
require('../extend-plugin/public')


// 初始化声明数据库变量
global.data={};


//开启跨域 开启保存cookie
app.all('*',function(req, res, next) {
  //需要显式设置来源,不能写*
 

  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials",true);
//带cookies
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(express.static('js'))