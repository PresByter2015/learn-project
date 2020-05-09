import hot from './hot'
import scatter from './scatter'
import lines from './lines'

import echarts from 'modules/echarts'

const chinaJson = require('./map/china.json')
echarts.registerMap('china', chinaJson)

export default {
  hot,
  scatter,
  lines
}
