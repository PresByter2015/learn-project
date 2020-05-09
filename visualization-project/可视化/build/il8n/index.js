const readline = require('readline')
const fs = require('fs')
const path = require('path')
const config = require('../config')

const localesPath = path.join(config.srcPath, 'locales')
const enUS = path.join(localesPath, 'en-US.messages.js')

/**
 * 判断英文文件是否存在
 */
if (!fs.existsSync(enUS)) {
  console.error(`${enUS} file not exists!`)
  process.exit()
}

/**
 * 循环读取 locales 目录中的 messages 文件
 * 对比与英文文件中的区别
 */
const enUSContent = fs.readFileSync(enUS).toString('utf-8').split('\n')

/**
 *
 */
class Il8n {
  constructor() {
    this.path = localesPath
    this.enUSFile = 'en-US.messages.js'
    this.enUSPath =  path.join(localesPath, this.enUSFile)

    this.ids = {}
    this.linesMap = {}
    this.lines = []

    this.read()
    this.parse()
 
    this.write('zh-CN')
  }

  /**
   * 检测重复 id
   */
  detectRepeatId() {

  }

  /**
   * 读取英文文件
   */
  read() {
    this.input = fs.readFileSync(this.enUSPath).toString('utf-8').split('\n')
  }

  parse() {
    this.input.map((line, index) => {
      this.parseLine(line, index + 1)
    })
  }

  /**
   *
   */
  parseLine(line, lineno) {
    let match = line.match(/\'([a-z|0-9|A-Z|\s]+)\'\:\s+\'(.*)\'/)

    if (match) {
      let key = match[1]
      let value = match[2]

      if (key in this.ids) {
        console.error(`'${key}' exists on lineno: ${lineno}`)
      } else {
        this.ids[key] = { value, lineno }
      }
      this.linesMap[lineno] = key
      this.lines.push(key)
    } else {
      this.linesMap[lineno] = line
      this.lines.push(line)
    }
  }

  start() {
     fs.readdir(localesPath, (error, files) => {
      if (error) {
        throw error
      }

      files.forEach(file => {
        if (file === this.enUSFile) {
          return
        }

        if (file.includes('.messages.js')) {
          let filePath = path.join(localesPath, file)
          let stat = fs.statSync(filePath)

          if (stat.isFile()) {
            this.replace(filePath, enUSContent)
          }
        }
      })
    })
  }

  /**
   * 判断是否同样的行
   */
  same(a, b) {
    if (typeof b === 'undefined') {
      return false
    }
    let pair = a.split(':')
    let key = pair[0].replace(/['|"]/g, '')

    // 相同的行有同样的 key
    if (b.includes(key)) {
      return true
    }
  }

  write(lang) {
    let file = path.join(this.path, `${lang}.messages.js`)
    let json = JSON.parse(fs.readFileSync(`${__dirname}/${lang}.json`).toString('utf-8'))

    let content = this.lines.map(line => {
      if (line in this.ids) {
        let key = line.charAt(0).toUpperCase() + line.slice(1)
        if (key in json) {
          return `  '${line}': '${json[key]}',`
        } else {
          return `  '${line}': '',`
        }
      } else {
        return `${line}`
      }
    })

    fs.writeFile(file, content.join('\n'), 'utf-8', (err) => {
      if (!err) {
        console.log(`${file} 文件写入成功`)
      }
    })
  }


}

new Il8n()
