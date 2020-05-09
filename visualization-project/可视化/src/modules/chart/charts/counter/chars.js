import Char from './char'

class Chars {
  constructor(el, type, chars, option) {
    this.el = el
    this.type = type || 'normal'
    this.chars = String(chars).split('')

    this.option = option

    this.charsCache = []

    this.flushCharsCache(this.chars)

  }

  flushCharsCache(chars) {
    this.el.innerHTML = ''
    let frag = document.createDocumentFragment()

    this.charsCache = []

    chars.forEach((item, i) => {
      let char = null

      if (this.charsCache[i]) {
        char = this.charsCache[i]
      } else {
        char = new Char(this.type, item, { style: this.option.style })
        this.charsCache.push(char)
      }

      frag.appendChild(char.el)
    })

    this.el.appendChild(frag)
  }

  setStyle(style) {
    Object.assign(this.option.style, style)

    this.charsCache.forEach(char => char.setStyle(this.option.style))
  }

  setChars(chars) {
    this.chars = chars.split('')
    this.flushCharsCache(this.chars)
  }

  setType(type) {
    if (type !== this.type) {
      this.charsCache = this.chars.map((val, i) => {
        let char = this.getChar(i)
        char.setDisplayType(type, val)
        return char
      })
    }

    this.type = type
  }

  getChar(index) {
    return this.charsCache[index]
  }

  render(chars) {
    chars = chars.split('')

    if (chars.length !== this.chars.length) {
      this.flushCharsCache(chars)
    }
    this.chars = chars

    this.charsCache = chars.map((char, i) => {
      let ocharCache = this.getChar(i)
      ocharCache.render(char)
      ocharCache.char = char
      return ocharCache
    })
  }
}

export default Chars
