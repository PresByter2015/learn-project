const fs = require('fs')
const path = require('path')

module.exports = function MockMiddleware(req, res, next) {
  // 用于mock数据
  let urlReg = /^\/api/
  let match = req.url.match(urlReg)

  if (!urlReg.test(req.url)) {
    return next()
  }
  res.end(getMockData(req.url, req.method))
}

function getMockData(file, method) {
  let baseDir = '/api/'

  if (file.slice(0, baseDir.length) === baseDir) {
    file = file.slice(baseDir.length)
  }

  let filePath = `mock/${file}#${method.toUpperCase()}.json`
  let result = ''

  if (fs.existsSync(filePath)) {
    result = fs.readFileSync(filePath).toString();
  } else {
    result = JSON.stringify({
      stat: 'ERROR',
      errors: 'mock data file:[' + filePath + '] doesn\'t exist!'
    })
  }
  return result
}
