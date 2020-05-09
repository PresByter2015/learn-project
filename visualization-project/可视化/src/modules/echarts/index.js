// define(function(require, exports, module) {
module.exports = require('echarts/lib/echarts');

// Import all charts and components
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/scatter');
require('echarts/lib/chart/radar');

require('echarts/lib/chart/map');
// require('echarts/lib/chart/treemap');//树状数据
// require('echarts/lib/chart/graph');//关系图
require('echarts/lib/chart/gauge');
require('echarts/lib/chart/funnel');
require('echarts/lib/chart/parallel');//平行坐标系的系列
// require('echarts/lib/chart/sankey');//桑基图
// require('echarts/lib/chart/boxplot');//箱线
// require('echarts/lib/chart/candlestick');//蜡烛
require('./chart/effectScatter');
// require('echarts/lib/chart/effectScatter');//替换散点动画
require('echarts/lib/chart/lines');
require('echarts/lib/chart/heatmap');

require('echarts/lib/component/grid');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/polar');
require('echarts/lib/component/geo');
// require('echarts/lib/component/parallel');
require('echarts/lib/component/singleAxis');
require('echarts/lib/component/brush');

require('echarts/lib/component/title');

require('echarts/lib/component/dataZoom');
require('echarts/lib/component/visualMap');

require('echarts/lib/component/markPoint');
require('echarts/lib/component/markLine');
require('echarts/lib/component/markArea');

require('echarts/lib/component/timeline');
require('echarts/lib/component/toolbox');

require('zrender/lib/vml/vml');
// })
