const $ = require('jquery')
import Chart from '../chart'
import { EscapeHtml } from 'utils/escapeHtml'

class Text extends Chart {
  constructor() {
    super(...arguments)
    this.$el = $(this.el)

    this.$container = $('<div class="text-container"></div>')
      .css({
        width: '100%',
        height: '100%',
        display: 'table',
        overflow: 'hidden'
      })

    this.$title = $('<div class="title"></div>')
    this.$container.append(this.$title)
    this.$el.html('').append(this.$container)
  }

  setData(data) {
    this.setTextData(data)
  }

  setTextData(data) {
    this.option.title.text = data //设置option上的text为最新的文本值
    this.$title.html(EscapeHtml(data))
  }

  parseTextStyle(style) {
    if (!style.color) {
      style.color = '#fff'
      style.opacity = 1
    }

    if ('letterSpacing' in style) {
      this.$el.css({
        letterSpacing: +style.letterSpacing
      })
    }

    style.display = 'table-cell'

    //文本加粗
    if (style.fontBold) {
      this.$el.css({
        fontWeight: 'bold'
      })
    } else {
      this.$el.css({
        fontWeight: 'normal'
      })
    }

    return Object.assign({}, style, {
      fontSize: style.fontSize + 'px'
    })
  }

  setTextStyle(value) {
    this.setTextData(value)
  }

  flush() {
    let textStyle = this.style.get('textStyle')

    if (textStyle) {
      this.$title.css(this.parseTextStyle(textStyle))
    }
  }

  resize({ width, height }) {
    this.$el.css({ width, height })
    this.$title.css({ width, height })
  }
}

export default Text
