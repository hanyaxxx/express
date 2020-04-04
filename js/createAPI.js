//3.遍历data.son  
//遍历data.json中的数据生成接口
function createAPI (data) {
  const API = []

  Object.keys(data).forEach(api => {
    const url = '/' + api
    data[url] = data[api]
    post(url)
    get(url)
    API.push(url)
  })



  console.log('接口名:', API)
}


function getMark (value) {
  let mark = value.indexOf('=')

  if (mark === -1) mark = value.length
  return mark
}

function getPostResult (value, mark) {
  let postResult = value.slice(mark + 1)

  !+postResult || (postResult = +postResult)

  return postResult
}
function getSplitValue (preQuery) {
  let queryKey = preQuery.split('/')

  if (queryKey[0] === '') queryKey.splice(0, 1)

  return queryKey
}


class either {
  constructor(right) {
    // this.left=left 
    this.right = right

  }
  then (f) {
    if (this.right) {
      f()
      this.else = () => null
    }

    return this
  }
  else (f) {
    return f()
  }

}
either.of = function (right) {
  return new either(right)
}

function queryGetData (query, data) {
  let result
  //1.查找data中的属性名, 与id值
  try {

    Object.keys(query).forEach(attr => {
      const value = query[attr]

      either.of(value === '').then(() => {
        result = data[attr]
      }).else(() => {

        //get
        const preQuery = value
        //get
        const queryKey = getSplitValue(preQuery)

        result = data[attr]

        queryKey.forEach(key => {
          result = result[key]
        })


      })

    })
  } catch (error) {
    console.log(error)
    result = false


  }


  return result

}

function queryPostData (query, data) {
  let result
  //1.查找data中的属性名, 与id值
  try {

    Object.keys(query).forEach(attr => {
      const value = query[attr]

      either.of(value === '')
        .then(() => {
          result = data[attr]
        })
        .else(() => {
          const mark = getMark(value)
          const postResult = getPostResult(value, mark)
          //get
          const preQuery = value.slice(0, mark)
          //get
          const queryKey = getSplitValue(preQuery)

          result = data[attr]

          const lastKey = queryKey.splice(queryKey.length - 1, 1)

          queryKey.forEach(key => {
            result = result[key]
          })

          either.of(postResult)
            .then(() => {
              result[lastKey] = postResult
              writeFile()
              result = { sumbit: true, message: '提交成功' }

            })
            .else(() => {
              result = result[lastKey]
            })
        })

    })
  } catch (error) {
    console.log(error)
    result = false


  }


  return result

}

function send (res, result, code) {
  res.status(code)
  res.send({ result })
}

function post (api) {

  app.post(api, (req, res) => {
    //1.第一步查询注册名有没有存在
    const query = req.query
    const apiData = data[api]
    const result = queryPostData(query, apiData)
    const tips = send.bind(null, res, result)

    either.of(result)
      .then(() => {
        tips(200)
      }).else(() => {
        tips(400)
      })


  })
}

function get (api) {
  app.get(api, (req, res) => {
    //1.第一步查询注册名有没有存在
    const query = req.query
    const apiData = data[api]
    const result = queryGetData(query, apiData)
    const tips = send.bind(null, res, result)

    either.of(result)
      .then(() => {
        tips(200)
      }).else(() => {
        tips(400)
      })



  })
}

module.exports = createAPI