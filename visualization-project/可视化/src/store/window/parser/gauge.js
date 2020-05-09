/**
 * 解析仪表盘
 */
export default function Gauge(option, type, data) {
  if (type === 'series') {

    let sendData = parseSeries(option.series, data, option)
    if (sendData.series) {
      Object.assign(option.series, sendData.series)
    }
    if (sendData.color) {
      Object.assign(option.color, sendData.color)
    }
  }

  return option
}

function parseSeries(originData, data, option) {
  data.axisTick = parseLine(data.axisTick)
  data.title = parseCommonData(data.title)
  data.detail = parseCommonData(data.detail)
  data.axisLabel = parseCommonData(data.axisLabel)
  data.splitLine = parseLine(data.splitLine)
  data.radius = data.radius + '%'
  data.pointer.length = data.pointer.length + '%'
  data.title.offsetCenter = [0, 0]
  data.detail.offsetCenter = [0, '-40%']

  if (data.color) {
    return parseAxisLine(originData, data)
  } else {
    return parseData(originData, data, option)
  }
}

// 解析坐标轴线
function parseAxisLine(originData, data) {
  let series = []
  let color = data.color
  let axisLine = { lineStyle: {} }
  let newData = calcScale(data.axisLine, color)
  axisLine.lineStyle.scale = newData.count
  axisLine.lineStyle.color = newData.colors
  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    Object.assign(item.axisLine, axisLine)
    item.axisLine.lineStyle.width = 6
    if (!data.pointer.show) {
      item.pointer.width = 0
    }
    series.push(item)
  }
  return { series, color }

}


function parseData(originData, data, option) {
  let series = []
  let color = option.color
  let axisLine = { lineStyle: {} }
  let newData = calcScale(data.axisLine, color)
  axisLine.lineStyle.scale = newData.count
  axisLine.lineStyle.color = newData.colors
  data.axisLine = axisLine
  data.axisLine.lineStyle.width = 6

  if (!data.pointer.show) {
    data.pointer.width = 0
  }

  for (let i = 0, len = originData.length; i < len; i++) {
    let value = JSON.parse(JSON.stringify(originData[i].data[0]))
    let { name } = data.data
    data = JSON.parse(JSON.stringify(data))
    value.name = name
    data.data = [value]  // keep the same structure
    originData[i] = JSON.parse(JSON.stringify(originData[i]))
    let item = Object.assign(originData[i], data)
    series.push(item)
  }

  return { series }
}

/**
* detail && title has same structure. use this function to parse
*/

function parseCommonData(data) {
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
  if (Object.keys(obj.textStyle).length === 0) {
    delete obj.textStyle
  }

  return obj
}

function calcScale(data, color) {

  let count = []
  let total = 0
  let localTotal = 0
  let colors = []
  for (let key in data) {  //获取每段的长度
    let value = data[key]
    if (key.includes('scale.')) {
      total += parseInt(value)
      count.push(parseInt(value))
    }
  }

  for (let i = 0, len = count.length; i < len; i++) {
    let num = count[i]
    let item = { name: `分段${i + 1}`, value: num }
    count[i] = item
  }

  for (let i = 0, len = count.length; i < len; i++) {
    localTotal += parseInt(data[`scale.${i}`]) // from string to number
    colors.push([localTotal / total, color[i]])
  }

  if (count.every((item) => item.value === 0)) { // when scale is 0 : 0 : 0 ...
    colors = colors.map( (item) => {
      item[0] = 1
      return item
    })
  }

  return { colors, count }
}

function parseLine(data) {
  let obj = {}
  let lineStyle = {}
  for (let key in data) {
    if (key.includes('textStyle')) {
      let pair = key.split('.')
      lineStyle[pair[pair.length - 1]] = data[key]
    } else {
      obj[key] = data[key]
    }
  }
  obj.lineStyle = lineStyle
  if (Object.keys(obj.lineStyle).length === 0) {
    delete obj.lineStyle
  }
  return obj
}
