// 载入mock
const mock = require('mockjs');

global.mock = mock;
let data;
// data=mockMark(data,{
// path:'name.1970.hunan',
// name:'姓名',
// num:'30',
// value:'@cname',
// id:1
// })

//  @mockMark(data,{})
//   path:'name.1970.hunan',  插值路径
//   name:'姓名',   插值的属性名
//   num:'30-40',  需要插入的数量
//   value:'@cname',  插入的数据
//   id:1         插入值是否需要绑定ID键名=>自增
//   })
const DEFAULT = {
  path: 'default',
  name: '整数',
  num: '30',
  value: '@integer(100000, 9712568125)',
  id: false,
};
// mockMark({})
function mockMark(holder = {}, param = DEFAULT) {
  let path = param.path;
  let name = param.name;
  let num = param.num;
  let value = param.value;
  let id = param.id || false;
  let rootPather =
    holder ||
    console.log('生成mock数据时必须传递正确的参数第一个参数data必须有值');

  // 将长路径解析为index.1.2 解析为数组
  let parser = path.split('.');

  //  获取最后一个属性的键位
  let lastPathKey = parser[parser.length - 1];

  let temp = rootPather;
  // 遍历所有路径除了最后一个

  for (let i = 0; i < parser.length - 1; i++) {
    //key=>属性名
    let key = parser[i];
    temp[key] || (temp[key] = {});
    temp = temp[key];
  }

  // 如果属性名下读不到值就创建一个空对象防止错误

  temp[lastPathKey] || (temp[lastPathKey] = {});

  // 创建mock默认空间
  obj = {};
  nameJoint = name + '|' + num;
  // 设置 mock 头部规则  title|30-40
  obj[nameJoint] = [];

  // 设置 title|30-40 :[ { } ]
  obj[nameJoint][0] = {};

  // 设置  // 设置 title|30-40 :[ { name: @name } ]
  obj[nameJoint][0][name] = value;
  // 如果需要 id增加 // 设置 title|30-40 :[ { name: @name  'id|'+1} ]
  if (id) obj[nameJoint][0]['id|+1'] = 1;

  let mainObj = mock.mock(obj);

  mainObj = mainObj[name];
  // 让temp 指向最后的一个生成的obj内存地址
  temp[lastPathKey][name] = mainObj;

  // 将最终结果返回, 因为 对象是应用类型,所以rootPather等价于temp 等价于 handlerMock
  return rootPather;
}

head = {
  'title|10-20': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1

      'id|+1': 1,
      content: '@ctitle',
    },
  ],
  img: [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
    },
  ],
  content: [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
    },
  ],
};

function mockSimpleData(data, param) {
  for (let key in param) {
    if (!data.hasOwnProperty(key)) {
      data[key] = param[key];
    }
  }

  return data;
}

// 对Mock数据进行循环操作,需要传入一个参数组
function buildMockFor(data = {}, params, simple = false) {
  if (!simple) {
    if (Array.isArray(params)) {
      params.forEach(param => {
        data = mockMark(data, param);
      });
      return data;
    }

    return mockMark(data, params);
  }

  if (Array.isArray(params)) {
    params.forEach(param => {
      data = mockSimpleData(data, param);
    });
    return data;
  }

  return mockSimpleData(data, params);
}




module.exports = {buildMockFor,mock:mock.mock};
