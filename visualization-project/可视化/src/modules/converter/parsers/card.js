import Parser from './parse'

/**
 * 解析应用卡片
 */
export default function card(data, config = {}, map = {}) {
  if (!Parser.isValid(config.xAxis) || !Parser.isValidSeries(config.series)) {
    return
  }

  let key = [];
  let value = [];
  let series = [];

  if (data) {
    series = Object.keys(map);

    series.forEach(item => {
      // 处理key系列
      if (config.key === item) {
        key = data[item].data
      }

      // 处理value系列
      if (config.value === item) {
        value = data[item].data
      }
    });

    return { key, value }
  }

}
