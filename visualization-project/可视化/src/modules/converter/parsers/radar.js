import getMapName from './getMapName'

/**
 * 期望数据格式
 * option = {
 *  legend: {},
 *  radar: [],
 *  series: []
 * }
 */

// todo export default function radar(data, config = {}, map = {}, type, theme, pureOption) {
export default function radar(data, config = {}, map = {}) {
  if (!data || !config.name || !config.series || !(Array.isArray(config.series) && config.series[0])) {
    return 
  }
  let legend = {}
  let series = [ { data: [] } ]
  let radar = [ {} ]
  let wantSeriesAry = []
  let filteredData = {}

  if (config.name && data) {
    let { name } = config
    if (data && data[`${name}`] && name) {
      radar[0].indicator = data[`${name}`].data
    }

    Object.keys(data).forEach(key => {
      if (data[`${name}`] && data[`${name}`] === key) {
      // do nothing
      } else {
        filteredData[key] = data[key]
      }
    })

    // 循环配置中的 config.series
    if (config.series) {
      wantSeriesAry = Object.keys(filteredData).filter(key => {
        return Object.values(config.series).includes(key)
      })
    }

    if (wantSeriesAry.length) {
      legend.data = wantSeriesAry
      series[0].data = wantSeriesAry.map(key => {
        let name = getMapName(key, map) //值系列名
        let targetObj = {}
        if (filteredData[key] && filteredData[key].name) {
          filteredData[key].name = name
        }
        let wrapObj = Object.assign({}, filteredData[key])
        targetObj.value = wrapObj.data
        targetObj.name = wrapObj.name
        return targetObj
      })
      legend.data = wantSeriesAry.map( key => {
        let name = getMapName(key, map)
        return name
      })
    }

    if (series[0].data.length > 0 && legend.data && legend.data.length > 0) {
      // todo 添加系列后，pureOption不会更新，应该使用config去改变数据配置，且 lineStyle 这类样式的配置不应该写到parser里
      // let list = pureOption.series[0].data
      let list = config.series
      series[0].data.map( (item ,i) => {
        if (i < list.length) {
          item.lineStyle = list[i].lineStyle
        } else {
          if (i % 2 === 0) {
            item.lineStyle = list[0].lineStyle
          } else {
            item.lineStyle = list[1].lineStyle
          }
        }
        return item
      })
    }
    if (Object.keys(radar[0]).length && series[0].data.length) {
      let result = calcMax(radar, series[0].data)
      radar[0].indicator = result
    }

    return {
      legend, series, radar
    }
  }

}

function calcMax(radar, arrays) {
  let list = arrays
  let result = []
  for (let i = 0, len = list[0].value.length; i < len; i++) {
    let ary = []
    if (list[0].value[i] === 'undefined' || list[0].value[i] === 'NaN'
        || Number( list[0].value[i]) === 'NaN') {
      list[0].value[i] = 0
    }

    ary.push(list[0].value[i])
    for (let j = 0, leng = list.length; j < leng; j++) {
      if (list[j].value[i] === 'undefined' || list[j].value[i] === 'NaN'
          ||  Number( list[0].value[i]) === 'NaN') {
        list[j].value[i] = 0
      }
      ary.push(list[j].value[i])
    }
    result.push(ary)
  }

  let { indicator } = radar[0]
  indicator = indicator && indicator.map( (item, i) => {
    let obj = {}
    obj.name = item
    let step = result[i]
    let max = Math.max.apply(Math, step)
    obj.max = max + 50
    return obj
  })

  return indicator
}

