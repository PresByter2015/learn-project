import _ from 'lodash'
import Echarts from '../echarts'
import { wave } from '../../animation/calcExtent'
import echarts from 'modules/echarts'
import { parseGradientColor } from '../parseGradientColor'


class Line extends Echarts {
  constructor(el, option) {
    super(el, option)

    this.style.set('series_symbol', 'circle')
    this.style.set('yAxis_splitLine_lineStyle_color', '#236592')
    let arr = this.option.series.map( (item) => {
      return item.data
    })
    this._pureData = arr
    this._animate = wave()
    this._timer = null
  }

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
 
  setAnimationStyle(animationSwitch) {
    if (animationSwitch) {
      this.startAnimation()
    } else {
      clearInterval(this._timer)
      this._timer = null
      this.setSeriesData(this._pureData)
    }
  }

  afterSetColorStyle(color) {
    //修改颜色后处理seriesStyle
    if (color && this.option.color) {
      let seriesStyle = this.style.get('series')

      this.option.series.map((item, index) => {
        return _.merge({}, item, this.parseSeriesItemStyle(item, seriesStyle, index))
      })
    }
  }

  setSeriesData(partial) {
    let series = []
    if (Array.isArray(partial) && partial.length) {
      let seriesStyle = this.style.get('series')

      //更新数据时需要更改动画的初始数据
      this._pureData = _.merge([], partial).map( (item) => {
        return item.data ? item.data : item
      })
      
      series = partial.map((item, index) => {
        return _.merge({}, item, this.parseSeriesItemStyle(item, seriesStyle, index))
      }) 
    }

    return series
  }

  parseSeriesItemStyle(item, seriesStyle, index) {
    if (seriesStyle.gradient && seriesStyle.gradient.type) {
      if (seriesStyle.gradient.type === 'gradient') {
        //面积渐变
        let color = this.option.color
        let { colorDeep, colorShallow } = parseGradientColor(color[index], 85, 15)

        item.areaStyle = parseAreaStyleGradient(colorDeep, colorShallow, seriesStyle.areaStyle.show)
      } else {
        //面积单色
        if (seriesStyle.areaStyle) {
          item.areaStyle = item.areaStyle || { normal: {} }
          item.areaStyle.normal = item.areaStyle.normal || {}
          item.areaStyle.normal = parseAreaStyleOpacity(seriesStyle.areaStyle.opacity, seriesStyle.areaStyle.show)
        }
      }
    }

    let lineMode = this.calcLineMode(seriesStyle.lineMode)

    //去掉没用的gradient字段
    let _seriesStyle = _.merge({}, seriesStyle)
    delete _seriesStyle.gradient
    delete item.gradient

    return { ..._seriesStyle, areaStyle: item.areaStyle, ...lineMode }
  }
}

function parseAreaStyleOpacity(value, visible) {
  if (visible) {
    return {
      show: visible,
      opacity: value,
      color: null
    }
  } else {
    return {
      show: visible,
      opacity: 0,
      color: null
    }
  }
}

function parseAreaStyleGradient(colorDeep, colorShallow, visible) {
  let areaStyle = {
    normal: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: colorDeep
        },
        {
          offset: 1,
          color: colorShallow
        }
      ]),
      show: visible
    }
  }

  if (visible) {
    areaStyle.normal.opacity = 1
  } else {
    areaStyle.normal.opacity = 0
  }

  return areaStyle
}

export default Line

