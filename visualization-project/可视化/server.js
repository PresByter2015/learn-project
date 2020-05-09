const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./build/config')
const webpackConfig = require('./webpack.config')('dev')
const ip = require('ip')

webpackConfig.entry.app.unshift('webpack-hot-middleware/client')

const compiler = webpack(webpackConfig)
const host = ip.address()
const port = 3100

const app = express()

require('./build/proxy')(app, { host, port })
require('./build/login')(app, { host })

const devMiddleware = webpackDevMiddleware(compiler, {
  quiet: true,
  noInfo: false,
  profile: true,  
  cache:true,
  hot: true
})

const publicDirectory = path.resolve(__dirname, 'src', 'assets')  

app.use(express.static(publicDirectory))

app.use(devMiddleware)
app.use(webpackHotMiddleware(compiler))
const mfs = devMiddleware.fileSystem
const file = path.join(webpackConfig.output.path, 'index.html')

devMiddleware.waitUntilValid()

app.get('*', (req, res) => {
  devMiddleware.waitUntilValid(() => {
    const html = mfs.readFileSync(file)
    res.end(html)
  })
})

app.listen(port, host, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://%s:%s/ in your browser.', port, host, port)
  }
  const address = `http://${host}:${port}/`
})
