const init = require(__dirname + '/init');
const mock = require('mockjs');
global.axios = require('axios');

// 设置端口号
global.port = 8085;

// 是否开启模拟网络延时
global.delayOn = true;

// 是否每次启动将initMock数据重置为新的数据库
global.dataAlwaysInit = true;

// 数据库文件地址
global.dbJson = __dirname + '/db/data.json';

// initMock文件路径,设置初始化Mock数据地址
global.mockInit = __dirname + '/db/mockInit.js';


let id=0 
const randomImg=function(widthMax=600,heightMax=1200) {

  const height = mock.mock(`@integer(400, 1200)`);
  const width = mock.mock(`@integer(400, 600)`);
  const color = mock.mock('@color');
  const val = mock.Random.image(
    width + 'x' + height,
    color,
  );
 
  return val;
}
const ID_GENERATE=_=> id++
global.initMockData = {
  shopmall: {
    'object|2-4': {
      '110000': '北京市',
      '120000': '天津市',
      '130000': '河北省',
      '140000': '山西省',
    },
    'array|2-6': [
      {
        'number|1-100': 100,
        img: mock.Random.image('200x100', '#4A7BF7', 'Hello'),
      },
    ],
    'number|1-100': 100,
    'string|1-10': '★',
    nav: {
      title: '欢迎来到shopmall商城',
      navBackground:
        'http://show.niuteam.cn/template/shop/default/public/images/style_red_head_adv.png',
    },
    login: {
      background:
        'http://show.niuteam.cn/template/shop/default/public/images/red_login_banner.png',
      statement: [
        { title: '网站首页' },
        { title: '常见问题' },
        { title: '购物流程' },
        { title: '退款说明' },
        { title: '法律申明' },
        { title: '退款流程' },
        { title: '商家入驻' },
        { title: '退款政策' },
      ],
    },
    register: {
      background: 'http://show.niuteam.cn/upload/common/1571642845.png',
    },
    'seckill|5': [
      {
        name() {
          var a = mock.mock('@color');

          return a;
        },
        background() {
          //console.log(this.name)

          var color = mock.Random.image('300x300', this.name, 'Hello');
          return color;
        },
        title: '@cparagraph(1, 3)',
        price: '@float(60, 1000, 2, 2)',
        oldprice: '@float(1000, 2000, 2, 2)',
        date:
          '2020-' +
          '@datetime(MM)' +
          '-' +
          '@datetime(dd)' +
          ' ' +
          '@datetime(hh)' +
          ':23:14',
        url: '/goods/goodsinfo',
        'id|+1': 0,
        goodsinfo: {
          id: _ => ID_GENERATE(),
          portrait: 'http://show.niuteam.cn/upload/common/1567657510.jpg',
          address: '@county',
          prebackground:  ()=> {
            const height = mock.mock('@integer(600, 600)');
            const width = mock.mock('@integer(600, 600)');
            const color = mock.mock('@color');
            const val = mock.Random.image(
              width + 'x' + height,
              color,
              'Hello',
            );
            return val;
          },
          prebackgroundbig: function () { return this.prebackground},
          'preminibackground|6-8': [
            function() {
              const height = mock.mock('@integer(500, 500)');
              const width = mock.mock('@integer(500, 500)');
              const color = mock.mock('@color');
              const val = mock.Random.image(
                width + 'x' + height,
                color,
                'Hello',
              );
              //console.log(val);

              return val;
            },
          ],
          type: () => mock.Random.cword(3, 5),
          title: () => mock.Random.cparagraph(),
           
          //brief 商品描述
          brief: () => mock.Random.cparagraph(),

          promotiontype: '@natural(0, 2)', //促销类型, 0.优惠大派送,1.限时大派送,2.满减
          promotiondate:
            '2020-' +
            '@datetime(MM)' +
            '-' +
            '@datetime(dd)' +
            ' ' +
            '@datetime(hh)' +
            ':23:14',
          marketprice: '@natural(2000, 5000)', //市场价格
          salesprice: '@float(500, 2000,2,2)', //销售价格
          servetype: '@natural(0, 2)', //0 服务类型 ,官方旗舰店,0.限时促销,1.卖家折扣,2.自己自足
          evaluate: '@natural(0, 10000)', //评价
          salesvol: '@natural(3000, 10000)', //累积销量
          repertory: '@natural(3000, 10000)', //库存
          'details|5-10': [
            function() {
              const height = mock.mock('@integer(200, 600)');
              const width = mock.mock('@integer(400, 1200)');
              const color = mock.mock('@color');
              const val = mock.Random.image(
                width + 'x' + height,
                color,
                'Hello',
              );
              //console.log(val);

              return val;
            },
          ],
          goodsproperty: {
            arg: 'D5300',
            brand: '很出名',
          },
        },
      },
    ],
  },
  browhistory: [], //浏览历史 存seckill
  qqspace:{
    
    main:{
      user:{
        avatar: randomImg,
       name:'@cname'
      },
      album:{
        num:'@integer(0, 600)',
        url:'',
        'albumList|0-600':[
          randomImg
        ],

      },
      talk:{
        num: '@integer(0, 600)',
        url:'',
        'talkList|0-600':[
          {
            content: '@cparagraph',
            from:'荣耀V20',
            time: '2019-' +
              '@datetime(MM)' +
              '-' +
              '@datetime(dd)' +
              ' ' +
              '@datetime(hh)' +
              ':23:14',
            sort:0,
            pageView: '@integer(0, 600)',
            'likes|0-100': [{
              name:'@cname',
              url:'',
              mutualFriend: '@integer(0, 20)',
              avatar: randomImg,
            }],
           'comment|0-20':[
             {
               name: '@cname',
               url: '',
               mutualFriend: '@integer(0, 20)',
               avatar: randomImg,
               content: '@cparagraph',
               time: '2019-' +
                 '@datetime(MM)' +
                 '-' +
                 '@datetime(dd)' +
                 ' ' +
                 '@datetime(hh)' +
                 ':23:14',
             }
           ]
          } 
        ]
      },
      log:{
        num: '@integer(0, 600)',
        url:'',
        'logList|0-600': [
          {
            title: '@ctitle',
            content: '@cparagraph',
          }
        ]
      },
      personalFile:{
        sign: '@ctitle',
        info:'28岁  魔羯座 男 现居长沙',
        bloodType:'o'
      },
      'recentGuest|10-50':[
        {
          avatar: randomImg,
          name:'@cname',
        }
      ]

    }
  }
}
// fs.writeFile(__dirname + '/db/mockTemp.json', JSON.stringify(initMockData) , (err, data) => {

//   });
global.deepClone = (obj, newObj={}) => {
  for (key in obj) {
    const type = typeof obj[key]
    if (type == 'object') {
      newObj[key] = (obj[key].constructor === Array) ? [] : {}
      deepClone(obj[key], newObj[key]);
    } else {
      

      newObj[key] = obj[key]
      if (type==='function'){
        newObj[key] = newObj[key].toString()
      }
    }
  }
  return newObj;
}
 global.mocktemplate='{}'
  fs.readFile(__dirname + '/db/mockTemp.json', 'utf-8', (err,data) => {
   // createAPI(data)
   if(data===''){
    //  global.mocktemplate = JSON.stringify(deepClone(initMockData))
    //  return fs.writeFile(__dirname + '/db/mockTemp.json', mocktemplate, (err, data) => {

    
    //  });
    return  require(__dirname + '/component.js');
   }
   global.mocktemplate=data
   require(__dirname + '/component.js');
  });


