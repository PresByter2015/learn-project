import Parser from './parser'

/**
 * 解析柱状图
 */
export default function Radar(option, type, data) {
  if (type === 'legend') {
    option.legend = Parser.legend(option[type], data)
  }

  if (type === 'radar') {
    data.radar = parseRadar(data.radar)
    for (let i = 0, len = option.radar.length; i < len; i++) {
      let item = option.radar[i]
      if (data.radar && typeof data.radar.show === 'boolean') {
        if (!data.radar.show) {
          data.radar.formatter = ''
        } else {
          data.radar.formatter = '{value}'
        }
        Object.assign(item.name, data.radar)
      } else {
        Object.assign(item, data.radar)
      }
    }
  }

  if (type === 'config.series') {
    data.areaStyle = areaStyleHandler(data.areaStyle)
    data.symbolSize = data.showSymbol ? data.symbolSize : 0
    let color = []
    if (data.lineType) {
      color = data.lineType.map( (item) => {
        return item.color[0]
      })
    }
    if (color.length) {
      Object.assign(option.color, color)
    }

    option[type] = data
  }

  if (type === 'series') {
    let sendData = parseSeries(option.series, data)
    if (sendData.color) {
      let { index, color = [] } = sendData
      option.color[index] = color[0]
    }
    if (sendData.series) {
      Object.assign(option.series, sendData.series)
    }
  }

  return option
}

function parseSeries(originData, data) {
  if (data.label) {
    return parseLabel(originData, data)
  } else {
    data.lineStyle = parseStyle(data.lineStyle)
    data.areaStyle = parseStyle(data.areaStyle)
    if (!data.showSymbol) {
      data.symbolSize = 0
    }
    if (!data.color) {
      return parseCommonData(originData, data)
    } else {
      return parseColor(originData, data)
    }
  }

}

function parseLabel(originData, data) {
  let series = []
  data.label = parseStyle(data.label)
  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    Object.assign(item.label, data.label)
    series.push(item)
  }

  return { series }
}


function parseStyle(data) {
  let obj = { normal: { textStyle: {} } }
  for (let key in data) {
    let value = data[key]
    if (key.includes('normal')) {
      let pair = key.split('.')
      if (key.includes('textStyle')) {
        obj.normal.textStyle[pair[pair.length - 1]] = value
      } else {
        obj.normal[pair[pair.length - 1]] = value
      }
    } else {
      obj[key] = value
    }
  }

  if (Object.keys(obj.normal.textStyle).length === 0) {
    delete obj.normal.textStyle
  }

  return obj
}

function parseCommonData(originData, data) {
  let series = []
  if (data.areaStyle && (data.areaStyle.normal.show === false)) {
    data.areaStyle.normal.opacity = 0
  }
  if (data.areaStyle && data.areaStyle.normal.show) {
    data.areaStyle.normal.opacity /= 100
  }
  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    item.showSymbol = data.showSymbol
    item.symbolSize = data.symbolSize
    Object.assign(item.areaStyle, data.areaStyle)

    for (let j = 0, leng = item.data.length; j < leng; j++) {
      item.data[j].lineStyle.normal.type = data.lineStyle.normal[`type${j}`]
    }
    series.push(item)
  }

  return { series }
}

function parseColor(originData, data) {
  let series = []
  let key = Object.keys(data.color)[0]
  let color = data.color[key]
  let arr = key.split('.')
  let prefix = 'data'
  let leng = prefix.length //avoid lock. you can change the prefix to edit
  let index = parseInt(arr[1].substr(leng))
  if (data.areaStyle && (data.areaStyle.normal.show === false)) {
    data.areaStyle.normal.opacity = 0
  }
  if (data.areaStyle && data.areaStyle.normal.show) {
    data.areaStyle.normal.opacity /= 100
  }

  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    Object.assign(item.areaStyle, data.areaStyle)
    series.push(item)
  }

  return { series, color, index }
}

function parseRadar(data) {
  let obj = { textStyle: {} }
  for (let key in data) {
    let value = data[key]
    if (key.includes('textStyle')) {
      let pair = key.split('.')
      obj.textStyle[pair[pair.length - 1]] = value
    } else {
      obj[key] = value
    }
  }
  if (Object.keys(obj.textStyle) === 0) {
    delete obj.textStyle
  }

  return obj
}

function areaStyleHandler(data) {
  let obj = {
    normal: {
      show: data['normal.show'],
      opacity: data['normal.show'] ?
        (data['normal.opacity'] >= 1
          ? data['normal.opacity'] / 100
          : data['normal.opacity'])
        :
        0
    }
  }

  return obj
}
