const fs = require ('fs');
const child_process = require ('child_process');
let i = 0;
const arrayDatas = [
  {name: '星家Fomily', id: '0801XN001'},
  {name: '老庙好运会员', id: '0101XN014'},
  {name: '好运会员联盟', id: '0101XN016'},
  {name: '亚一', id: '0102XN014'},
  {name: '童涵春堂', id: '0201XN001'},
  {name: '星美妆', id: '0202XN001'},
  {name: '上海活力城WOLICITY', id: '09001XN001'},
  {name: '上海真如星光耀广场', id: '09001XN002'},
  {name: '云尚武汉国际时尚中心', id: '1000XN001'},
  {name: '豫园商城服务号', id: '0501XN001'},
  {name: '豫园商城', id: '0501XN002'},
  {name: '大华1935', id: '0501XN003'},
  {name: '盛京龙城文化休闲广场', id: '0501XN004'},
  {name: '老城隍庙餐饮', id: '0301XN002'},
  {name: '南翔馒头店', id: '0301XN003'},
  {name: '松鹤楼', id: '0308XN001'},
  {name: '松鹤楼苏式汤面馆', id: '0308XN002'},
  {name: '城隍潮礼', id: '0401XN014'},
  {name: '合肥云谷金融城', id: '0601XN002'},
  {name: 'DJULA茱蕊', id: '0104XN001'},
  {name: '豫园文化创意制造所', id: '0500XN001'},
  {name: '豫园湖心亭', id: '0501XN009'},
  {name: '爱宠医生', id: '0203XN001'},
  {name: '东家掌柜', id: '07000XN001'},
  {name: '策源家', id: '11000XN001'},
];
// 首页 必须参数：{ path: 'pages/transfer/transfer', scene: 'type=2&from=2&&source=0201XN001' }
for (let i = 0; i < arrayDatas.length; i++) {
  const curl = `curl -u dongplus:SRo9pt72PqOI -XPOST -H 'Content-Type: application/json' -d '{"scene":"type=2&from=2&&source=${arrayDatas[i].id}","page":"pages/transfer/transfer"}' https://open.dongplus.cn/wxmp/qrcode/unlimited`;
  const child = child_process.exec (curl, function (err, stdout, stderr) {
    // console.log ('111', JSON.parse (stdout).res);
    const res = JSON.parse (stdout).res;
    fs.appendFile ('东家会员小程序注册来源参数小程序码.txt', `${arrayDatas[i].name}(${arrayDatas[i].id})：${res}\n`, 'utf8', err => {
      // fs.close('文件.txt', (err) => {
      //   if (err) throw err;
      // });
      if (err) throw err;
    });
  });
  child.on ('exit', function (code) {
    console.log ('PROPERLY EXITING');
    console.log ('Child process exited with code', code);
  });

  process.on ('exit', function (code) {
    console.log ('Killing child process');
    child.kill ();
    console.log ('Main process exited with code', code);
  });
}
