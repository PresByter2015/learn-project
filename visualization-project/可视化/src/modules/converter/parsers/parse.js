import getMapName from './getMapName'

export default {
  legend(data, map) {
    return data.map(key => getMapName(key, map))
  },

  isValidSeries(series) {
    return !(Array.isArray(series) && series.length && typeof series[0] === 'undefined')
  },

  isValid(value) {
    return typeof value !== undefined
  }
}
