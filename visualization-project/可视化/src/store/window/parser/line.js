import Parser from './parser'

export default function line(option, type, data) {
  if (type === 'series') {
    let sendData =  ParseSeries(option[type], data)
    if (sendData.color) {
      Object.assign(option.color, sendData.color)
    }
    if (sendData.series) {
      Object.assign(option.series, sendData.series)
    }
  }

  if (type === 'legend') {
    option.legend = Parser.legend(option[type], data)
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

function ParseSeries(originData, data) {

  if (data.color) {
    return parseColor(data)
  } else {
    return parseCommonData(originData, data)
  }
}

function parseColor(data) {

  let { color } = data

  return { color }

}

function parseCommonData(originData, data) {

  let series = []
  let Mode = calcMode(data.line)
  //let { showSymbol, symbolSize } = data
  data.areaStyle = parseStyle(data.areaStyle)
  //data.itemStyle = parseStyle(data.itemStyle)
  let { show } = data.areaStyle.normal
  data.areaStyle.normal.color = null
  if (show) {
    data.areaStyle.normal.opacity /= 100
  } else {
    data.areaStyle.normal.opacity = 0
  }
  for (let i = 0, len = originData.length; i < len; i++) {
    let item = JSON.parse(JSON.stringify(originData[i]))
    Object.assign(item, data)
    Object.assign(item, Mode)
    if (!item.showSymbol) {
      item.symbolSize = 0
    }
    series.push(item)
  }

  return { series }
}

function parseStyle(data) {
  let obj = { normal: {} }
  for (let key in data) {
    let value = data[key]
    if (key.includes('normal')) {
      let pair = key.split('.')
      obj.normal[pair[pair.length - 1]] = value
    } else {
      obj[key] = value
    }
  }
  if (Object.keys(obj.normal).length === 0) {
    delete obj.normal
  }

  return obj
}

function calcMode(data) {
  let { lineMode } = data
  let Mode = { smooth: 0.4, lineMode }
  if (lineMode === 1) {
    Mode.smooth = 0.4
    Mode.step = false
  } else if (lineMode === 2) {
    Mode.smooth = false
    Mode.step = false
  } else {
    Mode.smooth = false
    Mode.step = true
  }

  return Mode
}
