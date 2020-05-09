const proxyDict = {
  mock: '',
    // dev: 'http://10.1.200.112:7700',
    // dev: 'http://47.93.217.103:7700',
    // dev: 'http://10.211.55.4:7700', // 虚拟机
  dev: 'http://192.168.1.105:7700', // 虚拟机
//   dev: 'http://192.168.31.104:7700',
    // dev: 'http://59.111.147.38:8100', // 线上
    // dev: 'http://118.178.182.6:7700',
  test: 'https://www.huishe.cn',
  zhq: 'http://192.168.31.147:3100',
  devout: 'http://192.168.31.147:3100'
};

const proxy = process.env.proxy || 'dev';

module.exports = {
  baseUrl: '/api',
  host: proxyDict[proxy],
  globalHost: proxyDict[proxy] || proxyDict['dev']
};
