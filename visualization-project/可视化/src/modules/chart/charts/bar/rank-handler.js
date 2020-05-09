import { deepCopy } from 'utils/serialize'
import { dealGradientSeries } from '../dealGradientSeries'


export default {
  setSeriesData: function(partial) {
    let result = this.handleSeries(this.style.get('series'), partial, this.option)
    this._pureData = result && result.map( (item) => {
      let ary = item && item.data && item.data.map( (child) => {
        return child.value ? child.value : child
      })
      return ary
    })

    return result
  },

  setSeriesStyle(seriesStyle) {
    this.handleSeries(seriesStyle, this.option.series, this.option)
  },

  afterSetColorStyle() {
    let seriesStyle = this.style.get('series')
    this.handleSeries(seriesStyle, this.option.series, this.option)
  },

  // 解析 series
  handleSeries(config, series, option) {
    // 从 style 上取到正确的颜色
    config.color = this.style.get('color')

    // 判断 series 的正确性
    if (Array.isArray(series) && series.length) {

      let _gradient = config.gradient
      if (_gradient && _gradient.type) {
        if (_gradient.type === 'single') {

          //单色
          if (series.length === 1) {
            // 只有 1 项的 series, 可以配置每一项的颜色
            series = this.handleOneSeries(series, config, option)
          } else {
            series = this.handleManySeries(series, config, option)
          }

        } else {
          //渐变
          series = this.handleGradientSeries(series, config, option)
        }
      }
    }

    return series
  },

  setAnimationStyle(animationSwitch) {
    if (animationSwitch) {
      this.startAnimation()
    } else {
      clearInterval(this._timer)
      this._timer = null
      //this.setSeriesData(this._pureData)
    }
  },

  startAnimation() {
    this._timer = setInterval( () => {
      let arr = this._pureData
      arr = this._animate(arr)
      this.option.series = this && this.option && this.option.series && 
      this.option.series.map( (item, i) => {
        let subArr = arr[i]
        item.data = item && item.data && item.data.map( (child, index) => {
          let obj = { value: subArr[index] }
          return Object.assign(child, obj)
        })
        return item
      })
      this.flush()
    }, 3100)
  },

  // 处理一项值的 series
  handleOneSeries(series, config) {
    return series.map((item) => {
      Object.assign(item, config)
      delete item.color
      item.gradient = null //避免合并时又合回去(notMerge为false时)
      item.itemStyle = null


      item.data = item && item.data && item.data.map((item, i) => {
        if (typeof item !== 'object') {
          item = {
            value: item
          }
        }

        item = deepCopy(item)
        if (config.color) {
          if (config.color[i]) {
            this.setSeriesItemColor(item, config.color[i])
          } else {
            this.setSeriesItemColor(item, config.color[config.color.length - 1])
          }
        }
        return item
      })

      return item
    })
  },

  // 处理多项值的 series
  handleManySeries: function(series, config) {
    return series.map((item, i) => {
      Object.assign(item, config)
      delete item.color
      item.gradient = null //避免合并时又合回去(notMerge为false时)

      // 去掉
      item.data = item.data.map(a => {
        delete a.itemStyle
        return a
      })

      // 设置颜色
      if (config.color) {
        if (config.color[i]) {
          let itemStyle = item.itemStyle || { normal: {} }
          let normal = itemStyle.normal
          normal.color = config.color[i]
          item.itemStyle = itemStyle
        }
      }

      return deepCopy(item)
    })
  },

  // 处理为渐变色的 series
  handleGradientSeries(series, config, option) {
    //处理渐变色
    dealGradientSeries(series, config, option.color)

    return series.map((item) => {
      // 去掉
      item.data = item.data.map(a => {
        delete a.itemStyle
        return a
      })

      return deepCopy(item)
    })
  }
}
