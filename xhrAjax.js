
//1.功能 ajax 支持promise All race 

//2.四种类型自动转换, 

//3.可以设置接收类型 

//4.可以操作上传或下载文件
const xhrEventType = ["progress", "load", "error", "abort"]
const proxyPromiseMethod = ['then', 'catch', 'finally']
const getType=(data,refer)=>{
  const proto = Object.prototype.toString.call(data)
  const str=proto.replace(/\[object (\w+)?]/,(_,g)=>{
      return g
  }).toLowerCase()
  if(refer){
    refer = refer.toLowerCase()
    return refer === str
  }
 

 return str
}


const urlencoded = 'application/x-www-form-urlencoded'
const xhrRequestConfig = ({ xhr, originParams, resolver, reject }) => {
  const { method, url, data, header, fileUpload } = originParams
  let analyData
  let setFileHeader=()=>{}
  const setJson=()=> analyData = JSON.stringify(data)
  const checkMultipart=()=>{
    let type
    header['Content-Type'].replace(urlencoded, () => type = urlencoded)
    if (type === urlencoded){
      
    //判断data是不是object
    let str='' 
    for(let key in data){
      str = str + key+'='+data[key]+'&'
    }

      analyData = str
      //字符串拼接 
      return 
    }


    return {
       setJson
     }
  }
  const checkFile=()=>{
    
    if (xhr.$type === 'file') {
      const formData = new FormData()
      const fileType = getType(data)
      const add = fileUpload
     
      ?fileUpload
        : (append,file)=>{
           append('file', file);
      }

      if (fileType === 'filelist') {
        const realData = [...data]

        for (let file of realData) {
          //formData.append('file', file);
          add(formData.append.bind(formData), file)
        }
      } else {
        //formData.append('file', data);
        add(formData.append.bind(formData), data)
      }

      analyData = formData
      setFileHeader = () => {
        // 'Content-Type': "multipart/form-data"
        xhr.timeout=60*1000*3 //3分钟没响应就断掉
        xhr.setRequestHeader('Content-Type', "multipart/form-data") //防止出错
      }
      return
    }
   return {
     checkMultipart
   }
  }
   
  return {
    dataProcessing(){
      
      try {
        checkFile() //处理file
          .checkMultipart()//处理xxx-multype
          .setJson() //不满足的情况全部为json
      } catch (error) {
        null
      }

      
    
    return this
    },
    setTimeout () {
      xhr.timeout = originParams.timeout
      xhr.ontimeout = (e) => {
        reject({ event: e, err: '请求超时' })
      }
      return this
    },

    setResponseType () {
      xhr.responseType = originParams.responseType
      return this
    },

    setHeader () {
      for (let key in header) {
        xhr.setRequestHeader(key, header[key]) //header遍历
      }
     
      setFileHeader()
      return this
    },

    setStatechange () {
      
      const getResult=()=>{
        const { responseText, responseURL, status } = xhr
        let rt
       //如果是text就转换成对象,如果是blob发送原始数据
        rt=originParams.responseType === 'text' 
        ? JSON.parse(responseText)
          : responseText

        const result = {
          data: rt,
          responseURL,
          status
        }
        return result
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {

            resolver(getResult())

          } else if (xhr.status >= 400) {

            reject(getResult())
          }
        }

      }
      return this
    },
    open () {
      xhr.open(method, url)
      return this
    },
    send () {
      
      xhr.send(analyData)
      return this
    }
  }
}

const initRequestData = (parmas) => {
  const originParams = {
    method: 'GET',
    url: '/',
    data: {},
    timeout: 3000,
    responseType: 'text',
    type:'object',
    header: {
      'Content-Type': "application/json;charset=UTF-8"
    },
  }

  const xhr = new XMLHttpRequest()
  Object.assign(originParams, parmas)
  originParams.method = originParams.method.toLowerCase()
  xhr.$method = originParams.method
  xhr.$type = originParams.type
  return {
    originParams,
    xhr
  }
}

const xhrRegisterLoader = (xhr) => {
  let extendPromise = {}
  xhrEventType.forEach(event => {
    //注册上传下载回调函数
    const callback = `${event}CallBack`
    extendPromise[event] = (fn) => {
      extendPromise[callback] = fn
      return extendPromise
    }
    // 注册上传事件
    if(xhr.$method==='post'){
      xhr.upload.addEventListener(event, (e) => {
        extendPromise[callback](e)
      });
    } else {
    //注册下载事件 
    xhr.addEventListener(event, (e) => {
      extendPromise[callback](e)
    });
    }
  
  


  })
  // 对promise进行代理
  return (newPromise) => {

    extendPromise.status = newPromise
    proxyPromiseMethod.forEach(method => {
    
      extendPromise[method] = (fn) => {
        extendPromise.status = extendPromise.status[method](res => fn(res))
        return extendPromise
      }
    })
   
    return extendPromise
  }
  //代理promise 

}
const xhrRequest = function (parmas = {}) {
  //1. 设置默认值, params所有的值会覆盖在orginParams上,如果没有的保持originParams
  const { originParams, xhr } = initRequestData(parmas)
  
  //2. 判断xhr是否可扩展
  const isExtendPromise = originParams.type === 'file' ? xhrRegisterLoader(xhr) : (newPromise) => newPromise

  //3.promise封装
  const newPromise = new Promise((resolver, reject) => {
    const request = xhrRequestConfig({ xhr, originParams, resolver, reject })
    request
      .dataProcessing() //对参数做一层处理
      .setTimeout() // 4.1 设置请求超时处理必须在open前
      .setResponseType() // 4.2 设置请求超时处理必须在open前
      .open()  // 4.3 打开open
      .setHeader() // 4.4 设置请求头
      .setStatechange() // 4.5 监听state改变
      .send() // 4.6  发送数据
    //下载扩展
    // cont-type类型判断
    //send 数据类型判断

  })


  // end 扩展执行
  return isExtendPromise(newPromise)
}



const ajax = (parmas) => {
  
  return xhrRequest (parmas)
   
  
}


ajax.post = (p) => {
  p.method = 'POST'
  return ajax(p)
}

ajax.get = (p) => ajax(p)
ajax.all = (arg) => Promise.all(arg)
ajax.race = (arg) => Promise.race(arg)


export default ajax




