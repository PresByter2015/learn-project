import Chart from '../chart'
import $ from 'jquery'

/**
 * 应用卡片
 */

let defaultCardId = 1024;

class Card extends Chart {
  constructor() {
    super(...arguments);

    this.id = this.el.id = `_chart-card-${defaultCardId++}`;
    this.width = $(this.el).width();
    this.height = $(this.el).height();

    this.table = null;
    this.rows = [];
    this.cells = [];

    this.createTable();
  }

  createTable() {
    let tableBorder = this.option.border.outer;
    this.table = document.createElement('table');
    this.el.appendChild(this.table);
    this.table.cellSpacing = 0;
    this.table.cellPadding = 0;
    this.table.border = 0;
    this.table.width = '100%';
    this.table.style.tableLayout = 'fixed';
    this.table.style.height = '100%';
    this.table.style.border = `${tableBorder.width}px ${tableBorder.style} ${tableBorder.color}`;
    this.createTableBody();
  }

  createTableBody(data = this.option.series) {
    let cellBorder = this.option.border.inner;

    if (!data || Array.isArray(data) && !data.length || !data[0].data) {
      return
    }

    let columnN = data.length;
    let rowN = data[0].data.length;

    for (let i = 0; i < rowN; i++) {
      let row = this.table.insertRow(i);
      this.rows.push(row);
      for (let j = 0; j < columnN; j++) {
        let cell = row.insertCell(j);
        cell.innerHTML = data[j].data[i] || '';
        cell.style.border = `${cellBorder.width}px ${cellBorder.style} ${cellBorder.color}`;
        cell.style.textAlign = !j ? this.option.card.keyAlign : this.option.card.valueAlign;
        cell.style.width = '50%';
        cell.style.overflow = 'hidden';
        cell.style.whiteSpace = 'nowrap';
        cell.style.textOverflow = 'ellipsis';

        this.cells.push(cell);
      }
    }
  }

  redraw(option) {
    this.cols = [];
    this.rows = [];
    this.table.innerHTML = '';

    this.createTableBody(option);
    this.parseCard();
    this.parseBorder();
  }

  parseCard(cardStyle = this.style.get('card')) {
    this.cells.forEach((cell, i) => {
      // Key对齐方式 and 值对其方式
      cell.style.textAlign = !(i % 2) ? cardStyle.keyAlign : cardStyle.valueAlign;
    });

    // 字体
    this.table.style.fontSize = `${cardStyle.font.size}px`;
    this.table.style.color = cardStyle.font.color;

    // 奇数行 and 偶数行
    this.rows.forEach((row, i) => {
      row.style.backgroundColor = !(i % 2) ? cardStyle.evenBackgroundColor : cardStyle.oddBackgroundColor;
    });
  }

  parseBorder(borderStyle = this.style.get('border')) {
    if (!borderStyle) {
      return false;
    }

    // 外边框
    let tableBorder = borderStyle.outer;
    if (tableBorder) {
      this.table.style.border = `${tableBorder.width}px ${tableBorder.style} ${tableBorder.color}`;
    }

    // 内边框
    let cellBorder = borderStyle.inner;
    if (cellBorder) {
      let cellBorderStyle = `${cellBorder.width}px ${cellBorder.style} ${cellBorder.color}`
      this.cells.forEach((cell, i) => {
        cell.style.borderBottom = i + 2 >= this.cells.length ? 'none' : cellBorderStyle;
        cell.style.borderRight = !(i % 2) ? cellBorderStyle : 'none';
      })
    }
  }

  /**
   * 图形配置
   */
  setCardStyle(cardStyle) {
    this.parseCard(cardStyle)
  }

  setBorderStyle(borderStyle) {
    this.parseBorder(borderStyle)
  }

  /**
   * 数据配置
   */
  setData(option) {
    if (!option) {
      return false;
    }
    let series = [
      { data: option.key },
      { data: option.value }
    ];
    this.redraw(series);
  }
}

export default Card
