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
    if (sendData.series) {
      Object.assign(option.series, sendData.series)
    }
    if (sendData.color) {
      let { color , index } = sendData
      option.color[index] = color[0]
    }
    if (sendData.legend) {
      Object.assign(option.legend, sendData.legend)
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

function parseSeries(originData, data, option) {
  if (!data.color) {
    return parseCommonData(originData, data, option)
  } else {
    return parseColor(data)
  }
}

function parseCommonData(originData, data, option) {
  let series = []
  let { legend = { data: [] } } = option
  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    let legendItem = legend.data[i]
    let { symbol } = data[`data${i}`]
    item.symbol = symbol
    legendItem.icon = symbol
    series.push(item)
  }

  return { series, legend }

}


function parseColor(data) {
  let key = Object.keys(data.color)[0]
  let color = data.color[key]
  let arr = key.split('.')
  let prefix = 'data'
  let leng = prefix.length //avoid lock. you can change the prefix to edit
  let index = parseInt(arr[0].substr(leng)) //because of echarts series is binding the color, we change color is enough

  return { color, index }
}
