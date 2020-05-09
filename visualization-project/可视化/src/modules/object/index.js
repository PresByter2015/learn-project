
/**
 * 设置值
 */
function set (option, path, value) {
  return getterSetter(option, path, value)
}

/**
 * 取值
 */
function get(option, path) {
  return getterSetter(option, path)
}


/**
 * 判断 path 是否为空
 */
function isEmptyPath(path) {
  return path && path.length === 0
}

function getterSetter(option, path, value) {
  if (typeof path === 'string') {
    path = path.split('.')
  }

  let dir = path.shift()
  let partialOption

  // 处理 series[0] 形式的数据
  let matches = dir.match(/\[([0-9]+)\]/)

  if (matches) {
    dir = dir.split('[')[0]
    let index = +matches[1]

    if (isEmptyPath(path) && value) {
      option[dir][index] = value
    }

    partialOption = option[dir][index]
  } else {
    if (value && typeof option[dir] !== 'object' && isEmptyPath(path)) {
      option[dir] = value
    }

    if (option && dir in option) {
      partialOption = option[dir]
    }
  }

  if (isEmptyPath(path)) {
    return partialOption
  } else {
    return getterSetter(partialOption, path, value)
  }
}

export default {
  parse(object) {
    let obj = {}
    for (let key in object) {
      if (typeof object[key] === 'object') {
        obj[key] = parse(object[key])
      } else {
        obj[key] = object[key]
      }
    }

    return obj

    function parse(data) {
      let obj = {}

      for (let key in data) {
        let keyPair = key.split('.')

        if (keyPair.length === 1) {
          // obj[key] = data[key]
        } else {
          setter(keyPair, data[key], data)
          delete data[key]
        }
      }

      for (let k in data) {
        obj[k] = data[k]
      }

      return obj
    }


    function setter(path, value, obj) {
      let dir = path.shift()

      if (path.length === 0) {
        obj[dir] = value
      } else {
        obj[dir] = obj[dir] || {}
        setter(path, value, obj[dir])
      }
    }
  },

  set,
  get
}
