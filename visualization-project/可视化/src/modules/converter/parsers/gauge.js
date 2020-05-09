import getMapName from './getMapName'

export default function(data, config = {}, map = {}) {
  let series = []

  if ('seriesKey' in config) {
    let seriesKey = config.seriesKey

    if (seriesKey in data) {
      let seriesItem = { data: [] }
      if (data[seriesKey].data) {
        seriesItem.data.push({
          name: getMapName(seriesKey, map),
          value: String2Number(data[seriesKey].data[0])
        })
      }

      series.push(seriesItem)
    }
  }

  return { series }
}


function String2Number(str = 0) {
  if (isNaN(Number(str))) {
    if (isNaN(parseInt(str))) {
      return 0
    } else {
      return parseInt(str) === parseFloat(str) ? parseInt(str) : parseFloat(str)
    }
  } else {
    return Number(str)
  }
}
