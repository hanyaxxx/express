//*监听文件变化
fs.watchFile(filename[, options], listener)

fs.watchFile(json,{
  persistent:true,
  interval:5007 
},(current,prev)=>{
  


})
// 不同的操作系统回调函数可能会执行一次或者多次 利用md5+防抖来做
// watch参数 文件路径,options可选,回调函数
fs.watch(json,{
  persistent:true , 
  recursive: fasle , //监听子目录吗 
  encoding:'change', //回调函数事件名称 默认change
},
(eventType,filename)=>{
  //文件变化 
  //用websockt在浏览器发送一个消息,然后刷新页面
}
)


//*node打开浏览器 
//使用open模块 

//*node创建服务器目录


//*node websocket实现
"use strict"

