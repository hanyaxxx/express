// 开启一个端口
// global.bodyParser = require("body-parser");
// global.querystring = require('querystring')
// var multipart = require('connect-multiparty'); 

// global.multipartMiddleware = multipart(); 

let success = false
function start (port) {
  app.listen(port, () => {
    success = true
    clearInterval(timer)
    InitReadFile()
   
    axios.defaults.baseURL = 'http://localhost:' + port
    //axios.defaults.headers['Content-Type'] ='application/x-www-form-urlencoded'
    axios.defaults.transformRequest=[function (data) {
      let ret = ''
      for (let it in data) {
        ret += it + '=' + data[it] + '&'
      }
      return ret
    }],
   
    console.log('服务器创建成功' + port);
  });
}

const timer = setInterval(() => {
  if (!success) start(port++)
}, 500)


//配置根目录和静态目录
global.dir = __dirname;




// 载入数据生成函数 可传函数或数组
global.mock = require(global.mockInit);


const compareMock=(()=>{

  function compare (data, mockData) {
    Object.keys(mockData).forEach(attr => {
      if (typeof mockData[attr] === 'object') {
  
       compare(data[attr], mockData[attr])
        let emp = true
        for (let key in mockData[attr] ){
          emp=false
        }
        if (emp)
     {
          delete mockData[attr]
     }else{
         // console.log(mockData[attr])
     }
       

      }else{
          try {
            if (mockData[attr] ==  data[attr].toString()) {

              delete mockData[attr]

            } else if (typeof mockData[attr]==='object') {
              compare(data[attr], mockData[attr])
            }
          } catch (error) {
           // console.log(mockData[attr].toString())
          }
       
      }

    })
   // return true
  }

  const newValue = JSON.stringify(deepClone(initMockData))
  fs.writeFile(__dirname + '/db/mockTemp.json', newValue, (err, data) => {
   // console.log(newValue)
  });

  if (mocktemplate === newValue){
     initMockData={}
  }else{
    if (mocktemplate==='{}') return
    mocktemplate = JSON.parse(mocktemplate)
   ifcompare(mocktemplate, initMockData)

  }


})()
//传入mock数据然后生成,
const mockData = mock.mock(initMockData)




function initFile () {
  const data = {}
  fs.writeFile(dbJson, JSON.stringify(data), err => {
    console.log('初始化数据库成功');
  });
}


global.writeData = function () {
  fs.writeFile(dbJson, JSON.stringify(data), err => {
    createAPI(data)
  });
}

global.addData = function (mockData) {
  global.data = compare(data, mockData)
  data.accountData || (data.accountData={})
  writeData()
  
}

//1. 读取data.json 
const createAPI = require('./js/createAPI.js')
function InitReadFile () {
  fs.readFile(dbJson, 'utf-8', function (err, datas) {
    if (err) {
      initFile();
      console.log('未读到有效文件,正在初始化有效文件');
    }

    // 读取到默认dbjson后吧他赋值在data里面如果
    try {
      global.data = JSON.parse(datas.trim());
    } catch (e) {
      initFile();
    }

    // 将mock数据与data数据进行对比覆盖
    console.log('数据载入成功')
    addData(mockData)
    // typeof (data=JSON.parse(datas.trim()))==='object' || initMock()
  });
}




function compare (data, mockData) {
  
  data = Object.assign(data, mockData)

  Object.keys(mockData).forEach(attr => {
    if (typeof mockData[attr] === 'object') {

      compare(data[attr], mockData[attr])
    }
  })
  return data
}






// global.buildMockFor=buildMockFor


// //载入组件
// const autoGenerateRequest=require(__dirname + '/js/autoGenerateRequest.js')
 const loginVerity=require(__dirname + '/js/loginVerity.js')





