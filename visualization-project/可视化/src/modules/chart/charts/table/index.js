import Chart from '../chart'
import $ from 'jquery'

/**
 *
 */
let id = 1024
/*
const theadDefaultStyle = {
  padding: '3% 4%'
}
*/

const tbodyDefaultStyle = {
  padding: '2px 5px'
}

class Table extends Chart {
  constructor(data, el) {
    super(...arguments)
    this.style.set('thead_show', true)

    this.id = this.el.id = `__chart-table-${id++}`

    this.el = el

    this.table = document.createElement('table')
    this.table.setAttribute('cellspacing', 0);

    this.styleElem = document.createElement('style')
    this.styleRules = {}

    this.el.appendChild(this.styleElem)

    this.rows = []
    this.cells = []

    this.createHeader()
    this.createBody()

    this.setDefaultStyle()

    this.parseThead(this.option.thead)

    this.render()
  }

  setDefaultStyle() {
    this.table.style.tableLayout = 'fixed'
    this.table.width = '100%'
    this.table.height = '100%'

    this.table.style.height = '100%'
  }

  createHeader() {
    this.thead = this.table.createTHead()

    this.drawThead(this.option.series)
  }

  // 绘制表头
  drawThead(data) {
    let row = this.thead.insertRow(0)
    this.rows.push(row)

    if (Array.isArray(data)) {
      data.map((item, index) => {
        return this.insertCell(index, row, item.name, data)
      })
    }
  }

  createBody() {
    this.tbody = this.table.createTBody()
    this.drawTbody(this.option.series)
  }

  // 渲染数据
  drawTbody(data) {
    if (!data || Array.isArray(data) && data.length === 0) { return }

    if (!data[0].data) {
      return
    }
    data[0].data.forEach((td, i) => {
      let row = this.tbody.insertRow(i)

      data.map((item, index) => {
        return this.insertCell(index, row, item.data[i], data)
      })

      this.rows.push(row)
    })
  }

  parseThead(style) {
    if (style.show) {
      this.thead.removeAttribute('hidden')
    } else {
      this.thead.setAttribute('hidden', true)
    }

    if (style.textAlign) {
      this.thead.style.textAlign = style.textAlign
    }

    if ('font' in style) {
      let font = style.font
      // 字体大小
      this.thead.style.fontSize = font.size + 'px'

      // 字体加粗
      this.thead.style.fontWeight = font.bold ? 'bold' : 'normal'

      this.thead.style.color = font.color
    }

    // 背景色
    if (style.backgroundColor) {
      this.thead.style.backgroundColor = style.backgroundColor
    }
  }

  insertCell(col, row, text) {
    let cell = row.insertCell(col)

    cell.innerHTML = text

    this.cells.push(cell)

    return cell
  }

  redraw() {
    this.cols = []
    this.rows = []
    this.thead.innerHTML = ''
    this.tbody.innerHTML = ''

    this.drawThead(this.option.series)
    this.drawTbody(this.option.series)
    this.parseTbody(this.style.get('tbody'))
    this.parseBorder(this.style.get('border'))
  }

  render() {
    this.el.appendChild(this.table)

    let width = $(this.el).css('width').replace(/px/, '')
    let height = $(this.el).css('height').replace(/px/, '')
    let rect = {
      width: width,
      height: height
    }
    this.resize(rect)
  }

  // 设置 border 样式
  parseBorder(style) {
    let { outer, inner } = style || this.option.border

    if (inner) {
      let rows = []

      if (this.option.thead.show) {
        rows = this.rows
      } else {
        rows = this.rows.slice(1)
      }

      rows.forEach((row, i) => {
        let cells = row.cells

        Array.prototype.forEach.call(cells, (cell, j) => {
          cell.style.border = `${inner.width}px ${inner.style} ${inner.color}`

          if (i === 0) {
            cell.style.borderTop = 0
          }

          // 去掉最后一行的下边框
          if (i === rows.length - 1) {
            cell.style.borderBottom = 0
          }

          // 去掉第一列的左边框
          if (j === 0) {
            cell.style.borderLeft = 0
          }

          // 去掉最后一列的右边框
          if (j === cells.length - 1) {
            cell.style.borderRight = 0
          }
        })
      })
    }

    if (outer) {
      this.table.style.border = `${outer.width}px ${outer.style} ${outer.color}`
    }
  }

  // parseTable(style) {
  //   if (style.textAlign) {
  //     this.table.style.textAlign = style.textAlign
  //   }
  // }

  parseTbody(style) {
    if (style.textAlign) {
      this.tbody.style.textAlign = style.textAlign
    }

    if ('font' in style) {
      let font = style.font
      // 字体大小
      this.tbody.style.fontSize = font.size + 'px'

      // 字体加粗
      this.tbody.style.fontWeight = font.bold ? 'bold' : 'normal'

      this.tbody.style.color = font.color
    }

    // 去掉表头行
    let rows = this.rows.slice(1)

    if (style) {
      rows.forEach((row, i) => {
        if (i % 2) {
          row.style.backgroundColor = style.evenBackgroundColor
        } else {
          row.style.backgroundColor = style.oddBackgroundColor
        }
      })
    }
  }

  resize(opts = {}) {
    if (!opts.width || !opts.height) {
      return
    }

    let borderSize = 0
    if (this.style.get('border') && this.style.get('border').outer) {
      borderSize = this.style.get('border').outer.width
    }

    let height = Math.floor(( opts.height - borderSize * 2) / this.rows.length)

    let width = Math.floor(( opts.width - borderSize * 2) / this.option.series.length)

    let css = {
      overflow: 'hidden',
      'white-space': 'nowrap',
      'text-overflow': 'ellipsis',
      padding: tbodyDefaultStyle.padding,
      'min-width': `${width}px`,
      'min-height': `${height}px`
    }

    let theadStyle = {
      height: `${height}px`
    }

    function object2css(obj) {
      let ary = []
      for (let rule in obj) {
        ary.push(`${rule}: ${obj[rule]};`)
      }
      return ary.join('')
    }

    // `` 不要换行，否则 ie 下会添加 br 标签，造成样式无法被理解
    this.styleElem.innerText = `#${this.id} td { ${object2css(css)} }
      #${this.id} thead td { ${object2css(theadStyle)} }`

    this.width = opts.width
    this.height = opts.height
  }

  // setTableStyle(tableStyle) {
  //   this.parseTable(tableStyle)
  // }

  setBorderStyle(borderStyle) {
    this.parseBorder(borderStyle)
  }

  setTheadStyle(theadStyle) {
    this.parseThead(theadStyle)
  }

  setTbodyStyle(tbodyStyle) {
    this.parseTbody(tbodyStyle)
  }

  /**
   * public
   */
  setData(option) {
    if (option && option.series) {
      this.option.series = option.series
    }

    this.redraw()

    this.resize({
      width: this.width,
      height: this.height
    })
  }
}

export default Table
