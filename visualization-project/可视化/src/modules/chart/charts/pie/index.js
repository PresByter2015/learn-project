import Echarts from '../echarts'

export default class extends Echarts {
  constructor() {
    super(...arguments)
  }

  parseSeriesItemStyle(item, seriesStyle) {
    let center = this.addUnit(seriesStyle.center, '%')
    let radius = this.addUnit(seriesStyle.radius, '%')

    return {
      center,
      radius
    }
  }

  setSeriesData(data) {
    if (Array.isArray(data) && data[0]) {
      let { series } = this.option
      this.option.series = data.map( (item,i) => {
        if (series[i]) {
          return Object.assign({}, series[i], data[i])
        } else {
          return Object.assign({}, series[0], data[i])
        }
      })
    }
    return this.option.series
  }

  /**
   * 添加单位
   */
  addUnit(str, unit = '') {
    if (Array.isArray(str)) {
      return str.map(item => unitParser(item))
    }

    if (typeof str === 'object') {
      return Object.values(str).map(item => unitParser(item))
    }

    return str

    function unitParser(item) {
      if (('' + item).lastIndexOf('%') > -1) {
        return item
      }
      return item + unit
    }
  }
}
/*
  resize({ width, height }) {
    let fontSize;
    let chartWidth = width;
    let chartHeight = height;

    if (chartWidth && chartHeight) {
      let zoom = util.calculateZoom(width, height, util.WIDTH_THRESHOLD, util.HEIGHT_THRESHOLD);

      if (zoom < 1) {
        let scale = util.getScale(zoom, util.FONT_ZOOM_DOWN_STEP);
        let exceptWidth = width / scale;
        let exceptHeight = height / scale;

        chartWidth = exceptWidth;
        chartHeight = exceptHeight;

        let offsetX = (width - exceptWidth) / 2 / scale;
        let offsetY = (height - exceptHeight) / 2 / scale;
        this.el.style.transform = 'scale(' + scale + ') translate(' + offsetX + 'px, ' + offsetY + 'px)';
        fontSize = 12; //系数
      } else {
        fontSize = 12 * util.getScale(zoom, util.FONT_ZOOM_UP_STEP);
        this.el.style.transform = 'scale(1) translate(0, 0)';
      }

      this.el.style.width = chartWidth + 'px';
      this.el.style.height = chartHeight + 'px';

      this.chart.resize();

      let option = this.option;

      $.extend(true, option, {
        textStyle: {
          fontSize: fontSize
        },
        tooltip: {
          textStyle: {
            fontSize: fontSize
          }
        },
        legend: {
          padding: [0, 20 * util.getScale(zoom, util.PIE_LEGEND_RIGHT_STEP), 0, 0]
        }
      });
      this.chart.setOption(option);
    } else {
      this.chart.resize();
    }
  }
  */

