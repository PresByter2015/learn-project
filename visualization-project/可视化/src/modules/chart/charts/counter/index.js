import Chart from '../chart'
import Chars from './chars'

/*
 * countUp.js
 * by @inorganik
 */
class Counter extends Chart {
  constructor(option, el, setting) {
    super(option, el, setting)
    this.textWrap = document.createElement('div')
    this.el.appendChild(this.textWrap)

    // this.el.style.display = 'flex'
    this.el.style.width = '100%'
    this.el.style.height = '100%'

    this.textWrap.style.height = '100%'
    this.textWrap.style.display = 'flex'

    this.options = {
      prefix: '',
      suffix: '',
      separator: ',',

      useEasing: true, // toggle easing
      useGrouping: true, // 1,000,000 vs 1000000
      easingFn: null, // optional custom easing closure function, default is Robert Penner's easeOutExpo
      formattingFn: null // optional custom formatting function, default is this.formatNumber below
    }

    if (this.options.separator === '') {
      this.options.useGrouping = false
    }
    this.numerals = []

    this.startVal = 0
    this.value = 0

    this.countDown = (this.startVal > this.value)
    this.frameVal = this.startVal

    this.dec = Math.pow(10, this.option.formatter.decimals)

    this.duration = 1000

    this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo
    this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber

    if (this.option) {
      this.value = this.option.value
      this.formatValue = this.parseFormatter(this.option.value)
      // 处理文本样式
      this.setTextStyle(this.option.textStyle)
    }

    this.chars = new Chars(
      this.textWrap,
      this.option.displayType,
      this.formatValue, {
        style: this.option.textStyle
      }
    )
  }

  easeOutExpo(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
  }

  // 设置文本样式
  setTextStyle(textStyle) {
    function textAlignHandler(value) {
      if (value === 'left') {
        value = 'flex-start'
      }
      if (value === 'right') {
        value = 'flex-end'
      }

      return {
        name: 'justifyContent',
        value: value
      }
    }

    function verticalAlignHandler(value) {
      if (value === 'top') {
        value = 'flex-start'
      }
      if (value === 'bottom') {
        value = 'flex-end'
      }
      if (value === 'middle') {
        value = 'center'
      }

      return {
        name: 'alignItems',
        value: value
      }
    }

    for (let rule in textStyle) {
      let value = textStyle[rule]

      // 水平位置
      if (rule === 'textAlign') {
        let result = textAlignHandler(value)
        this.textWrap.style[result.name] = result.value
      }

      // 垂直位置
      if (rule === 'verticalAlign') {
        let result = verticalAlignHandler(value)
        this.textWrap.style[result.name] = result.value
      }
    }
  }

  // 格式化数字
  formatter(value) {
    let { formatter, separator } = this.option
    let { decimals, digits, round, thousand } = formatter

    // 千位分隔符
    if (thousand) {
      separator = ','
    } else {
      separator = ''
    }

    if (!value || isNaN(value)) {
      return value
    }

    value = +value

    // 四舍五入
    if (round) {
      value = Math.round(value)
    }

    // 保留位数
    if (typeof decimals === 'number') {
      value = value.toFixed(decimals > 0 ? decimals : 0)
    }

    // 扩展位数, 高位补零
    value = this.pad(value, digits)

    let str = '' + value

    let pair = str.split('.')
    let rgx = /(\d+)(\d{3})/
    let integer = pair[0]
    let decimal = pair[1]

    decimal = String(pair.length > 1 ? '.' + decimal : '')

    if (separator) {
      while (rgx.test(integer)) {
        integer = integer.replace(rgx, '$1' + separator + '$2')
      }
    }

    value = integer + '' + decimal

    // 重新扩展位数，保证正确的位数
    let result = this.pad(value, digits)

    // 如果开头是分隔符，移除掉
    if (separator && result && result.charAt(0) === separator) {
      result = this.pad(value, digits + 1).replace(separator, '')
    }

    return result
  }

  pad(value, length, padString = '0') {
    if (length === 0) {
      return value
    } else if (value.length > length) {
      value = value.slice(value.length - length)
    } else {
      value = value.padStart(length, padString)
    }

    return value
  }

  render(value) {
    value = value || this.value

    value = String(this.formatter(value))

    this.chars.render(value)
  }

  redraw() {
    this.render(this.value)
  }

  count(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp
    }

    this.timestamp = timestamp
    let progress = timestamp - this.startTime
    this.remaining = this.duration - progress

    // to ease or not to ease
    if (this.options.useEasing) {
      if (this.countDown) {
        this.frameVal = this.startVal - this.easingFn(progress, 0, this.startVal - this.value, this.duration)
      } else {
        this.frameVal = this.easingFn(progress, this.startVal, this.value - this.startVal, this.duration)
      }
    } else {
      if (this.countDown) {
        this.frameVal = this.startVal - ((this.startVal - this.value) * (progress / this.duration))
      } else {
        this.frameVal = this.startVal + (this.value - this.startVal) * (progress / this.duration)
      }
    }

    // don't go past value since progress can exceed duration in the last frame
    if (this.countDown) {
      this.frameVal = (this.frameVal < this.value) ? this.value : this.frameVal
    } else {
      this.frameVal = (this.frameVal > this.value) ? this.value : this.frameVal
    }

    // decimal
    let dec = Math.pow(10, this.option.formatter.decimals)
    this.frameVal = Math.round(this.frameVal * dec) / dec

    // format and print value
    this.render(this.frameVal)

    // whether to continue
    if (progress < this.duration) {
      this.rAF = requestAnimationFrame(this.count.bind(this))
    } else {
      if (this.callback) {
        this.callback()
      }
    }
  }

  start(callback) {
    this.callback = callback
    this.rAF = requestAnimationFrame(this.count.bind(this))

    return false
  }

  // 解析 formatter
  parseFormatter(value) {
    value = this.formatter(value)

    return value
  }

  setData(data) {
    if (!data) {
      return
    }
    const { value } = data

    if (!value || this.value === value) {
      return
    }

    this.startVal = this.value
    this.startTime = false

    if (this.startVal >= this.value) {
      this.startVal = 0
    }

    this.value = value
    this.option.value = value // 兼容以前代码

    this.countDown = (this.startVal > this.value)
    this.formatValue = this.formatter(value)

    this.render()
    this.start()
  }

  setFormatterStyle(formatterStyle) {
    this.option.formatter = formatterStyle // 兼容以前代码
    this.formatter(this.value)
    this.render()
  }

  setTextStyleStyle(textStyle) {
    this.setTextStyle(textStyle)
    this.chars.setStyle(textStyle)
  }

  setDisplayTypeStyle(type) {
    this.chars.setType(type)
  }

}

export default Counter
