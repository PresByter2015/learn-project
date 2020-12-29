const temp = [
  {id: 'mylike', title: '我的关注', value: ''},
  {id: 'allprodcuts', title: '全部产品', value: ''},
];
const index = temp.findIndex (item => item.id === 'allprodcuts');
// console.log (index);

let os = require ('os');
console.log (os);

function getIPAdress () {
  let interfaces = require ('os').networkInterfaces ();
  console.log (interfaces);

  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        console.log (alias.address);
      }
    }
  }
}

getIPAdress ();

function getLocalIP () {
  const os = require ('os');
  const osType = os.type (); //系统类型
  const netInfo = os.networkInterfaces (); //网络信息
  let ip = '';
  if (osType === 'Windows_NT') {
    for (let dev in netInfo) {
      //win7的网络信息中显示为本地连接，win10显示为以太网
      if (dev === '本地连接' || dev === '以太网') {
        for (let j = 0; j < netInfo[dev].length; j++) {
          if (netInfo[dev][j].family === 'IPv4') {
            ip = netInfo[dev][j].address;
            break;
          }
        }
      }
    }
  } else if (osType === 'Linux') {
    ip = netInfo.eth0[0].address;
  }

  return ip;
}

console.log ('-------------', getLocalIP ());
