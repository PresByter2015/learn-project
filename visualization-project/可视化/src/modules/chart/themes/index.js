import { deepCopy } from 'utils/serialize'
import { isPlainObject } from 'utils'

let themes = {}

/**
 * 导入 themes 一级目录中的文件
 */
let req = require.context('./', true, /([a-z]+[^\/])\/index\.js/)
let modules = req.keys().filter((item) => {
  return item.match(/\//g).length === 2
})

const ConfigMap = structConfigMap()

modules.forEach(module => {
  let match = module.match(/\.\/([a-z]+)\//)

  if (match) {
    let dir = match[1]
    Object.assign((themes[dir] = themes[dir] || { }), req(module).default)
  }
})

export default {
  get(type, theme) {
    let ret = themes[type]

    if (theme in ret) {
      return ret[theme]
    }

    return ret
  },

  /**
   * 获取图表的图形配置数据，便于生成表单
   * 
   * @param type string 图表类型
   * @param theme string 图表样式
   */
  getConfig(type, theme = 'basic') {
    if (ConfigMap.has(type)) {
      let typeMap = ConfigMap.get(type)
      return typeMap.get(theme)
    }
    return false
  },

  /**
   * 获取扁平数据，以便于后端存储
   * 
   * @param type string 图表类型
   * @param theme string 图表样式
   */
  getFlattenConfig(type, theme) {
    let result = {}
    let config = this.getConfig(type, theme)

    if (!config) {
      return result
    }

    if (isPlainObject(config)) {
      Object.values(config).map(configArrayIteration)
    } else if (Array.isArray(config)) {
      configArrayIteration(config);
    }

    function configArrayIteration(config) {
      config.forEach(item => {
        let { fields } = item

        fields && fields.forEach(field => {
          if (field.type === 'computed') {
            handleComputed(field)
          } else if (field.type === 'compose') {
            field.fields.forEach(field => {
              result[field.name] = field.value
            })
          } else {
            result[field.name] = field.value
          }
        })
      })
    }

    // 处理需要计算类型的配置
    function handleComputed(field) {
      let config = field.computed()

      if (Array.isArray(config)) {
        config.forEach(item => {
          result[item.name] = item.value
        })
      }

      if (isPlainObject(config)) {
        result[config.name] = config.value
      }

    }

    return deepCopy(result)
  }
}

/**
 * 索引所有配置文件
 */
function structConfigMap() {
  const configMap = new Map()
  let configReq = require.context('./', true, /([a-z]+[^\/])\/config\.js/)

  configReq.keys().forEach(module => {
    let pair = module.split('/')

    if (pair) {
      let type = pair[1]
      let theme = pair[2]

      let map
      if (configMap.has(type)) {
        map = configMap.get(type)
      } else {
        map = new Map()
        configMap.set(type, map)
      }
      map.set(theme, configReq(module).default)
    }
  })

  return configMap
}
