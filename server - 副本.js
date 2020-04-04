const init = require(__dirname + '/init');

// 可配置

// 设置验证登录时的urlimport sort from '../实列/sort';

global.login = 'login';

global.register = 'register';

global.getsessionsid = 'getsessionsid';
// 设置端口号
global.port = 8080;

// 是否开启模拟网络延时
global.delayOn = true;

// 是否每次启动将initMock数据重置为新的数据库
global.dataAlwaysInit = true;


// 设置一个状态树  之哟啊 'userinfo' 与下面的值一一对应
global.postAPI = [];

// post 请求的接口对应的属性库
global.initPostResolver = {
  // userinfo: ['user', 'password', 'birthday', 'regdate'],
};

// --------------------------------------------------------------------------------------------------------------------
// 后更新阶段
//初始化工作完成后回调这个函数

global.addInitData = function() {
  //载入新数据
  buildMockForWrite({
    connect_sid: {
      username: '',
      password: '',
      status: false,
    },
    //用户账户库
    accountData: {},
    // 插入数据类型
    // {  username:
    //     password:
    // }
  });

  // let newdata = mock.mock({
  //   path: 'qiyeshezhi',
  //   name:'getqiyeshezhi'
  //   num:"1"
  //   value
  // });
  // checkRequstAddress(newdata);
  // console.log("后更新成功");
};

//载入其他组件
require(__dirname + '/component.js');
