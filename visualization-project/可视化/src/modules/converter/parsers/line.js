import Parser from './parse'
import getMapName from './getMapName'

/**
 * 解析折线图
 */
export default function line(data, config = {}, map = {}, type, theme, pureOption) {
  if (!Parser.isValid(config.xAxis) || !Parser.isValidSeries(config.series)) {
    return
  }

  let xAxis = []
  let legend = {}
  let series = []
  let wantSeriesAry = []
  let filteredData = {}

  // 处理 xAxis
  // 直角坐标系 grid 中的 x 轴，单个 grid 组件最多只能放上下两个 x 轴
  // http://echarts.baidu.com/option.html#xAxis
  if (data) {
    if ('xAxis' in config) {
      let key = config.xAxis
      let value = data[key]

      if (value) {
        xAxis.push({
          data: value.data
        })
      }
    }

    Object.keys(data).forEach(key => {
      if (config.xAxis && config.xAxis === key) {
        // do nothing
      } else {
        filteredData[key] = data[key]
      }
    })

    // 循环配置中的 config.series
    if (config.series) {
      wantSeriesAry = config.series.filter(key => {
        return typeof key !== 'undefined'
      })

      /*
      数据需要排序，按配置来循环数据
      Object.keys(filteredData).filter(key => {
        return Object.values(config.series).includes(key)
      })
      */
    }

    if (wantSeriesAry.length) {
      legend.data = wantSeriesAry

      series = wantSeriesAry.map(key => {
        let name = getMapName(key, map)
        if (name && filteredData[key]) {
          filteredData[key].name = name
        }

        return Object.assign({ }, filteredData[key], {
          type: 'line'
        })
      })
    }

    // 处理 legend
    if (legend.data) {
      legend.data = Parser.legend(legend.data, map)
    }
    delete legend.series

    if (series.length && legend.data.length) {
      let temp = pureOption.series
      series.map( (item, i) => {
        let tempItem = temp[i] ? temp[i] : temp[0]
        tempItem.name = legend.data[i]
        tempItem.data = item.data
        return tempItem
      })
    }

    //处理 X轴为时间轴时
    let mapXAxisKey = config.xAxis
    if (mapXAxisKey) {
      let xAxisType = map[mapXAxisKey].type
      if (xAxisType && xAxisType === 'time') {
        for (let i = 0; i < series.length; i++) {
          let timeArr = xAxis[0].data
          let seriesArr = series[i].data
          let newData = []

          for (let j = 0; j < timeArr.length; j++) {
            let obj = {
              name: '',
              value: [parseInt(timeArr[j]), seriesArr[j]]
            }
            newData.push(obj)
          }

          series[i].data = newData
        }

        xAxis[0].type = 'time'
        xAxis[0].splitNumber = 6
        delete xAxis[0].data
      }
    }

    return { xAxis, legend, series }
  }

}
