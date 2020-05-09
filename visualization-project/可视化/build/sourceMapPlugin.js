const path = require('path')
const RawSource = require('webpack/lib/RawSource')

/**
 * 修改sourceMappingURL
 */
function SourceMapPlugin(options) {
  this.options = options
}

SourceMapPlugin.prototype.apply = function(compiler) {
  var options = this.options

  compiler.plugin('emit', function(compilation, callback) {
    var assets = compilation.assets

    Object.keys(assets).forEach(function(key) {
      if (path.extname(key) === '.js') {
        var asset = assets[key]
        var content = asset.source()

        content = content.replace(/\/\/# sourceMappingURL=/g, '//# sourceMappingURL=' + options.url)
        assets[key] = new RawSource(content)
      }
    })

    callback()
  })
}

module.exports = SourceMapPlugin
