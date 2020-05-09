export default {
  /**
   * 图例组件
   * 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
   */
  legend(originData, data) {

    let { position } = data
    delete data.position
    Object.assign(originData, data)
    if (position === 'top') {
      originData.top = 'top'
      originData.left = 'right'
      originData.orient = 'horizontal'
    } else if (position === 'bottom') {
      originData.top = 'bottom'
      originData.left = 'right'
      originData.orient = 'horizontal'
    } else if (position === 'left') {
      originData.left = 'left'
      originData.top = 'middle'
      originData.orient = 'vertical'
    } else {
      originData.top = 'middle'
      originData.left = 'right'
      originData.orient = 'vertical'
    }

    return originData
  },

  /**
   * 每个图形都有不同的解析，这个是默认的
   */
  series(originData, data) {
    let series = []
    let color = data.color
    delete data.color
    let opacity = data.areaStyle['normal.opacity']
    delete data.areaStyle['normal.opacity']
    for (let i = 0, len = originData.length; i < len; i++) {
      let item = Object.assign({}, originData[i], data)
      if (color) {
        let areaStyle = { normal: { color: color[i] } }
        item.lineStyle = item.lineStyle || {}
        if (data.areaStyle.normal) {
          areaStyle.normal.opacity = opacity
        } else {
          areaStyle.normal.opacity = 0
        }
        item.areaStyle = areaStyle
        item.lineStyle.normal = item.lineStyle.normal || {}
        item.lineStyle.normal.color = color[i]
      }
      series.push(item)
    }

    return series
  },

  xAxis(originData, data) {
    let { show } = data.splitLine
    let splitLine = { show, lineStyle: { color: '#236592' } }
    data.splitLine = splitLine
    data.axisLine = parseCommonData(data.axisLine, 'lineStyle')
    data.axisLabel = parseLabel(data.axisLabel)
    let showAxis = data.axisLine.show
    let gapDiff = data.axisLabel.margin - originData.axisLabel.margin

    if (!showAxis) {
      if (originData.nameTextStyle) {
        originData.nameTextStyle.color = 'rgba(255,255,255,0)'
      }
    } else {
      if (originData.nameTextStyle) {
        originData.nameTextStyle.color = 'rgba(255,255,255,1)'
      }
    }

    originData.nameGap += gapDiff
    return Object.assign({}, originData, data)
  },

  yAxis(originData, data) {
    let { show } = data.splitLine
    let splitLine = { show, lineStyle: { color: '#236592' } }
    data.splitLine = splitLine
    data.axisLine = parseCommonData(data.axisLine)
    data.axisLabel = parseLabel(data.axisLabel)
    data.interval = Number(data.interval)
    let showAxis = data.axisLine.show
    let gapDiff = data.axisLabel.margin - originData.axisLabel.margin
    if (!showAxis) {
      if (originData.nameTextStyle) {
        originData.nameTextStyle.color = 'rgba(255,255,255,0)'
      }
    } else {
      if (originData.nameTextStyle) {
        originData.nameTextStyle.color = 'rgba(255,255,255,1)'
      }
    }
    originData.nameGap += gapDiff

    return Object.assign({}, originData, data)
  }
}


function parseCommonData(data) {
  let obj = {}
  let lineStyle = {}
  for (let key in data) {
    if (key.includes('lineStyle')) {
      let pair = key.split('.')
      lineStyle[pair[pair.length - 1]] = data[key]
    } else {
      obj[key] = data[key]
    }
  }
  obj.lineStyle = lineStyle
  return obj
}

function parseLabel(data) {
  let obj = {}
  let textStyle = {}
  for (let key in data) {
    if (key.includes('textStyle')) {
      let pair = key.split('.')
      textStyle[pair[pair.length - 1]] = data[key]
    } else {
      obj[key] = data[key]
    }
  }
  obj.textStyle = textStyle
  return obj
}
