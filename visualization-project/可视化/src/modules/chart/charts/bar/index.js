import Echarts from '../echarts'
import rankHandler from './rank-handler'
import barLineHander from './bar-line-handler'
import { wave } from '../../animation/calcExtent'
import { dealGradientSeries } from '../dealGradientSeries'
import _ from 'lodash'

class Bar extends Echarts {
  constructor(option, el, theme) {
    super(option, el, theme)

    this.style.set('series', {})

    let arr = null

    // 柱状折线图
    if (theme === 'barLine') {
      this.initBarLine()
      arr = this.option.series.map( (item) => {
        return item.data
      })
    }

    // 排名图 
    if (theme === 'rank') {
      this.initRank()
      arr = this.option.series.map( (item) => {
        let ary = item.data.map( (child) => {
          return child.value
        })
        return ary
      })
    }
    
    if (theme === 'basic') {
      arr = this.option.series.map( (item) => {
        return item.data
      })
    }

    this._animate = wave()
    this._timer = null
    this._pureData = arr
  }

  // 初始化柱状折线图
  initBarLine() {
    this.style.set('series_line_symbol', 'circle')
    this.style.set('series_line_yAxisIndex', 1)
    this.mixin(barLineHander)
  }

  /**
   * 处理排名图
   */
  initRank() {
    this.mixin(rankHandler)
  }

  // for barLine
  calcLineMode(lineMode) {
    /**
     * straight: 直线
     * curve: 曲线
     * ladder: 阶梯线
     */
    let modeObject = {
      'straight': () => { return { smooth: false, step: false } },
      'curve': () => { return { smooth: 0.3, step: false } },
      'ladder': () => { return { smooth: false, step: true } }
    }

    return modeObject[lineMode]()
  }

  startAnimation() {
    this._timer = setInterval( () => {
      let arr = this._pureData
      arr = this._animate(arr)
      this.option.series = this && this.option && this.option.series && 
      this.option.series.map( (item, i) => {
        item.data = arr[i]
        return item
      })
      this.flush()
    }, 3100)
  }

  //for rank 
  setYAxisData(partial, entire) {

    if (Array.isArray(partial)) {
      for (let i = 0, len = partial.length; i < len; i++) {
        if (entire[i]) {
          entire[i].data = partial[i].data
        }
      }
    } else {
      entire.data = partial.data
    }

    return entire
  }

  setAnimationStyle(animationSwitch) {
    if (animationSwitch) {
      this.startAnimation()
    } else {
      clearInterval(this._timer)
      this._timer = null
      this.setSeriesData(this._pureData)
    }
  }

  setSeriesStyle(seriesStyle) {
    this.option.series = dealSeriesColor(seriesStyle, this.option.series, this.option.color)
  }

  setSeriesData(partial) {
    let series = []
    if (Array.isArray(partial) && partial.length) {
      let seriesStyle = this.style.get('series')

      this._pureData = partial.map( (item) => {
        return item.data ? item.data : item
      })

      series = dealSeriesColor(seriesStyle, partial, this.option.color)
    }

    return series
  }

  setSeriesBarWidthStyle(value, seriesStyle) {
    seriesStyle.barWidth = value
  }
}

export default Bar

/*
 * 处理系列颜色(单色与渐变)
 * */
function dealSeriesColor(seriesStyle, optionSeries, optionColor) {
  //从gradient上取数据,并弃置gradient
  let _seriesStyle = _.merge({}, seriesStyle)
  let _seriesStyleColor = _.merge({}, _seriesStyle.gradient)
  _seriesStyle.gradient = null

  if (_seriesStyleColor && _seriesStyleColor.type) {
    if (_seriesStyleColor.type === 'single') {
      //单色
      _seriesStyle.itemStyle = null
      optionSeries.map((item) => {
        Object.assign(item, seriesStyle)
        item.gradient = null //避免合并时又合回去(notMerge为false时)
        item.itemStyle = null
      })
    } else {
      dealGradientSeries(optionSeries, seriesStyle, optionColor)
    }
  }

  return optionSeries
}
