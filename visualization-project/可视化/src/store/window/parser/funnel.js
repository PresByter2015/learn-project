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
  if (data.color) {  //基本配置栏目
    return parseColor(originData, data)
  }  else if (data.label) { //值标签栏目
    return parseLabel(originData, data)
  } else {
    return parseMain(originData, data)
  }

}

function parseMain(originData, data) {
  let series = []
  data.minSize = data.minSize + '%'
  data.maxSize = data.maxSize + '%'
  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    Object.assign(item, data)
    series.push(item)
  }
  return { series }
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

function parseColor(originData, data) {
  let { color } = data
  let series = {}
  series.data = originData[0].data.map( (item, index) => {
    let itemStyle = { normal: {} }
    itemStyle.normal.color = color[index % (color.length)]
    if (item) {
      item.itemStyle = itemStyle
    }
    return item
  })

  Object.assign(originData[0], series)

  return { color, series: originData[0] }
}
