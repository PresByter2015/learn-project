const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('./config')
const vendor = require('./vendor.config')

module.exports = function(webpackConfig, variables) {
  webpackConfig.entry.vendor = vendor

  webpackConfig.plugins.push(new webpack.DefinePlugin(variables))

  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: 'public/[name].[chunkhash:5].css',
      allChunks: true
    })
  )

  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )

  webpackConfig.plugins.push(
    new CopyWebpackPlugin([{
      toType: 'dir',
      from: path.join(config.rootPath, 'src/assets/common'),
      to: path.join(config.rootPath, 'dist/frontend')
    }, {
      toType: 'dir',
      from: path.join(config.rootPath, 'src/assets/antd'),
      to: path.join(config.rootPath, 'dist/assets/antd')
    }])
  )
}
