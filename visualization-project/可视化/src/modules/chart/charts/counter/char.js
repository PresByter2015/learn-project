import Led from './led'
import Text from './text'

const characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

class Char {
  constructor(type, char, option = {}) {
    this.el = document.createElement('div')
    this.type = type
    this.char = char
    this.option = option

    if (option.style) {
      this.setStyle(option.style)
    }

    this.el.style.padding = '0 1px'
    this.el.style.display = 'inline-block'


    this.paint(this.char)
    this.render(char)
  }

  setFontStyle(style) {
    if (!style) {
      return
    }

    this.el.style.fontSize = style.size + 'px'
    this.el.style.fontWeight = style.bold ? 'bold' : 'normal'
    this.el.style.color = style.color

    if (this.brush && this.brush.setStyle) {
      this.brush.setStyle(style)
      this.paint(this.char)
    }
  }

  setDisplayType(type) {
    this.type = type
    this.paint(this.char)
  }

  paint(param) {
    if (this.type === 'led') {
      if (characters.includes(+param)) {
        this.brush = new Led(param, { style: this.option.style })
        this.brush.el.style.textAlign = 'center'
        this.brush.el.style.verticalAlign = 'middle'
      } else {
        this.brush = new Text(param)
      }

    } else {
      this.brush = new Text(param)
    }

    this.el.innerHTML = ''
    this.el.appendChild(this.brush.el)
  }

  setStyle(style) {
    for (let rule in style) {
      let value = style[rule]

      if (typeof value === 'number') {
        value = value + 'px'
      }

      if (rule === 'font') {
        this.setFontStyle(value)
      } else if (rule === 'letterSpacing') {
        rule = 'margin'
        value = `0 ${value}`
      }

      this.el.style[rule] = value
    }
  }

  render(val) {
    this.el.style.display = val ? 'inline-block' : 'none'
    this.paint(val)
    this.brush.render(val)
  }
}

export default Char
