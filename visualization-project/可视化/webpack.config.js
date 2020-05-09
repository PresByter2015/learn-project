const fs = require('fs');
const path = require('path');
// const webpack = require('webpack');
const config = require('./build/config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = config.srcPath;

const webpackConfig = {
  entry: {
    app: [
      path.join(config.rootPath, 'src', 'index')
    ]
  },
  output: {
    path: path.join(config.rootPath, 'dist'),
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'react-hot-loader'
      }, {
        loader: 'babel-loader',
        query: config.babel
      }, {
        loader: 'eslint-loader'
      }],
      include: [
        path.resolve(config.rootPath, 'src')
      ]
    }, {
      test: /\.tsx?$/,
      use: [
        'babel-loader',
        'ts-loader'
      ]
    }, {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        'stylus-loader'
      ]
    },
      {
        test: /\.stylus$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]-[hash:5]',
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf)$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'assets/[path][name].[ext]?[hash:8]'
          }
        }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.title,
      filename: 'index.html',
      template: 'index.html',
      //favicon: 'src/assets/favicon.png',
      _layout: {
        css: '/frontend/Layout-public.min.css',
        js: '/frontend/Layout-public.min.js'
      }
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.styl', '.json'],
    alias: {
      src: srcPath,
      config: path.join(srcPath, 'config'),
      models: path.join(srcPath, 'models'),
      mixins: path.join(srcPath, 'mixins'),
      utils: path.join(srcPath, 'utils'),
      pages: path.join(srcPath, 'pages'),
      views: path.join(srcPath, 'views'),
      store: path.join(srcPath, 'store'),
      assets: path.join(srcPath, 'assets'),
      vendor: path.join(srcPath, 'vendor'),
      modules: path.join(srcPath, 'modules'),
      http: path.join(srcPath, 'modules', 'http'),
      components: path.join(srcPath, 'components')
    }
  }
};

module.exports = function (env) {
  let file = path.join(config.rootPath, 'build', `webpack.${env}.js`);
  let environmentVariables = getEnvironementVariables(config[env]);

  if (!fs.existsSync(file)) {
    file = path.join(config.rootPath, 'build', 'webpack.deploy.js');
  }

  // 引入配置文件
  require(file)(webpackConfig, environmentVariables);

  return webpackConfig;
};

/**
 * 获取环境变量
 * @param config
 * @returns {{}}
 */
function getEnvironementVariables(config) {
  const result = {};

  for (let key in config) {
    result[`process.env.${key}`] = JSON.stringify(config[key]);
  }
  return result;
}

