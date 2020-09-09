import path from 'path';

const config = {
  projectName: 'taro-demo',
  date: '2020-9-4',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  alias: {
    '@': path.resolve (__dirname, '..', 'src'),
    '@/api': path.resolve (__dirname, '..', 'src/api'),
    '@/components': path.resolve (__dirname, '..', 'src/components'),
    '@/config': path.resolve (__dirname, '..', 'src/config'),
    '@/pages': path.resolve (__dirname, '..', 'src/pages'),
    '@/store': path.resolve (__dirname, '..', 'src/store'),
    '@/types': path.resolve (__dirname, '..', 'src/types'),
    '@/utils': path.resolve (__dirname, '..', 'src/utils'),
    '@/assets': path.resolve (__dirname, '..', 'src/assets'),
  },
  copy: {
    patterns: [
      {from: 'src/assets/', to: 'dist/assets'},
      // {from: 'src/ext.json', to: 'dist/'},
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
