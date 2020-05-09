const fs = require('fs')
const path = require('path')
const content = fs.readFileSync(path.join(__dirname, '', '../package.json')).toString('utf-8')
const packageJSON = JSON.parse(content)

var vendor = []

if (packageJSON.dependencies) {
  vendor = Object.keys(packageJSON.dependencies)
}

module.exports = vendor
