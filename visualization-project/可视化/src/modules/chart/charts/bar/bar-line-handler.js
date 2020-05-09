export default {
  /*
  style: {
    series: {
      line: {
        symbol: 'circle'
      },
      bar: {}
    }
  },
  */
  setSeriesStyle(seriesStyle) {
    this.seriesStyleDataMerge(seriesStyle, this.option.series)

    // 更新 option.color 的颜色值，为了保证折线上的点使用正确的颜色
    this.setOptionColor(seriesStyle.line.color)
  },

  setAnimationStyle(animationSwitch) {
    if (animationSwitch) {
      this.startAnimation()
    } else {
      clearInterval(this._timer)
      this._timer = null
      this.setSeriesData(this._pureData, this.option.series)
    }
  },
  
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
  },

  seriesStyleDataMerge(style, data) {
    let lines = data.filter(item => item.type === 'line')
    let bars = data.filter(item => item.type === 'bar')

    lines = lines.map((item,i) => lineHandler(style.line, item, i))
    bars = bars.map((item, i) => barHandler(style.bar, item, i))

    return lines.concat(bars)
  },

  setSeriesData: function(partial, entire) {
    if (Array.isArray(partial) && partial.length > 0) {
      this._pureData = partial.map( (item) => {
        return Array.isArray(item) ? item : item.data
      })
      entire = partial.map(item => { return item })

      let seriesStyle = this.style.get('series')
      entire = this.seriesStyleDataMerge(seriesStyle, entire)
    }

    return entire
  }
}

/**
 * 柱状处理器
 */
function barHandler(config, item, index) {
  let { color } = config
  let itemStyle = { normal: { color: color[index] || color[0] } }
  item.itemStyle = itemStyle
  Object.assign(item, config)
  delete item.color
  return item
}

/**
 * 折线处理器
 */
function lineHandler(config, line, index) {
  const handlers = {
    lineMode: modeHandler,
    color: colorHandler,
    areaStyle: areaStyle
  }

  for (let key in config) {
    if (handlers.hasOwnProperty(key)) {
      let handler = handlers[key]

      Object.assign(line, handler(config[key], index))
    } else {
      Object.assign(line, { [key]: config[key] })
    }
  }

  return line
}

/**
 * 解析 areaStyle
 */
function areaStyle(data) {
  let normal = {}
  let { opacity, show } = data

  if (show) {
    normal.opacity = opacity > 1 ? opacity / 100 : opacity
  } else {
    normal.opacity = 0
  }

  return { areaStyle: { normal } }
}

/**
 * 颜色处理器
 */
function colorHandler(color, index) {
  return {
    lineStyle: {
      normal: {
        color: color[index] || color[0]
      }
    }
  }
}

/**
 * 解析 line mode 折线展示样式
 */
function modeHandler(mode) {
  let modeObject = {
    'curve': () => { return { smooth: 0.4, step: false } },
    'straight': () => { return { smooth: false, step: false } },
    'ladder': () => { return { smooth: false, step: true } }
  }

  return modeObject[mode]()
}
