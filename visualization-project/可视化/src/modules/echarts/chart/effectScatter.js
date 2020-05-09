

let zrUtil = require('zrender/lib/core/util');
let echarts = require('echarts/lib/echarts');

require('echarts/lib/chart/effectScatter/EffectScatterSeries');
require('./effectScatter/EffectScatterView');

echarts.registerVisual(zrUtil.curry(
  require('echarts/lib/visual/symbol'), 'effectScatter', 'circle', null
));
echarts.registerLayout(zrUtil.curry(
  require('echarts/lib/layout/points'), 'effectScatter'
));
