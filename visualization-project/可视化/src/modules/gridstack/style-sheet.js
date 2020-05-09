/**
 * GridStyleSheet
 */
class StyleSheet {
  constructor(opts) {
    this.width = opts.width
    this.height = opts.height
    this.cols = opts.cols || 12
    this.rows = opts.rows || 9
    this.baseWidth = opts.baseWidth
    this.baseHeight = opts.baseHeight
    this.margins = opts.margins || [10, 10]
    this.stylesMap = new Map()

    this.initRootElement()
  }

  initRootElement() {
    this.el = document.createElement('style')
    this.el.setAttribute('rel', 'grid-style-sheet')
    this.head = document.getElementsByTagName('head')[0]
    this.head.appendChild(this.el)
  }

  render({ width, height, baseWidth, baseHeight }) {
    if (width && height) {
      this.width = width
      this.height = height
      this.baseWidth = (this.width - this.cols * this.margins[0] * 2) / this.cols
      this.baseHeight = (this.height - this.rows * this.margins[1] * 2) / this.rows
    }
    this.baseWidth = baseWidth
    this.baseHeight = baseHeight

    this.calcStyles()
    this.addStyleTag()
  }

  addRule(selector, rule) {
    this.stylesMap.set(selector, rule)
  }

  calcStyles() {
    let i = this.cols
    let j = this.rows
    let x = 1
    let y = 1

    /* generate CSS styles for cols */
    for (; i >= 0; i--) {
      let left = (i * this.baseWidth)
                  + (i * this.margins[0])
                  + ((i + 1) * this.margins[0])

      this.addRule(`[data-col="${i + 1}"]`, `{left: ${left}px;}\n`)
    }

    /* generate CSS styles for rows */
    for (; j >= 0; j--) {
      let top = ((j * this.baseHeight)
                 + (j * this.margins[1])
                 + ((j + 1) * this.margins[1]))

      this.addRule(`[data-row="${j + 1}"]`, `{top: ${top}px;}\n`)
    }

    for (; y <= this.rows; y++) {
      let height = (y * this.baseHeight
                    + (y - 1) * (this.margins[1] * 2))

      this.addRule(`[data-sizey="${y}"]`, `{height: ${height}px;}\n`)
    }

    for (; x <= this.cols; x++) {
      let width = (x * this.baseWidth
                   + (x - 1) * (this.margins[0] * 2))

      this.addRule(`[data-sizex="${x}"]`, `{width:${width}px;}\n`)
    }
  }

  addStyleTag() {
    let cssText = []
    this.el.textContent = ''
    this.stylesMap.forEach((rules, selector) => {
      cssText.push(`.widget${selector} ${rules}`)
    })

    if (this.el.styleSheet) {
      this.el.styleSheet.cssText = cssText.join('')
    } else {
      this.el.appendChild(document.createTextNode(cssText.join('')))
    }
  }

  destroy() {
    if (this.head) {
      this.head.removeChild(this.el)
    }
  }
}

export default StyleSheet
