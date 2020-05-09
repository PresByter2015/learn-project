import { getChartDefaultOption } from '../../config'
import style from '../../style.js'

import data from './data'
import { defaultGeo, defaultScatterSerie } from 'modules/chart/themes/geo/basic/option'

let option = Object.assign({}, getChartDefaultOption(), {
  title: {
    left: 'center',
    textStyle: {
      color: style.title.textStyle.color,
      fontSize: style.title.textStyle.fontSize
    }
  },
  geo: defaultGeo(),
  tooltip: {
    trigger: 'item'
  },
  legend: {
    show: false,
    orient: 'vertical',
    left: style.legendPos.left,
    top: style.legendPos.top,
    data: ['图例'],
    textStyle: {
      fontSize: style.legend.textStyle.fontSize,
      color: style.legend.textStyle.color,
      fontWeight: 'bold',
      opacity: style.notSupportOpacity
    },
    selectedMode: 'single'
  },
  series: [defaultScatterSerie('图例', data)]
})

export default option;
