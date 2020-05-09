import getMapName from './getMapName'

/**
 *
 * 解析饼图
 *
 * 源数据格式
 * {
 *   "accessNum": {
 *     "name": "accessNum",
 *     "data": [
 *       "74",
 *       "28",
 *       "18",
 *       "29"
 *     ]
 *   },
 *   "accessStat": {
 *     "name": "accessStat",
 *     "data": [
 *       "warning",
 *       "error",
 *       "alert",
 *       "norm"
 *     ]
 *   }
 * }
 */

export default function pie(data, config = {}, map = {}) {
  /**
   * 验证的数据格式
   */
  // data = {
  //   value: {
  //       data: ['52%']
  //     },
  //   name: {
  //     "data": ['one', 'two']
  //   }
  // }


  if (config) {
    if (!config.name || !config.value) {
      return
    }
  } else {
    return
  }

  let legend = {}
  let series = []
  legend.data = []

  if (data && config.name && config.value) {
    let item = data[config.name]
    let values = data[config.value]
    if (item && item.data && values.data) {
      let seriesData = item.data.map((key, i) => {
        legend.data.push(getMapName(key, map))
        return {
          name: key,
          value: values.data[i] || 0
        }
      })
      seriesData = SeparatedData(seriesData)

      series.push({
        data: seriesData
      })
    }

    //设置series的name
    if (series.length) {
      series[0].name = getMapName(config.value, map)
    }
  }

  return { legend, series }
}

function SeparatedData(array) {
  if (Array.isArray(array) && array[0]) {
    let data = array[0]
    let { value } = data
    if (value && value.includes('%') && Number.isInteger(parseInt(value))) {
      let parseData = parseInt(value) === parseFloat(value) ? parseInt(value) : parseFloat(value)
      let result = [parseData, 100 - parseData]
      let names = [data.name, '']
      return result.map( (item, index) => {
        return {
          name: names[index],
          value: item
        }
      })
    }
    return array 
  }
}

