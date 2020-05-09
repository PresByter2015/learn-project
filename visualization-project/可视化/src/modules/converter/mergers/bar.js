import legend from './models/legend'
import xAxis from './models/xAxis'
import series from './models/series'

export default function(option, partialOption, klass, type, theme, dataSet, pureOption) {

  option.legend = legend(partialOption.legend, option.legend)

  option.xAxis = xAxis(partialOption.xAxis, option.xAxis)

  option.yAxis = xAxis(partialOption.yAxis, option.yAxis)

  if (theme === 'barLine') {
    if (partialOption.series.length) {
      option.series = barLineSeries(partialOption.series, option.series, pureOption)
    }
  } else if (theme === 'rank') {
    if ( partialOption.series.length) {
      let target = rankSeries(partialOption.series, option.series)
      for (let i = 0, len = target.length; i < len; i++) {
        option.series[i] = target[i]
      }
    }
  } else {
    option.series = series(partialOption.series, option.series, option)
  }

  return option
}

// 柱状折线图 series 解析
function barLineSeries(partial, entire, option) {
  let list = []
  if (Array.isArray(partial)) {
    list = partial.map((item, index) => {
      let seriesItem = getSeriesByType(item.type, entire, option, index)

      item = Object.assign({}, seriesItem, item)
      //entire[index] = item
      return item
    })
  }

  return list
  //return entire
}

function getSeriesByType(type, series, option) {
  let result
  result = series.filter(item => {
    return item.type === type
  })

  if (result.length === 0) {
    result = option.series.filter(item => {
      return item.type === type
    })
  }

  return result[0]
}


function rankSeries(partial, entire) {
  if (Array.isArray(partial)) {
    let list = []
    list = partial.map( (item) => {
      let template = entire[0]
      let { itemStyle } = template.data[0]
      item.data = item.data.map( (subItem) => {
        let obj = {}
        obj.itemStyle = itemStyle
        obj.value = subItem
        return obj
      })
      return Object.assign({}, template, item)
    })
    return list
  }
}

/*
function getSortRef(originData, originAxis) {
  let sortRef = []
  originData = originData.map( (item, index) => {
    item.name = originAxis[index]
    return item
  })

  originData = originData.sort( (a, b) => {
    return a.value > b.value
  })

  originData = originData.map( (item) => {
    sortRef.push(item.name)
    delete item.name
    return item
  })
  return sortRef
}
*/
