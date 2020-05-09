import Parser from './parser'

/**
 * 解析柱状图
 */
export default function Bar(option, type, data) {
  if (type === 'legend') {
    option.legend = Parser.legend(option[type], data)
  }

  if (type === 'series') {
    let sendData = parseSeries(option.series, data)
    if (sendData.series) {
      Object.assign(option.series, sendData.series)
    }
    if (sendData.color) {
      Object.assign(option.color, sendData.color)
    }
  }

  if (type === 'xAxis') {
    option.xAxis = Parser.xAxis(option.xAxis, data, option)
  }

  if (type === 'leftYAxis') {
    option.yAxis[0] = Parser.yAxis(option.yAxis[0], data, option)
  }
  return option
}

function parseSeries(originData, data) {
  if (data.color) {
    return parseColor(originData, data)
  } else {
    return parseLabel(originData, data)
  }
}


function parseLabel(originData, data) {
  let series = []
  let { position } = data.label.normal
  let { formatter } = data.label.normal
  let { barWidth } = originData[0]
  let { fontSize } = data.label.normal.textStyle
  let obj = { formatter }

  if (position === 'outside') {
    let offset = `${((barWidth - fontSize) / (2 * barWidth)) * 100}%`
    obj.position = ['100%', offset]
  } else {
    obj.position = 'insideRight'
  }

  Object.assign(data.label.normal, obj)

  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    Object.assign(item.label, data.label)
    series.push(item)
  }
  return { series }
}

function parseColor(originData, data) {
  let series = []
  let color = data.color
  delete data.color
  let { stack, barWidth } = data
  let position = Array.isArray(originData[0].label.normal.position)
  let { fontSize } = originData[0].label.normal.textStyle
  if (originData.length < 2) {
    for (let i = 0, len = originData.length; i < len; i++) {
      let item = originData[i]
      item.stack = stack
      if (item.itemStyle) {
        delete item.itemStyle
      }
      item.data = item.data.map( (subItem, index) => {
        let itemStyle = { normal: {} }
        if (subItem.itemStyle && subItem.itemStyle.normal) {
          subItem.itemStyle.normal.color = color[(index % 10)]
        } else {
          itemStyle.normal.color = color[(index % 10)]
          subItem.itemStyle = itemStyle
        }
        return subItem
      })
      if (position) {
        item.label.normal.position[1] = `${((barWidth - fontSize) / (2 * barWidth)) * 100}%`
      }
      item.barWidth = barWidth
      series.push(item)
    }
  } else {
    for (let i = 0, len = originData.length; i < len; i++) {
      let item = originData[i]
      item.stack = stack
      let itemStyle = { normal: {} }
      if (!item.itemStyle) {
        item.itemStyle = itemStyle
      }
      itemStyle.normal.color = color[(i % 10)]
      item.data = item.data.map( (subItem) => {
        if (subItem.itemStyle) {
          delete subItem.itemStyle
        }
        return subItem
      })
      if (position) {
        item.label.normal.position[1] = `${((barWidth - fontSize) / (2 * barWidth)) * 100}%`
      }
      item.barWidth = barWidth
      series.push(item)
    }
  }

  return { series, color }
}
