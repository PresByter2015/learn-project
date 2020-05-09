import Echarts from '../echarts'
import zrender from 'zrender'
import Ellipse from 'zrender/src/graphic/shape/Ellipse'
import $ from 'jquery'

class Circle extends Echarts {
  constructor(option, el) {
    super(...arguments)
    this.el = el
    this.zr = zrender.init(el)
    this._width = this.zr.getWidth(el)
    this._height = this.zr.getHeight(el)
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

  setShadowStyle(shadow) {
    let { show = true } = shadow
    let circleStyle = this.style.style.circle
    if (show) {
      circleStyle.shadowBlur = 30
      circleStyle.shadowColor = '#000'
      circleStyle.shadowOffsetX = 5
      circleStyle.shadowOffsetY = 5 
    } else {
      delete circleStyle.shadowBlur
      delete circleStyle.shadowColor
      delete circleStyle.shadowOffsetX
      delete circleStyle.shadowOffsetY
    }
  }

  flush() {
    this.render()
  }

  render() {
    this.zr.clear()
    let { _width, _height } = this
    let circleStyle = this.style.style.circle
    let { lineWidth } = circleStyle
    let circle = new Ellipse({
      shape: {
        cx: _width / 2,
        cy: _height / 2,
        rx: (_width - lineWidth) / 2,
        ry: (_height - lineWidth) / 2
      },
      style: circleStyle
    })
    this.zr.add(circle)
    $(this.el).children('div').addClass('circle-box')
  }

}

export default Circle
