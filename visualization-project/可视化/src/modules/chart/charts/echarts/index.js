import { isPlainObject } from 'utils'

import echarts from 'modules/echarts'
import Chart from '../chart'

import setColorStyle from './set-color-style'
import setGridStyle from './set-grid-style'
import setLegendStyle from './set-legend-style'
import setYAxisStyle from './set-yAxis-style'
import setXAxisStyle from './set-xAxis-style'
import setYAxisRightStyle from './set-xAxis-right-style'
import setSeriesStyle from './set-series-style'

import setLegendData from './set-legend-data'
import setXAxisData from './set-xAxis-data'
import setSeriesData from './set-series-data'

/**
 * Echarts
 */
class Echarts extends Chart {
  constructor(option, el) {
    super(...arguments)

    this.chart = echarts.init(el)

    if (option) {
      this.chart.setOption(option)
    }
  }

  setOption(option, notMerge) {

    //以下代码用于解决演示大屏报错的问题，以后要删掉
    if (option && option.series && option.series.length) {
      let item = option.series[0]
      if (item) {
        let { type } = item
        if (type) {
          if (type !== 'bar' || type !== 'line') {
            delete option.animationEasing
            delete option.animationDelayUpdate
          }
        }
      }
    }

    //


    //以下代码用于解决饼图/漏斗图未知的错误

    if (option && option.series && option.series.length) {
      let item = option.series[0]
      if (item) {
        let { type } = item
        if (type && ( type === 'line' || type === 'bar')) {
          option.animationEasing =  'elasticOut',
          option.animationDelayUpdate = function (idx) {
            return idx * 5;
          }
        }
      }
    }

    this.option = option
    this.chart.setOption(option, notMerge)
  }

  resize({ width, height }) {
    let chartWidth = width
    let chartHeight = height

    this.el.style.width = chartWidth + 'px'
    this.el.style.height = chartHeight + 'px'

    this.chart.resize()
  }

  parseGauge(option) {
    let { precise } = option.series[0].axisLabel
    option.series[0].axisLabel.formatter = eval('(function (value) {return value.toFixed(' + precise + ')})')
    option.series[0].detail.formatter = eval('(function (value) {return value.toFixed(' + precise + ')})')
    return option
  }

  setSeriesItemColor(item, color) {
    item.itemStyle = item.itemStyle || { normal: {} }
    item.itemStyle.normal = item.itemStyle.normal || { }
    item.itemStyle.normal.color = color
  }

  setOptionColor(color) {
    if (isPlainObject(color)) {
      color = Object.values(color)
    }

    if (color && this.option.color) {
      color.forEach((item, i) => {
        this.option.color[i] = item
      })
    }
  }


  /**
   * 解析系列中的某一项
   */
  /*
  parseSeriesItemColorStyle(item, seriesStyle, i) {
    if (seriesStyle.color) {
      this.setSeriesItemColor(item, seriesStyle.color[i])
    }

    return item
  }
  */
}

Echarts.prototype.setColorStyle = setColorStyle
Echarts.prototype.setGridStyle = setGridStyle
Echarts.prototype.setLegendStyle = setLegendStyle
Echarts.prototype.setXAxisStyle = setXAxisStyle
Echarts.prototype.setYAxisStyle = setYAxisStyle
Echarts.prototype.setYAxisRightStyle = setYAxisRightStyle
Echarts.prototype.setSeriesStyle = setSeriesStyle

Echarts.prototype.setLegendData = setLegendData
Echarts.prototype.setXAxisData = setXAxisData
Echarts.prototype.setSeriesData = setSeriesData

export default Echarts
