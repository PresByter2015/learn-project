import Echarts from '../echarts'
import { deepCopy } from 'utils/serialize'
//import getterSetter from 'modules/object/getterSetter'

export default class extends Echarts {
  constructor(el, option) {
    super(el, option)
    this.style.set('series_symbol', 'circle')
    this.style.set('series_showSymbol', true)
    this.style.set('series_symbolSize', 5)
  }


  setRadarStyle() {
    let radarStyle = this.parseRadarStyle()
    this.mergeRadarData(radarStyle, this.option.radar)
  }

  mergeRadarData(radarStyle, data) {
    if (Array.isArray(data)) {
      let radar = data.map( item => {
        return Object.assign(item, radarStyle)
      })
      this.option.radar = radar
      return radar
    }
  }

  setRadarData(partial) {
    if (Array.isArray(partial) && partial.length) {
      let radarStyle = this.parseRadarStyle()
      this.mergeRadarData(radarStyle, partial)
      return this.option.radar
    }
  }

  setSeriesData(partial) {
    if (Array.isArray(partial) && partial.length) {
      let seriesStyle = this.parseSeriesStyle()
      this.mergeStyleData(seriesStyle, partial)
      return this.option.series
    }

  }

  parseRadarStyle() {
    let style = this.style.get('radar')
    style = deepCopy(style)
    if (style && style.center) {
      let center = []
      Object.keys(style.center).map( item => {
        center[item] = Number(style.center[item]) + '%'
      })
      style.center = center
    }

    if (style && style.name && style.name.textStyle &&  style.name.textStyle.hasOwnProperty('fontWeight')) {
      if (typeof style.name.textStyle.fontWeight === 'boolean') {
        style.name.textStyle.fontWeight = style.name.textStyle.fontWeight ? 'bold' : 'normal'
      }
    }

    return style
  }

  parseSeriesStyle() {
    let style = this.style.get('series')
    this.setOptionColor(style.color)

    style = deepCopy(style)

    if (style && style.line && style.line.areaStyle) {
      style.areaStyle = parseAreaStyle(style.line.areaStyle.opacity, style.line.areaStyle.show)
    }
    if (style && style.lineType) {
      style.lineType = Object.keys(style.lineType).map(item => {
        let lineStyle = { normal: {} }
        lineStyle.normal.type = style.lineType[item]
        lineStyle.normal.color = style.color[item]
        return { lineStyle }
      })
    }

    delete style.color
    delete style.line
    return style
  }

  afterSetStyle() {
    this.setSeriesStyle()
    this.setRadarStyle()
  }

  setSeriesStyle() {
    let seriesStyle = this.parseSeriesStyle()
    this.mergeStyleData(seriesStyle, this.option.series)
  }

  mergeStyleData(style, data) {
    if (Array.isArray(data)) {
      let series = data.map(item => {
        Object.assign(item, style)
        item.type = 'radar'
        if (Array.isArray(item.data)) {
          item.data = item.data.map((itemData, i) => {
            return Object.assign(itemData, style.lineType[i])
          })
        }
        return item
      })
      this.option.series = series
      return series
    }
  }

}

function parseAreaStyle(opacity, visible) {
  let areaStyle = { show: visible, normal: { opacity } }
  if (!visible) {
    areaStyle.normal.opacity = 0
  }

  return areaStyle
}
