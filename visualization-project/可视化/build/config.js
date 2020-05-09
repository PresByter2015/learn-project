const path = require('path');

const config = {
  title: '数据可视化 - HUISHE',
  rootPath: path.join(__dirname, '..'),
  srcPath: path.join(__dirname, '..', 'src'),
  tmpPath: path.join(__dirname, '..', '.tmp'),
  dev: {
    NODE_ENV: 'development',
    API_PREFIX: '/huishe'
  },
  prod: {
    NODE_ENV: 'production',
    API_PREFIX: ''
  },
  test: {
    NODE_ENV: 'production',
    API_PREFIX: ''
  },
  ee: {
    NODE_ENV: 'production',
    API_PREFIX: '/huishe'
  },
  babel: {
    presets: [
      'es2015',
      'stage-0',
      'react'
    ],
    plugins: [
      'transform-runtime'
    ]
  }
};

module.exports = config;
