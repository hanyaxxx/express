方法 
## 根据 GET 查询
GET data
查询属性名为 data 的所有数据
<<<<<<< HEAD
GET data?name
=======
GET data?nam
>>>>>>> 14cf160... first commit
查询属性为 data,键名为 name 的所有数据
GET data?name='张三'
查询属性 data name=张三的一条数据
GET data?id=3
查询 data 下 id 为 3 的数据

GET 就是从数据库查询数据.

## 根据POST 提交
POST /data
在data里提交数据,会覆盖数据.

POST /data?name
在/data?name里提交数据,会覆盖数据.

POST /data?name='张三'
在/data?name='张三'里提交数据,会覆盖数据.



#懒人神器提高开发效率 
##接口生成器写入模式: 
###使用方式
!声明这是一个接口地址 ,
对象里面的 key&value 对应 URL 里的?name='xxx',(引用类型没有 value 值)
接口里面写!声明这是接口里面的子接口:
data/interest?book

###特性: 
1.所有数据会生成本地文件,可以增删改查 

2.所有接口地址默认 GET/POST 两种请求方式

GET: 
/data?name, 
/data,
/data?name='张三',

默认查找对应数据

POST 
/data?name,
 /data,
 /data?name='张三',
默认提交对应数据如果数据存在就会覆盖

3.数据支持 mock.js 格式,也支持固定格式

###示列:
mockAPI={
  !data:{
name:'@cname',
age:"@age",
address:"@address"
title:"@tiele"
!interest:{
book:[小说,编程,心理学],
}
}
} 
调用 GeneratorAPI(mockAPI) 生成

###后期修改

后期有新数据添加在调用: GeneratorAPI({}) 即可

###验证接口生成器:
使用方法是一样的
只使用 POST 接口会验证提交进来的数据,
如果存在就 return err 信息,成功 return success
适用于账号密码验证,状态查询,token 验证.

@偷懒糖
data=GeneratorAPI 数据
如果偷懒不想写新的接口使用-> GeneratorAPIVerify(data)
会自动将 GeneratorAPI 的接口生成验证模式,不过地址前面加@:/@data?name='张三'
请求会验证 data 里面有没有[名字]叫做[张三]的数据

### 常用函数

设置网络延时, 普通延时概率=100-(20+5)
setNetWorkTimeDelay= {
normal:{
value:100-500,    //设置一般延时的返回100-500ms
}
max:{
prob:5%
value:10000   //最大延时10s,概率5%
}
min:{
prob:20%
value:100   //最小延时100ms,概率20%
}
}  


setURLCode=true 设置是否将数据编码=> 默认 encode 方式,

global.port = 8080; 设置服务器端口号

cleanDB(),清空数据库

cleanDB(data/name),清空data下属性为name的数据,同时清除接口.
