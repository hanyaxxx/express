
var http = require('http');//创建服务器的

var open = require('open');

    // 使用指定浏览器打开
var myServer = http.createServer(function (req, res) {
  //req->请求变量：客户端请求服务器的
  //res->响应变量:服务器要给客户端写回的变量
  //前端页面应该给客户端显示，即写回去
  //这之前应该先把文件内容读出来

 
  res.end(`<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div style>
    <div><input model='a' type="text"> </div>
    <div><input model='b' type="text"> </div>
    <div><input model='c' type="text"> </div>
    <div><input model='a' type="text"> </div>
    <div><input model='b' type="text"> </div>
   <div id='test'>
     {haha}+{hehe}

       <div>
         {name}+{age}
       </div>   
   </div>
  </div>

</body>

<script>
  const obj={
    a:'',
    b:'',
    c:'',
  }
 const modelQueue = {} // 队列
 Object.keys(obj).forEach((key,index,array)=>modelQueue[key]=[]) //初始化
 // 响应式
  const handler={
    set(obj,prop,value){
      obj[prop]=value 
      modelQueue[prop].forEach(changeFn => changeFn(value ))
    }
  }
  
  const proxyObj=new Proxy(obj,handler)
  const inputAll = [...document.querySelectorAll('input[model]')]
  const inputModel=(item, index, array, getModelKey = item.getAttribute('model'),Own= obj.hasOwnProperty(getModelKey))=>
  Own? (modelQueue[getModelKey].push((newVal) => item.value = newVal), item.oninput = e => proxyObj[getModelKey] = e.target.value):null
  inputAll.forEach(inputModel)
  window.onbeforeunload = function (e) {
    console.log(e)
    window.open()
     return  window.open('https://bbs.csdn.net/topics/390407024/');

  }
class jass{
  constructor(option){
    this.father=option.el 
  
    this.data=this.initData(option.data)

    this.init() 
  }
  init(){
    const that=this
    Object.keys(this.data).forEach(key=>{
       
      that[key]=that.data[key]

    })
    
    //递归找组件 ,找到{} 然后没了
  this.proxy = new Proxy(this.data, {
      get() {

      },
      set() {

      }
    })
  }
initData(val){
  return val 
}


}

new jass({
  el:'#test',
  data:{
    haha: 'haha',
    hehe: 'hehe',
    name: 'zhou',
    age:  '20'
  }

})
</script>

</html>`)

  //结束写的操作
  //res.end();

})

var port='5050'
myServer.listen(port, function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("服务器已开启。端口号为:" + port);
  // 使用默认浏览器打开
  open('http://localhost:' + port);

})
