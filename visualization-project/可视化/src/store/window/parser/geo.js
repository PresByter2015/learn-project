import $ from 'utils/deparam'
import _ from 'lodash'
/**
 * 解析地图
 */
export default function Geo(option, type, data) {
  let tmp = $.deparamObj(data, true)

  if (type === 'legend' && tmp.position) {
    switch (tmp.position) {
      case 'top':
        tmp.left = 'right'
        tmp.top = 'top'
        break
      default:
      case 'bottom':
        tmp.left = 'right'
        tmp.top = 'bottom'
        break
      case 'left':
        tmp.left = 'left'
        tmp.top = 'middle'
        break
      case 'right':
        tmp.left = 'right'
        tmp.top = 'middle'
        break
    }
  }
  if (type === 'series') {
    // 保留从数据配置上来的serie配置项
    option.series = _.map(option.series, (serie) => {
      if (tmp.lineStyle) { //目前只有lines有lineStyle,以后如果有扩展就需要判断标记类型
        serie.itemStyle = tmp.lineStyle
      }
      return _.merge({}, serie, tmp)
    })
  } else {
    option[type] = _.merge({}, option[type], tmp)
  }

  return option
}
