const path = require ('path');
const HtmlWebpackPlguin = require ('html-webpack-plugin');
const merge = require ('webpack-merge');
const base = require ('./webpack.base');

const VueSSRClientPlugin = require ('vue-server-renderer/client-plugin');

module.exports = merge (base, {
  mode: 'development',
  entry: {
    client: path.resolve (__dirname, '../src/client-entry.js'),
  },
  //   热更新
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve (__dirname, '../dist'),
    hot: true,
    historyApiFallback: true,
    compress: true
  },
  plugins: [
    new HtmlWebpackPlguin ({
      template: path.resolve (__dirname, '../public/index.client.html'),
      filename: 'index.client.html',
      minify: false,
    }),
    new VueSSRClientPlugin (),
    new webpack.HotModuleReplacementPlugin()
  ],
});
