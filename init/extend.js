const extend_path = $dirname + '/extend-plugin/'

_require=(path)=>{
  require(extend_path + path)
}

_require('loginVerity.js')  // 登录注册模块
//_require('openbrown.js') // 打开浏览器模块
_require('fileload.js')   // 文件下载模块
