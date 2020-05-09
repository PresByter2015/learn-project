import Echarts from '../echarts'
import zrender from 'zrender'
import Sector from 'zrender/src/graphic/shape/Sector'
import Text from 'zrender/src/graphic/Text'
import LinearGradient from 'zrender/src/graphic/LinearGradient'


const pi = Math.PI

class Process extends Echarts {
  constructor(option, el) {
    super(...arguments)
    this.el = el
    this.zr = zrender.init(el)
    this._width = this.zr.getWidth(el)
    this._height = this.zr.getHeight(el)
    this.style.set('current', 75)
  }

  resize({ width, height }) {
    if (width) {
      this.el.style.width = `${width}px`
    }
    if (height) {
      this.el.style.height = `${height}px`
    }

    if (height && width) {
      this.zr = zrender.init(this.el)
      this._width = this.zr.getWidth(this.el)
      this._height = this.zr.getHeight(this.el)
      this.render()
    }

  }

  flush() {
    this.render()
  }

  setProcessStyle() {
    this.render()
  }

  calcPercent(current) {
    if (Number.isFinite(current)) {
      current = current < 0 ? 0 : current // if less than 0, is 0
      current = current > 100 ? 100 : current // is more than 100, is 100
      const max = 100
      const min = 0

      if (current <= min) {
        return 0
      }

      if (current >= max) {
        return 1
      }

      return (current / (max - min)) > 1 ? 1 : (current / (max - min))
    } else {
      return 0
    }

  }

  degree2Radian(angle = 90) {
    angle = angle % 360  //处理角度大于360或者小于-360的值
    return (-angle / 360) * pi * 2  // * -1是为了解决普遍以为顺时针为角度增加的的问ti
  }

  parseCenterandRadius(center = { 0: 50, 1: 50 }) {
    let result = []

    Object.keys(center).map( (item) => {
      result[item] = center[item]
    })

    return result
  }

  parseCurrentValue(array) {
    let current = array[0]
    if (isNaN(Number(current))) {
      if (isNaN(parseInt(current, 10))) {
        return 0
      } else {
        return parseInt(current, 10) === parseFloat(current, 10) ? parseInt(current, 10) : parseFloat(current, 10)
      }
    } else {
      return Number(current)
    }
  }

  parseGradientColor(array) {
    return new LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: array[0] },
      { offset: 1, color: array[1] }
    ], false)
  }

  setCurrentData(value) {
    if (value && Array.isArray(value) && value.length) {
      value = this.parseCurrentValue(value)
    } else {
      value = 0
    }
    this.style.style.current = value
  }

  render() {
    this.zr.clear()

    let percent = 0
    let { _width, _height } = this
    let { process = {}, current = 75 } = this.style.style
    let { percentFont = 12, charFont = 60, showPercent = true, center = {}, fill = {},
      charBold = false, radius = {}, startAngle = 90, charColor, background = '#333a43' } = process

    center = this.parseCenterandRadius(center)
    radius = this.parseCenterandRadius(radius)
    startAngle = this.degree2Radian(startAngle)
    percent = (this.calcPercent(current)).toFixed(4)

    let cx = _width * (center[0] / 100)
    let cy = _height * (center[1] / 100)

    let standard = Math.min(_width, _height) //选取两者较小值为准
    if (radius[0] > radius[1]) {
      [ radius[0], radius[1] ] = [ radius[1], radius[0] ]
    }

    let r = standard * (radius[1] / 100)
    let r0 = standard * (radius[0] / 100)
    let fillColor = fill.color || 'rgba(247, 151, 39, 1)'

    let outterSector = new Sector({
      zlevel: 10,
      shape: {
        cx,
        cy,
        r,
        r0,
        startAngle,
        endAngle: pi * 2 + startAngle
      },
      style: {
        stroke: background,
        fill: background
      }
    })

    let innerSector = new Sector({
      zlevel: 15,
      shape: {
        cx,
        cy,
        r,
        r0,
        startAngle,
        endAngle: percent * 2 * pi + startAngle
      },
      style: {
        stroke: fillColor,
        fill: fillColor
      }
    })

    let text1 = new Text({
      zlevel: 20,
      style: {
        text: showPercent ? (percent * 100).toFixed(2) : '',
        textAlign: 'center',
        x: cx - (showPercent ? (percentFont * 0.5 * charFont) : 0),
        y: cy,
        font: `${charBold ? 'bold' : ''} ${charFont}px sans-serif`,
        fill: charColor
      }
    })

    let rect = text1.getBoundingRect()

    let text2 = new Text({
      zlevel: 20,
      style: {
        text: showPercent ? '%' : '',
        textAlign: 'center',
        x: rect.x + rect.width + (percentFont * 0.5 * charFont) + 3,
        y: rect.y,
        font: `${percentFont * charFont}px sans-serif`,
        fill: charColor
      }
    })

    this.zr.add(outterSector)
    this.zr.add(innerSector)
    this.zr.add(text1)
    this.zr.add(text2)
  }


}

export default Process
