import Echarts from '../echarts'
import _ from 'lodash'
import { deepCopy } from 'utils/serialize'
import { defaultHotSerie, defaultScatterSerie, defaultLinesSeries } from 'modules/chart/themes/geo/basic/option'

export default class Geo extends Echarts {
  constructor(option, el, theme) {
    super(option, el)
    this.theme = theme;
  }

  setData(partialOption) {
    let styleSetting = this.style.toObject();

    this.option.series = null;
    _.merge(this.option, partialOption);
    this.setGeoStyle(styleSetting.geo);
    this.setVisualMapStyle(styleSetting.visualMap);
    
    this.flush(true)
  }

  setVisualMapStyle(styleVisualMap) {
    let { visualMap } = this.option
    if (visualMap && visualMap.inRange && _.isArray(visualMap.inRange.color)) {
      visualMap.inRange.color[0] = styleVisualMap.inRange.color['0'] || visualMap.inRange.color[0];
      visualMap.inRange.color[1] = styleVisualMap.inRange.color['1'] || visualMap.inRange.color[1];
    }
  }

  setSeriesStyle() {
    let option = this.option;
    let styleSetting = this.style.toObject();

    let markType = this.theme;

    //仅修改series中由styleSetting影响的部分
    if (markType === 'scatter') {
      option.series = _.map(option.series, (serie) => {
        return defaultScatterSerie(serie.name, serie.data, styleSetting);
      })
    } else if (markType === 'lines') {
      let series = deepCopy(option.series);
      option.series = [];
      for (let i = 0; i < series.length / 3; i++) {
        let name = series[i * 3].name;
        let dataLines = series[i * 3].data;
        let dataPoints = series[i * 3 + 2].data;
        option.series = option.series.concat(defaultLinesSeries(name, dataLines, dataPoints, styleSetting));
      }
    } else {
      option.series = _.map(option.series, (serie) => {
        return defaultHotSerie(serie.name, serie.data, styleSetting);
      })
    }
  }

  setGeoStyle(styleGeo) {
    let { geo } = this.option;
    if (geo) {
      _.merge(this.option.geo, styleGeo);
    }
  }
}
