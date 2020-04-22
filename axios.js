const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

var hen=promise3.then
hen.call(promise3,()=>{
  console.log('哈哈')
})

const ajax=function(){}

// extend.then((res)=>{
//   console.log(res)
// }).abort()
ajax.all=(...promise)=>{
  return Promise.all(promise)
}

ajax.abort=()=>{
console.log('abort')
}

const get = {
  get (obj, prop,value,xx) {

    debugger
    if (!obj[prop]) return ajax[prop]

    return obj[prop].bind(obj) // "foobar"
  }
  
}

const proxy = new Proxy(promise3,
  get)

proxy
.then(res=>{console.log(res)})
.then(res=>{console.log(res)})
.abort()
.then(res=>{console.log(res)})