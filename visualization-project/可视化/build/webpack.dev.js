const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const config = require('./config')

module.exports = function(webpackConfig) {
  webpackConfig.devtool = 'source-map'

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }))

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )

  webpackConfig.plugins.push(
    new webpack.DllReferencePlugin({
      context: config.tmpPath,
      manifest: require(path.join(config.tmpPath, 'manifest.json'))
    })
  )

  webpackConfig.plugins.push(
    new AddAssetHtmlPlugin({
      filepath: require.resolve(path.join(config.tmpPath, 'vendor.dll')),
      includeSourcemap: false
    })
  )
}
