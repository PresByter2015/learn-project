import debug from 'debug'

let colorDict = {
  log: 'lightseagreen',
  warn: 'goldenrod',
  error: 'red',
}

// 缓存 logger 对象
let loggerCache = {}

function getLogger(namespace, color) {
  let logger = debug(namespace)
  logger.color = color
  return logger
}

function logHandler(logger) {
  return function _logHandler () {
    // console.groupCollapsed('%clog', 'color:red')
    logger.apply(logger, Array.prototype.slice.call(arguments))
    // console.trace('↑line numbers')
    // console.groupEnd()
  }
}

function noopFactory(methods) {
  let exports = {}
  methods.forEach((name) => {
    exports[name] = function noop () { }
  })
  return exports
}

/**
 * 创建 logger 对象的工厂方法
 */
function loggerFactory(methods, namespace) {
  let exports = {}
  methods.forEach((name, index) => {
    let logger
    if (index > 0) {
      logger = getLogger(`${namespace}:${name}`, colorDict[name] || colorDict.log)
      exports[name] = logHandler(logger)
    } else {
      exports[name] = function noName (color) {
        logger = getLogger(namespace, color)
        return logHandler(logger)
      }
    }
  })
  return exports
}


/**
 * @module log
 * @desc 日志对象
 */
function logService(namespace) {
  namespace = namespace || 'app'

  // 取缓存的 logger 对象
  if (namespace in loggerCache) {
    return loggerCache[namespace]
  }

  /**
   * 生成 logger 对象
   */
  let methodFactory = noopFactory

  if (true || localStorage.getItem('debug')) {
    if (localStorage.getItem('debug') === 'disabled') {
      debug.disable(`${namespace}:*`)
    } else {
      debug.enable(`${namespace}:*`)
      methodFactory = loggerFactory
    }
  }

  loggerCache[namespace] = methodFactory([
    'createLogger', 'log', 'info', 'warn', 'error'
  ], namespace)

  return loggerCache[namespace]
}

module.exports = Object.assign(logService, logService())
