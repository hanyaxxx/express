// -------------------------------------------------------------------------------------------------------------------------------
// 公共函数
// 去从start开始 到end数的随机整数
global.getRandom=function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

global.getDelayTime=function getDelayTime() {
  let timeout;
  // 随机值最小可以为 100ms  100ms-500ms 一个区间 60%   20% 500ms-1000ms 一个区间  10% 1000ms-2000ms一个区间   5% 最大可以为  3000-5000ms 一个区间 5%无延迟

  let seed = getRandom(1, 100);

  (seed <= 60 && (timeout = getRandom(100, 500))) ||
    (seed > 60 && seed <= 80 && (timeout = getRandom(500, 1000))) ||
    (seed > 80 && seed <= 90 && (timeout = getRandom(1000, 2000))) ||
    (seed > 90 && seed <= 95 && (timeout = getRandom(3000, 5000))) ||
    (timeout = getRandom(0, 0));

  return timeout;
}

// 延迟计时器设置成功
global.delaySend=function delaySend(res, queryData) {
  // 如果模拟延时不予许开启就跳过
  if (!delayOn) return res.send(queryData);

  // 获取一个延时的时间
  let timeout = getDelayTime();

  setTimeout(() => {
    // res.status()
    res.status(200);
    res.send(queryData);
  }, timeout);
}

global.parsPath=function parsPath(path) {
  path = path.split('/');

  if (path.length === 2) {
    path = path[1];
  }

  return path;
}
//

//将新数据写入data
global.buildMockForWrite=function buildMockForWrite(mock){
  data=buildMockFor(data, mock,true)
  writeFile()
}

global.writerTimer=null
// writerTimer = null;
// fs.writeFile(dbJson, JSON.stringify('123456'), err => {});
global.writeFile=function (delay=1000) {

  if (writerTimer) clearTimeout(writerTimer);
   let file=data||{'err':'err'}
   writerTimer=setTimeout(() => {
    fs.writeFile(dbJson, JSON.stringify(file), err => {});
  }, delay);


}
