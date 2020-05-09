import Echarts from '../echarts'
import { deepCopy } from 'utils/serialize'
import intl from 'src/intl'

let segement = intl.formatMessage({ id: 'segmented', defaultMessage: '分段' })

export default class Gauge extends Echarts {
  constructor() {
    super(...arguments)

    this.style.set('series_title_offsetCenter', ['0%', '0%'])
    this.style.set('series_detail_offsetCenter', ['0%', '-40%'])
    this.style.set('series_axisLine_lineStyle_width', 6)
    this.style.set('series_axisLine_lineStyle_color', [
      [0.333333, '#93EB82'],
      [0.666666, '#E2D937'],
      [1, '#EA4129']
    ])
    this.style.set('series_axisLine_lineStyle_scale',
      [
        { 
          name: `${segement}1`, 
          value: 3 
        },
        { 
          name: `${segement}2`, 
          value: 3 
        },
        { 
          name: `${segement}1`, 
          value: 3 
        }])
  }

  setSeriesData(data) {
    if (Array.isArray(data) && data.length) {
      let { series } = this.option
      this.option.series = data.map((item,i) => {
        if (series[i]) {
          return Object.assign({}, series[i], data[i])
        } else {
          return Object.assign({}, series[0], data[i])
        }
      })
    }
    return this.option.series
  }

  afterSetStyle() {
    this.setSeriesStyle()
  }

  setSeriesStyle() {
    let seriesStyle = this.parseSeriesStyle()

    this.mergeStyleData(seriesStyle, this.option.series)
  }

  parseSeriesStyle() {
    let style = this.style.get('series')
    style = deepCopy(style)
    style.radius = style.radius + '%'
    style.pointer.length = style.pointer.length + '%'
    style.detail.precise = style.axisLabel.precise
    style.title.textStyle.fontWeight =
        style.title.textStyle.fontWeight ? 'bold' : 'normal'

    style.axisLabel.formatter = eval('(function (value) {return value.toFixed(' + style.axisLabel.precise + ')})')
    style.detail.formatter = eval('(function(value) {return value.toFixed(' + style.detail.precise + ') + \'%\'})')

    if (style.axisLine && style.axisLine.lineStyle
      && style.axisLine.lineStyle.scale
      && style.axisLine.lineStyle.color
    ) {
      let { color, scale, number } = style.axisLine.lineStyle
      style.axisLine.lineStyle.color = calcLineStyleColor(scale, color, number)
    }

    return style
  }

  // 合并样式和数据
  mergeStyleData(style, data) {
    let series = data.map(item => {
      Object.assign(item, style)
      return item
    })
    this.option.series = series
    return series
  }

}

/**
 * 计算每段的结束位置和颜色
 * http://echarts.baidu.com/option.html#series-gauge.axisLine.lineStyle.color
 */
function calcLineStyleColor(scale, color, count) {
  let rets = []
  let localTotal = 0
  let total = 0
  for (let i = 0; i < count; i++) {
    total += scale[i]
  }

  for (let i = 0; i < count; i++) {
    localTotal += parseInt(scale[i]) // 单段所占总和比例
    rets.push([localTotal / total, color[i]])
  }

  if (rets.every((item) => item[0] === 0)) { // when scale is 0 : 0 : 0 ...
    rets = color.map((item) => {
      item[0] = 1
      return item
    })
  }

  return rets
}

/*
  resize({ width, height }) {
    let fontSize;
    let chartWidth = width;
    let chartHeight = height;

    if (chartWidth && chartHeight) {
      let zoom = util.calculateZoom(width, height);

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

      let option = this.option;

      $.each(option.series, function(index, serie) {
        $.extend(true, serie, {
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              width: 6 * util.getScale(zoom, util.GUAGE_AXIS_LINE_STEP)
            }
          },

          title: {
            textStyle: {
              fontSize: fontSize
            }
          },

          splitLine: {
            length: -30 * util.getScale(zoom, util.GUAGE_SPLIT_LINE_STEP)
          }
        });
      })

      $.extend(true, option, {
        textStyle: {
          fontSize: fontSize
        }
      });
      this.chart.setOption(option);
    }
    this.chart.resize()
  }
  */
