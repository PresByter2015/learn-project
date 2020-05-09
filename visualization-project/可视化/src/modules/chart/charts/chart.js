import { deepCopy } from 'utils/serialize'
import { camelCase } from './utils'
import Style from './style'

/**
 * Chart Class
 */
class Chart {
  constructor(option, el, theme) {
    console.log(option);
    console.log(el);
    console.log(theme);

    this.option = option
    this.el = el
    this.theme = theme

    this.style = new Style()

    // 纯净的数据，不能被修改
    Object.defineProperty(this, 'pureOption', {
      __proto__: null,
      configurable: false,
      writable: false,
      value: deepCopy(option)
    })

    this.data = {}
    if (!el) {
      this.el = document.createElement('div')
      this.el.style.width = '300px'
      this.el.style.height = '150px'
    }
  }

  resize({ width, height }) {
    if (width) {
      this.el.style.width = `${width}px`
    }
    if (height) {
      this.el.style.height = `${height}px`
    }
  }

  toJSON() {
    console.log('=============================================================');
    console.log(this.option);
    return JSON.stringify(this.option)
   
    
  }

  render() {
    this.setOption(this.option)
  }

  /**
   * 扩展对象
   * @param methods object
   */
  mixin(methods) {
    Object.keys(methods).forEach(name => {
      if (typeof methods[name] === 'function') {
        this[name] = methods[name].bind(this)
      } else {
        this[name] = methods[name]
      }
    })
  }

  // 默认样式
  setOption() { }

  /**
   * 配置图表样式
   * {
   *   legend_show: true
   * }
   * or
   * setStyle('legend_show', true)
   *
   * 单个拼合可能会产生重复合并问题
   */
  setStyle(style) {
    let afterSetStyleArgs = []

    if (typeof style === 'object') {
      for (let name in style) {
        this.style.set(name, style[name])
      }
      // @todo 争取以后去掉这个方法
      this.afterSetStyle && this.afterSetStyle()

      afterSetStyleArgs[0] = Object.keys(this.style.toObject())
    } else if (typeof style === 'string') {
      this.style.set(style, arguments[1])
      afterSetStyleArgs[0] = style
    }

    this._afterSetStyle.apply(this, afterSetStyleArgs)

    this.flush()
  }

  /**
   * 图形配置完成之后调用
   */
  _afterSetStyle(style) {
    if (Array.isArray(style)) {
      style.forEach(this.runAfterStyleParser.bind(this))
    } else {
      let pair = style.split('_')
      this.runAfterStyleParser(pair[0])
    }
  }

  runAfterStyleParser(name) {
    let method = camelCase(`set ${name} style`)
    if (this.hasMethod(method)) {
      this[method].bind(this)(this.style.get(name))
    }
    /* else {
      throw Error(`必须实现 ${method} 处理方法`)
    }
    */
  }

  /**
   * 设置数据更新
   */
  setData(data) {
    if (!data) {
      return
    }

    for (let key in data) {
      let method = camelCase(`set ${key} data`)

      // 如果存在对应的处理方法，则调用该方法处理
      if (this.hasMethod(method)) {
        this.option[key] = this.callMethod(method, [data[key], this.option[key]])
      } else {

      }
    }

    this.flush(true)
  }

  destroy() { }

  /**
   * 刷新数据
   */
  flush(notMerge = false) {
    this.setOption(this.option, notMerge)
  }

  hasMethod(method) {
    return method in this && typeof this[method] === 'function'
  }

  callMethod(method, args) {
    return this[method].apply(this, args)
  }
}

export default Chart
