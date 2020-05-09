import getMapName from './getMapName';
import Parser from './parse';

export default function scatter(data, config = {}, map = {}) {
  if ((!config.xAxis) || (!config.size) || (!config.series) || !(config.series && config.series[0])) {
    return;
  }
  let xAxis = [];
  let legend = {};
  let series = [];
  let wantSeriesAry = [];
  let filteredData = {};

  // 处理 xAxis
  // 直角坐标系 grid 中的 x 轴，单个 grid 组件最多只能放上下两个 x 轴
  // http://echarts.baidu.com/option.html#xAxis
  if (data) {
    // let size = null
    // if (config.size) {
    //   size = config.size
    // }

    if ('xAxis' in config) {
      let key = config.xAxis;
      let value = data[key];

      if (value) {
        xAxis.push({
          data: value.data
        });
      }
    }

    Object.keys(data).forEach(key => {
      if (config.xAxis && config.xAxis === key) {
        // do nothing
      } else {
        filteredData[key] = data[key];
      }
    });

    // 循环配置中的 config.series
    if (config.series) {
      wantSeriesAry = Object.keys(filteredData).filter(key => {
        return Object.values(config.series).includes(key);
      });
    }

    if (wantSeriesAry.length) {
      legend.data = wantSeriesAry;

      series = wantSeriesAry.map(key => {
        let name = getMapName(key, map);
        if (filteredData[key] && name) {
          filteredData[key].name = name;
        }
        return Object.assign({}, filteredData[key]);
      });
    }

    // 处理 legend
    if (legend.data) {
      legend.data = Parser.legend(legend.data, map);
    }
    delete legend.series;

    return { xAxis, legend, series };
  }

}
