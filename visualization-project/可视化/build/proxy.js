const url = require('url')
const proxy = require('proxy-middleware')
const httpProxy = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const proxyConfig = require('./proxy.config')
const MockMiddleware = require('./mock')

module.exports = function(app, option) {
  let { baseUrl, host, globalHost } = proxyConfig

  app.use('/frontend/', proxy(`http://${option.host}:${option.port}/common/`))
  app.use('/assets/antd/', proxy(`http://${option.host}:${option.port}/antd/`))

  if (host) {
    const wsProxy = httpProxy(`${globalHost}/api/ws/dataset`, { ws:true })
    app.use('/api/ws/dataset', wsProxy)

    app.use('/upload', proxy(`${globalHost}/upload`))
    app.use('/resource', proxy(`${globalHost}/resource`))
    console.log(globalHost);
    app.use('/tenant/api/', proxy(`${globalHost}/tenant/api`))
    app.use('/notify/api/', proxy('https://www.huishe.cn/notify/api'))
    app.use(baseUrl, proxy(host + '/api'))
    app.use('/verify', proxy(`${globalHost}/verify`))
  } else {
    app.use(bodyParser.json())
    app.use(MockMiddleware)
  }
}
