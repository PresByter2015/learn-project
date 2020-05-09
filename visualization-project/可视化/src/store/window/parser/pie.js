import Parser from './parser'

export default function Pie(option, type, data) {
  if (type === 'series') {
    let sendData = parseSeries(option.series, data)
    if (sendData.series) {
      Object.assign(option.series, sendData.series)
    }
    if (sendData.color) {
      Object.assign(option.color, sendData.color)
    }
  }

  if (type === 'legend') {
    option.legend = Parser.legend(option[type], data)
  }

  return option
}

function parseSeries(originData, data) {
  if (data.radius) {  //基本配置栏目
    return parseRadius(originData, data)
  } else if (data.color) { //基本配置下面的颜色区域
    return parseColor(data)
  }  else { //值标签栏目
    return parseLabel(originData, data)
  }

}


function parseLabel(originData, data) {
  let series = []
  let { label = {} } = data
  let { labelLine = {} } = data

  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    Object.assign(item.label, label)
    Object.assign(item.labelLine, labelLine)
    series.push(item)
  }
  return { series }
}

function parseRadius(originData, data) {
  let series = []
  let { radius = ['20%', '35%'] } = data
  let { center = ['35%', '50%'] } = data
  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    // 解析 data 字段
    Object.assign(item.radius, radius)
    Object.assign(item.center, center)
    series.push(item)
  }
  return { series }
}

function parseColor(data) {

  let color = data.color

  return { color }
}
