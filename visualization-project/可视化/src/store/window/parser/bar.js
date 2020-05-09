import Parser from './parser'
/**
 * 解析柱状图
 */
export default function Bar(option, type, data) {
  if (type === 'legend') {
    option.legend = Parser.legend(option[type], data)
  }

  if (type === 'series') {
    let sendData = parseSeries(option.series, data, option)
    if (sendData.color) {
      Object.assign(option.color, sendData.color)
    }
    if (sendData.series) {
      Object.assign(option.series, sendData.series)
    }

  }

  if (type === 'xAxis') {
    option.xAxis = Parser.xAxis(option.xAxis, data, option)
  }

  if (type === 'leftYAxis') {
    option.yAxis[0] = Parser.yAxis(option.yAxis[0], data, option)
  }

  if (type === 'rightYAxis') {
    option.yAxis[1] = Parser.yAxis(option.yAxis[1], data, option)
  }

  return option
}

function parseSeries(originData, data) {
  if (data.color) {
    return parseColor(originData, data)
  } else {
    return parseCommonData(originData, data)
  }
}

function parseColor(originData, data) {
  let { color } = data
  // originData = originData.map( (item, index) => {
  //   item.itemStyle = { normal: {} }
  //   item.itemStyle.normal.color = color[index % (color.length)]
  //   return item
  // })
  //
  // return { color, series: originData }
  return { color }
}

function parseCommonData(originData, data) {
  let series = []
  let { stack = null, barWidth } = data

  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    item.stack = stack
    item.barWidth = barWidth

    series.push(item)
  }

  return { series }
}
