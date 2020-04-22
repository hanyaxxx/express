// 1.遍历所有的path属性截取路径
// 设置所有请求路径参数
let parameters = {};

global.checkRequstAddress = function checkRequstAddress(handler) {
  //检查侦查对象是数组还是对象

  for (let k in handler) {
    let el = handler[k];
    //  如果是一个对象他可能有path也有可能没有path 如果是一个对象就检查他有没有path属性,如果没有那么遍历对象中每一个元素 如果是一个数组他就没有path如果是数组就让他遍历 集合中每一个元素
    // 如果有path属性 那么 el=handler
    let elpath = el['path'];
    let elvalue = el['value'];

    if (!elpath) elpath = handler['path'];
    if (!elvalue) elvalue = el;
    // 每一个el是对象每个对象里面有path,name,num value属性
    if (elpath) {
      let path = elpath.split('.');
      // 设置最后一个属性名就是接口地址
      path = path[path.length - 1];
      initPostResolver[path] || (initPostResolver[path] = []);
      if (!initPostResolver[path][handler['name']])
        initPostResolver[path].push(el['name']),
          (initPostResolver[path][el['name']] = el['name']);

      parameters[path] || (parameters[path] = path);
    }
    if (typeof elvalue === 'object') {
      checkRequstAddress(elvalue);
    }
  }
};
checkRequstAddress(initMockParams);
// -----------------------------------------------------------------------------------------------------------------------
// get请求注册与实现
//获取数据的API接口
// 功能作用 可以查找到  .userinfo 下面的所有子类  userinfo?user=id 可以查找到之类user下 对应 id 的数据
function getDataApi(req) {
  let query = req.query;
  let path = parsPath(req.path);
  let queryData;
  // 如果query为空返回整个表 user=query 如果userinfo请求路径后面没有接user/password/等就把data[web]返回给用户
  if (JSON.stringify(query) == '{}') {
    queryData = data[head];
  } else {
    // 1.在data里查找属性为title,序列号为3的数值
    queryData = [];
    for (let val in query) {
      // query[val] 就是属性名对应的序列号
      let id = query[val];
      // 如果query没有请求序列号比如 user = ? 就把user返回
      //  期望的值是 query[val]user=n时 将 data[head][userinfo][user]添加到querydata
      (!id && queryData.push(data[head][path][val])) || //  期望的值是 query[val]user=n时 将 data[head][userinfo][user][id]添加到querydata
        queryData.push(data[head][path][val][id - 1]) ||
        console.log('该数据参数无效,检测请求参数是否正确');
    }
  }

  return queryData;
}

//效果等同于delete
function deleteDataApi(req, param) {
  let query = req.query;
  let path = param;
  path = path.replace('/', '');
  // 如果query为空返回整个表 user=query 如果userinfo请求路径后面没有接user/password/等就把data[web]返回给用户
  if (JSON.stringify(query) == '{}') {
    return console.log('请填入要删除的参数');
  } else {
    for (let val in query) {
      // query[val] 就是属性名对应的序列号
      let id = query[val];
      // 如果query没有请求序列号比如 user = ? 就把user返回
      //  期望的值是 query[val]user=n时 将 data[head][userinfo][user]添加到querydata
      (!id && (data[head][path][val] = [])) || //  期望的值是 query[val]user=n时 将 data[head][userinfo][user][id]添加到querydata
        data[head][path][val].splice(Number(id) - 1, 1) ||
        console.log('该数据参数无效,检测请求参数是否正确');
    }
  }

  writeFile();
}

// 为get和delete注册事件
Object.keys(parameters).forEach(param => {
  //查询数据实现
  app.get('/' + param, async (req, res) => {
    let queryData;
    queryData = getDataApi(req);
    delaySend(res, queryData);
  });

  app.del('/' + param, async (req, res) => {
    deleteDataApi(req, param);
    res.status(201);
    res.end();
  });
});

// ---------------------------------------------------------------------------------------------------------------------

// post可以添加数据
// post请求注册与实现

function postDataApi(req) {
  let query = req.query;
  let path = parsPath(req.path); //user
  let ori = postAPI[path]; //userinfo
  // 1.检查传入的参数是否在data中有值,如果有修改data然后写入文件,如果data中没有就生成数据
  // query-> key=属性名
  // query[key]=属性值
  // 查找规则, userinfo/?user=3 找到userinfo下属性名为user 序号为3的用户名.
  // data[head][userinfo][key][id][key]=我要找的值
  // name&age&adress

  let temp = {};
  for (let key in query) {
    value = query[key];
    //   data-web-userinfo-user    =3   name
    temp[key] = value;
  }

  if (JSON.stringify(temp) == '{}')
    return console.log('post提交数据无效无法正常写入');
  // 将数据插入到data中
  data[head][ori][path].push(temp);

  // 将新添加的数据写入到本地文件中
  writeFile();

  return temp;
}

// post注册
Object.keys(initPostResolver).forEach(item => {
  initPostResolver[item].forEach(key => {
    postAPI[key] = item;
    postAPI.length++;
    // 提交数据 post 只做添加操作
    // post只能一个个自己添加了
    //  为post注册 提交路径名

    app.post('/' + key, async (req, res) => {
      let queryData;

      // 没有post参数就跳出
      if (JSON.stringify(req.query) == '{}') return;
      queryData = postDataApi(req);
      delaySend(res, queryData);
    });

    app.put('/' + key, async (req, res) => {
      let queryData;
      // 没有post参数就跳出
      if (JSON.stringify(req.query) == '{}') return;
      queryData = putDataApi(req);
      delaySend(res, queryData);
    });
  });
});

//put 请求--------------------------------------------------------------------------
function putDataApi(req) {
  let query = req.query;
  let path = parsPath(req.path); //user
  let ori = postAPI[path]; //userinfo
  // 1.检查传入的参数是否在data中有值,如果有修改data然后写入文件,如果data中没有就生成数据
  // query-> key=属性名
  // query[key]=属性值
  // 查找规则, userinfo/?user=3 找到userinfo下属性名为user 序号为3的用户名.
  // data[head][userinfo][key][id][key]=我要找的值

  let temp = {};
  for (let key in query) {
    value = query[key];

    temp[key] = value;
  }

  if (JSON.stringify(temp) == '{}')
    return console.log('put提交数据无效无法正常写入请检测参数');

  // 如果有id参数根据id设置属性,否则报错
  if (!temp.hasOwnProperty('id'))
    return console.log('没有设置id参数无法修改数据');

  //   data-web-userinfo-user-31-obj
  data[head][ori][path][temp['id']] = temp;

  // 将新添加的数据写入到本地文件中
  writeFile();

  return temp;
}

module.exports = {};
