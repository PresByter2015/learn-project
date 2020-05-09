import getMapName from './getMapName'

export default function(data, config = {}, map = {}) {
  let series = [{ type: 'funnel', data: [] }]
  let legend = {}
  legend.data = []
  let middleData = []

  if (config && config.name && data) {
    let { name } = config
    if (data && data[`${name}`] && name) {
      legend.data = data[`${name}`].data
    }
    if (config.value) {
      let { value } = config
      if (data && data[`${value}`] && value) {
        middleData = data[`${value}`].data
      }
    }

    middleData = middleData && middleData.map( (item, i) => {
      let name = getMapName(legend.data[i], map)
      let obj = {}
      obj.value = item
      obj.name = name
      return obj
    })

    series[0].data = middleData
  }
  if (legend.data.length && series[0].data.length) {
    series[0].name = getMapName(config.value, map)
    return { legend, series }
  }
}
