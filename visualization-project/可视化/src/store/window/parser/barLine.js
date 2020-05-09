import Parser from './parser'

/**
 * 解析柱状图
 */
export default function Bar(option, type, data) {
  if (type === 'legend') {
    option.legend = Parser.legend(option[type], data)
  }

  if (type === 'config.series') {
    // @TODO
    // 目前想隔离图形配置
    let color = []
    for (let key in data) {
      if (data[key].color) {
        let colors = data[key].color
        for (let i = 0, len = colors.length; i < len; i++) {
          color.push(colors[i])
        }
      }
    }

    //修改option的color, 控制全局的颜色
    data.line = lineHandler(data.line)
    data.bar.stack = !!data.bar.stack
    Object.assign(option.color, color)
    option['config.series'] = data
  }

  if (type === 'series') {
    let sendData = parseSeries(option[type], data)
    if (sendData.color) {
      let { type } = sendData
      if (type === 'bar') {
        Object.assign(option.color, sendData.color)
      } else {
        let { barNum, lineNum, color = [] } = sendData
        for (let j = barNum; j < barNum + lineNum; j++) {
          let index = j - barNum
          option.color[j] = color[index]
        }
      }
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
  if (data['line.color']) {
    return parseLineColor(originData, data)
  } else if (data['bar.color']) {
    return parseBarColor(data)
  } else {
    return parseCommonData(originData, data)
  }
}

function parseLineColor(originData, data) {
  let color = data['line.color']
  let barNum = 0
  let lineNum = 0
  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    let { type } = item
    if (type === 'line') {
      lineNum += 1
    } else {
      barNum += 1
    }
  }

  return { color, lineNum, barNum, type: 'line' }

}

function parseBarColor(data) {
  let color = data['bar.color']

  return { color, type: 'bar' }
}

function parseCommonData(originData, data) {
  data.line = parseStyle(data.line)
  let Mode = parseLineMode(data)
  let series = []
  let { stack, barWidth } = data.bar
  for (let i = 0, len = originData.length; i < len; i++) {
    let item = originData[i]
    let { type } = item
    if (type === 'bar') {
      Object.assign(item, data['bar'])
      item.stack = stack
      item.barWidth = barWidth
    } else {
      let { show } = data.line.areaStyle.normal
      let _opacity = data.line.areaStyle.normal.opacity
      if (show) {
        let opacity = _opacity > 1 ? (_opacity / 100) : _opacity
        data.line.areaStyle.normal.opacity = opacity
      } else {
        data.line.areaStyle.normal.opacity = 0
      }
      if (item && data.line) {
        item.areaStyle = item.areaStyle || {}
        Object.assign(item.areaStyle, data.line.areaStyle)
      }

      item.step = Mode.step
      item.smooth = Mode.smooth
      item.lineMode = data.line.lineMode

      item.itemStyle = item.itemStyle || {}
      Object.assign(item.itemStyle, data.line.itemStyle)
    }
    series.push(item)
  }

  return { series }
}

function parseStyle(data) {
  let obj = { areaStyle: { normal: {} } }
  for (let key in data) {
    let value = data[key]
    if (key.includes('areaStyle')) {
      let pair = key.split('.')
      if (key.includes('areaStyle.normal')) {
        obj.areaStyle.normal[pair[pair.length - 1]] = value
      } else {
        obj.areaStyle[pair[pair.length - 1]] = value
      }
    } else {
      obj[key] = value
    }
  }

  return obj
}


function parseLineMode(data) {
  let { lineMode } = data.line
  let Mode = { smooth: 0.4 }
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

function lineHandler(data) {

  let result = { }
  Object.assign(result, modeHandler(data.lineMode))
  // result.itemStyle = {
  //   normal: {
  //     borderWidth: data['itemStyle.normal.borderWidth'],
  //     opacity: data['itemStyle.normal.opacity'],
  //   }
  // }

  result.areaStyle = {
    normal: {
      show: data['areaStyle.normal.show'],
      opacity: data['areaStyle.normal.show'] ?
        (data['areaStyle.normal.opacity'] >= 1
          ? data['areaStyle.normal.opacity'] / 100
          : data['areaStyle.normal.opacity'])
        :
        0
    }
  }

  result.color = data.color
  result.showSymbol = data.showSymbol
  result.symbolSize = data.showSymbol ? data.symbolSize : 0
  return result
}

/**
 * 解析 line mode 折线展示样式
 */
function modeHandler(lineMode) {
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
