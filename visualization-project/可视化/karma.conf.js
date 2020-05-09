const webpackConf = require('./build/webpack.dev.config');
delete webpackConf.entry;

module.exports = function (config) {
  config.set({
    browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],
    singleRun: false,
    autoWatch: true,
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    webpack: webpackConf,
    webpackServer: {
      noInfo: true
    }
  });
};
