import Chart from './chart';
import Theme from './theme';
import Themes from './themes';

const req = require.context('./charts', true, /([a-z]+[^\/])\/index\.js/);

const charts = {};

let modules = req.keys().filter((item) => {
  return item.match(/\//g).length === 2 && !item.includes('util');
});

modules.forEach(module => {
  let match = module.match(/\.\/([a-z]+)\//);

  if (match) {
    let dir = match[1];
    charts[dir] = req(module).default;
  }
});

Object.keys(charts).map((item) => {
  Chart.register(item, charts[item]);
});


/**
 * 关于 Theme 的操作
 */
Chart.get = Theme.get;
Chart.parseChartManual = Theme.parseChartManual;
Chart.getSize = Theme.getSize;
Chart.parseCategory = Theme.parseCategory;
Chart.getConfig = Themes.getConfig;
Chart.getFlattenConfig = Themes.getFlattenConfig;

export default Chart;
