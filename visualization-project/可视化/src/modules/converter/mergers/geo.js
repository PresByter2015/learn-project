import _ from 'lodash'

/**
 * [description]
 * @param  {[type]} option        [description]
 * @param  {[type]} partialOption [从数据配置上来的经过converter加工过的option]
 * @param  {[type]} klass         [description]
 * @param  {[type]} type          [description]
 * @param  {[type]} theme         [description]
 * @param  {[type]} dataSet       [description]
 * @return {[type]}               [description]
 */
export default function(option, partialOption, klass, type, theme, dataSet) {
  if (dataSet.markType === 'hot') {
    //option.visualMap里面有从图形配置上来的最大最小值颜色
    if (option.visualMap
      && option.visualMap.inRange
      && _.isArray(option.visualMap.inRange.color)) {
      if (option.visualMap.inRange.color[0]) {
        partialOption.visualMap.inRange.color[0] = option.visualMap.inRange.color[0]
      }
      if (option.visualMap.inRange.color[1]) {
        partialOption.visualMap.inRange.color[1] = option.visualMap.inRange.color[1]
      }
    }
    option.geo = null
    option.visualMap = _.merge({}, option.visualMap, partialOption.visualMap)
  } else {
    option.visualMap = null
    if (option.geo && option.geo.itemStyle) {
      partialOption.geo.itemStyle = option.geo.itemStyle
    }
    option.geo = _.merge({}, option.geo, partialOption.geo)
  }

  option.series = _.map(partialOption.series, (serie, index) => {
    if (option.series && option.series[0]) {
      if (option.series[0].label) {
        serie.label = option.series[0].label
      }
      if (dataSet.markType === 'scatter' && option.series[0].itemStyle) {
        serie.itemStyle = option.series[0].itemStyle
      }
      if (dataSet.markType === 'lines' && option.series[0].lineStyle) {
        serie.lineStyle = option.series[0].lineStyle
        serie.itemStyle = option.series[0].lineStyle
      }
    }
    return _.merge({}, option.series[index], serie)
  })

  if (partialOption.legend) {
    option.legend = _.merge({}, option.legend, partialOption.legend)
  }

  return option
}
