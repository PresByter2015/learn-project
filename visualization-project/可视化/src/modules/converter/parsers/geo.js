import getMappingName from './getMapName'
import _ from 'lodash'
import { defaultGeo, defaultVisualMap, defaultHotSerie,
  defaultScatterSerie, defaultLinesSeries } from 'modules/chart/themes/geo/basic/option'

/**
 * 解析地图
 */
export default function geo(data, config = {}, mapping = {}, type, themes, pureOption, styleSet) {
  let series = []
  let geo = {}
  let visualMap = {}
  let legend = { data: [] }

  switch (themes) {
    case 'scatter':
      geo = defaultGeo()
      visualMap = null
      for (let i = 0; i < config.series.length; i++) {
        let { lon, lat, scatterValue, scatterName } = config.series[i]
        if (lon && lat && scatterValue) {
          let serie = buildScatterSerie(lon, lat, scatterValue, scatterName, mapping, data, legend, styleSet)
          series.push(serie)
        }
      }
      break
    case 'lines':
      geo = defaultGeo()
      visualMap = null
      for (let i = 0; i < config.series.length; i++) {
        let { startLon, startLat, startName, endLon, endLat, endName, LinesValue } = config.series[i]
        if (startLon && startLat && endLon && endLat && LinesValue) {
          let serie = buildLinesSerie(startLon, startLat, startName,
            endLon, endLat, endName, LinesValue, mapping, data, legend, styleSet)
          series = series.concat(serie)
        }
      }
      break
    case 'hot':
    default:
      geo = null
      visualMap = defaultVisualMap()
      let { province, hotValue } = config.series[0]
      let serie = buildHotSerie(province, hotValue, mapping, data, legend, visualMap, styleSet)
      series.push(serie)

      if (config.series.length > 1) {
        for (let i = 1; i < config.series.length; i++) {
          let { province, hotValue } = config.series[i]
          if (province && hotValue) {
            let serie = buildHotSerie(province, hotValue, mapping, data, legend, visualMap, styleSet)
            series.push(serie)
          }
        }
      }

      break
  }

  return { series, geo, visualMap, legend }
}

function buildHotSerie(province, hotValue, mapping, data, legend, visualMap, styleSet) {

  let name = getMappingName(hotValue, mapping)
  if (name) {
    legend.data.push(name)
  }

  let serieData = []

  let provinces = data[province] ? data[province].data : null
  let hotValues = data[hotValue] ? data[hotValue].data : null
  _.map(hotValues, (val, index) => {
    visualMap.min = Math.min(visualMap.min, val)
    visualMap.max = Math.max(visualMap.max, val)
    serieData.push({
      name: provinces && provinces[index],
      value: val
    })
  })
  return defaultHotSerie(name, serieData, styleSet);
}

function buildScatterSerie(lon, lat, scatterValue, scatterName, mapping, data, legend, styleSet) {

  let name = getMappingName(scatterValue, mapping)
  legend.data.push(name)

  let serieData = []

  let lons = data[lon] ? data[lon].data : null
  let lats = data[lat] ? data[lat].data : null
  let scatterValues = data[scatterValue] ? data[scatterValue].data : null
  let scatterNames = data[scatterName] ? data[scatterName].data : null
  _.map(scatterValues, (val, index) => {
    serieData.push({
      name: scatterNames && scatterNames[index],
      value: [lons[index], lats[index], val]
    })
  })
  return defaultScatterSerie(name, serieData, styleSet)
}

/**
 * 一组3个，需要concat
 * @return {[type]} [description]
 */
function buildLinesSerie(startLon, startLat, startName,
  endLon, endLat, endName, LinesValue, mapping, data, legend, styleSet) {

  let name = getMappingName(LinesValue, mapping)
  legend.data.push(name)

  let dataLines = []
  let dataPoints = []
  let startLons = data[startLon] ? data[startLon].data : null
  let startLats = data[startLat] ? data[startLat].data : null
  let startNames = data[startName] ? data[startName].data : null
  let endLons = data[endLon] ? data[endLon].data : null
  let endLats = data[endLat] ? data[endLat].data : null
  let endNames = data[endName] ? data[endName].data : null
  let LinesValues = data[LinesValue] ? data[LinesValue].data : null
  _.map(LinesValues, (val, index) => {
    dataPoints.push({
      name: endNames && endNames[index],
      value: [endLons[index], endLats[index], val]
    })

    dataLines.push({
      fromName: startNames && startNames[index],
      toName: endNames && endNames[index],
      coords: [[startLons[index], startLats[index]], [endLons[index], endLats[index]]]
    })
  })

  return defaultLinesSeries(name, dataLines, dataPoints, styleSet)
}
