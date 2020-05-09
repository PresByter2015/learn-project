/**
 * 解析动态图片
 */
export default function dynamicImage(data, config = {}, fieldsMap, type, theme, pureOption) {
  
  let series = config.series;
  let param = config.sequence;
  let _serie = {};

  if (data && param && data[param] && data[param].data && data[param].data[0]) {
    if (String(data[param].data[0]) === '1') {
      //正常
      _serie.image = series[0]
    } else if (String(data[param].data[0]) === '0') {
      //异常
      _serie.image = series[1]
    }
  }

  return Object.assign({}, pureOption, _serie)
}
