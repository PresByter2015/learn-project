import parsers from './parsers'
import mergers from './mergers'
import { deepCopy } from 'utils/serialize'

let cacheMap = new Map

export default class Converter {
  constructor(klass, type, theme, pureOption) {
    let id = `${klass}_${type}_${theme}`

    if (cacheMap.has(id)) {
      return cacheMap.get(id)
    }

    this.klass = klass
    this.type = type
    this.theme = theme
    this.pureOption = deepCopy(pureOption)

    this.parser = parsers[type]
    this.merger = mergers[type] || merge

    cacheMap.set(id, this)

    return this
  }

  parse(data, dataSet, fieldsMap, chain = true, styleSet) {
    this.data = data
    this.dataSet = dataSet
    this.fieldsMap = fieldsMap

    if (this.parser) {
      this.partialOption = this.parser(data, dataSet, fieldsMap, this.type, this.theme, this.pureOption, styleSet)
    }

    return chain ? this : this.partialOption
  }
}

function merge(option, partialOption) {
  /*
  if (type === 'geo') {
    return geoMerge(option, partialOption, klass, type, theme, dataSet);
  }
  */
  // 处理 xAxis
  if (partialOption) {
    if (partialOption.xAxis) {
      if (Array.isArray(partialOption.xAxis) && partialOption.xAxis.length > 0) {
        if (Array.isArray(option.xAxis)) {
          if (partialOption.xAxis[0]) {
            option.xAxis[0].data = partialOption.xAxis[0].data
          }
        } else {
          if (option.xAxis[1]) {
            option.xAxis[1].data = partialOption.xAxis[1].data
          } else {
            option.xAxis.data = partialOption.xAxis[0].data
          }
        }
      }
    }

    // 处理 yAxis
    if (partialOption.yAxis) {
      if (Array.isArray(partialOption.yAxis) && partialOption.yAxis.length > 0) {
        if (Array.isArray(option.yAxis)) {
          if (partialOption.yAxis[0] && partialOption.yAxis[0].data) {
            Object.assign(option.yAxis[0].data, partialOption.yAxis[0].data)
          }
        } else {
          if (option.yAxis[1]) {
            option.yAxis[1].data = partialOption.yAxis[1].data
          } else {
            option.yAxis.data = partialOption.yAxis[0].data
          }
        }
      }
    }

    // 处理 legend
    if (option.legend
    && partialOption.legend
    && partialOption.legend.data
    && Array.isArray(partialOption.legend.data)
    && partialOption.legend.data.length) {
      option.legend.data = partialOption.legend.data
    }

    // 处理 series
    if (Array.isArray(partialOption.series) && partialOption.series.length) {
      if (partialOption.type) {
        delete partialOption.type
        if (Array.isArray(partialOption.series[0].data) && partialOption.series[0].data.length) {
          let list = option.series[0].data
          list = partialOption.series[0].data.map( (item, i) => {
            return Object.assign({},list[i], item)
          })
          option.series[0].data = list
        } else {
          return option
        }
      } else {
        option.series = partialOption.series.map((series, i) => {
          let orignSeriesItem = option.series[i] || option.series[0]
          return Object.assign({}, orignSeriesItem, series)
        })
      }
    }

    if (partialOption.title && partialOption.title.text) {
      option.title.text = partialOption.title.text
    }


    // 处理单值类型的数据
    if (partialOption.value) {
      option.value = partialOption.value
    }

    if (partialOption.radar && partialOption.radar[0].indicator) {
      option.radar[0].indicator = partialOption.radar[0].indicator
    }

    if (partialOption.geo) {
      option.geo = partialOption.geo
    }
    if (partialOption.visualMap) {
      option.visualMap = partialOption.visualMap
    }

    return option
  }

}
