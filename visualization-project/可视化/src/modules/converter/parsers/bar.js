import Parser from './parse'
import getMapName from './getMapName'

/**
 * 解析柱状图
 */
export default function bar(data, config = {}, map = {}, type, theme, pureOption) {
  if (theme !== 'barLine') {
    if (!Parser.isValid(config.xAxis) || !Parser.isValidSeries(config.series)) {
      return
    }
  } else {
    if (Array.isArray(config.series) && config.series.length) {
      let arr1 = config.series
      let arr2 = config.seriesSecond
      let arr = [].concat(arr1).concat(arr2)
      let result = arr.every((ele) => {
        return ele === undefined
      })

      if (result) {
        return
      }
    } else {
      return 
    }
  }

  let xAxis = []
  let yAxis = []
  let legend = {}
  let series = []
  let wantSeriesAry = []
  let wantSeriesAry2 = []
  let filteredData = {}

  // 处理 xAxis
  // 直角坐标系 grid 中的 x 轴，单个 grid 组件最多只能放上下两个 x 轴
  // http://echarts.baidu.com/option.html#xAxis
  if ('xAxis' in config) {
    let key = config.xAxis
    let value = data[key]

    if (value) {
      xAxis.push({
        data: value.data
      })
    }
  }

  if ('yAxis' in config) {
    let key = config.yAxis
    let value = data[key]
    if (value) {
      yAxis.push({
        data: value.data
      })
    }
  }

  Object.keys(data).forEach(key => {
    if (config.xAxis && config.xAxis === key) {
      // do nothing
    } else if (config.yAxis && config.yAxis === key) {
      // do nothing
    }
    else {
      filteredData[key] = data[key]
    }
  })

  // 循环配置中的 config.series
  if (config.series) {
    wantSeriesAry = Object.keys(filteredData).filter(key => {
      return Object.values(config.series).includes(key)
    })
  }

  if (config.seriesSecond) {
    wantSeriesAry2 = Object.keys(filteredData).filter(key => {
      return Object.values(config.seriesSecond).includes(key)
    })
  }

  if (wantSeriesAry.length) {
    legend.data = wantSeriesAry

    series = wantSeriesAry.map(key => {
      let name = getMapName(key, map)
      if (filteredData[key] && name) {
        filteredData[key].name = name
      }
      filteredData[key].type = 'bar'
      return Object.assign({}, filteredData[key])
    })
  }

  if (wantSeriesAry2.length) {
    if (legend.data) {
      legend.data = legend.data.concat(wantSeriesAry2)
    } else {
      legend.data = wantSeriesAry2
    }
    let series2 = wantSeriesAry2.map(key => {
      let name = getMapName(key, map)
      if (filteredData[key] && name) {
        filteredData[key].name = name
      }
      filteredData[key].type = 'line'
      return Object.assign({}, filteredData[key])
    })
    if (series) {
      series = series.concat(series2)
    } else {
      series = series2
    }
  }

  // 处理 legend
  if (legend.data) {
    legend.data = Parser.legend(legend.data, map)
  }


  delete legend.series

  if (series.length && legend.data.length) {
    let temp = pureOption.series
    series.map((item, i) => {
      let tempItem = temp[i] ? temp[i] : temp[0]
      tempItem.data = item.data
      tempItem.name = legend.data[i]
      return tempItem
    })
  }

  return { xAxis, yAxis, legend, series }
}


// function mergeSeries(partialSeries, pureSeries) {
//   let arr = partialSeries.map((item) => {
//     if (item && item.type) {
//       let { type } = item
//       let target = getSerieItemStyle(type, pureSeries)
//       return Object.assign({}, target, item)
//     }
//   })
//   return arr
// }

/**
 * 根据 type 获取 series 某项成员的数据
 * @type: string
 * @series: array
 */
// function getSerieItemStyle(type, series) {
//   let result = []
//   if (series && series.length > 0) {
//     result = series.filter(item => {
//       return item.type === type
//     })
//   }

//   return result[0]
// }

// function mergeRankSeries(originSerie, originAxis, style) {

//   let list = originSerie[0].data.map((item, i) => {
//     let obj = {}
//     obj.name = originAxis.data[i]
//     obj.value = item
//     /*
//     if (i < style.length) {
//       obj.itemStyle = style[i].itemStyle
//     } else {
//       obj.itemStyle = style[0].itemStyle
//     }
//     */
//     return obj
//   })

//   let targetAxis = []
//   let targetSerie = []
//   list.sort((a, b) => {
//     return a.value - b.value
//   })
//   list.map((item) => {
//     targetAxis.push(item.name)
//     let obj = {}
//     obj.value = item.value
//     // obj.itemStyle = item.itemStyle
//     targetSerie.push(obj)
//   })

//   return { targetAxis, targetSerie }
// }
