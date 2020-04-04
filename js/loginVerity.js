// app.get('/', (req, res) => {
global.login = 'login';

global.register = 'register';

global.getsessionsid = 'getsessionsid';
  //根据sessionID登录
  app.get('/'+login, (req, res) => {
    let connect_sid=req.cookies.connect_sid
        if(connect_sid) {
            console.log(req.cookies)
    
            res.send('欢迎再次光临')
    
        } else {
    
    //1.
    
            res.cookie('connect_sid', 1, {maxAge: 60 * 1000, httpOnly: true}) // 该处是设置 cookie 与 httpOnly 
            res.send('欢迎初次光临')
    
        }
    })
    
    // 0.0.1 将express模块中将入post验证
    
    function checkSessionSid(param){
      let username=param.username
      let passwords=param.passwords
      let userid=data.accountData[username]
      if(!userid) return false
    
      return {status:userid['username']==username && userid['passwords']==passwords,'userid':userid}
    }
    
    
    function loginCheckAccount(param,res){
    // 0.0.1.1 先检查密码是否正确
    // 0.0.1.1.0 如果不正确告诉前端密码不正确
    // 0.0.1.2 如果正确发给前端正确结果,保存登录态
    // 0.0.1.3 通过验证发送登录态给前端
    let bool=checkSessionSid(param)
    if(bool.status){
    //登录成功记录cookin 
    
    //if (req.cookie.
    //设置cookin
      　res.cookie('session_sid', JSON.stringify(bool.userid),
       { 
        expires: new Date(Date.now() + 90000000),
         httpOnly:true 
        });
    
         res.send({type:'suc',message:"登录成功",status:true})
    
         
    }else{
    
      res.status(401).send({ type: 'err', message: "用户名或者密码错误", status: false })
    
    }
    
    
    
    
    }
    

    //登录检查
app.post('/' + login,(req,res)=>{
  let data=''
  req.on('data',function(chunk){
    data+=chunk
  })
  req.on('end',function(){
    data=JSON.parse(data)

    loginCheckAccount(data, res)

  })
  
      
    })
    
    //注册的逻辑是什么?
    //1.如果用户名存在就返回false.如果没有就添加就可以了
    
    
    function queryAccount(params,res){
    //params有两个参数username password
    //用户数据库在accountData属性下是一个数组. 每个数组上每一个值都是一个对象.
    //注册
    let username=params.username
    let passwords=params.passwords
    //如果用户名存在返回提示信息,如果不存在设置发送设置成功
    if(data.accountData.hasOwnProperty(username)){
    
    
    res.send({type:'err',message:'用户名已经存在',only:false})
    
    
    }else{
    
      data.accountData[username]={
        'username':username,
        'passwords':passwords,
        'only':true,
      }
      //将数据写入数据库里
      
       writeFile()
    let mes={type:'suc',message:'注册成功',only:true}
    res.send( mes)
    
    }
    
    
    }
    

    
    //将json数据进行 escape解码然后转换成真实数据
    function json2Params(query){

      let ownKey=Object.keys(query)[0]

      let value=unescape(ownKey)
      value=JSON.parse(value)
      
      return value
    }
    
    //注册检查
    app.post('/'+register,(req,res)=>{
    //1.第一步查询注册名有没有存在
    //let query=json2Params(req.query)
      let data = ''
      req.on('data', function (chunk) {
        data += chunk
      })
      req.on('end', function () {
        data = JSON.parse(data)

     
        queryAccount(data, res)

      })
  
    


    })
    
    //session检查
    //像服务器发送一个检查sid的接口如果有返回true
    app.post('/'+getsessionsid,(req,res)=>{
    let session_id=req.cookies.session_sid
    
    
    if(session_id){
    // 如果有检查是否与数据库匹配
    session_id=JSON.parse(session_id)
    // session_id username password 属性
    if(checkSessionSid(session_id)){
      res.send(session_id)//,console.log(session_id);

    }else{
      res.send({'status':false})
    }
    
  
    
    }else{
      res.send({ "status": false })
    }
    
    
    })
    
    app.post('/'+'addStaff',(req,res)=>{
         
      res.send({mes:""})
      
      })