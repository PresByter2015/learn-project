export default function (entire, partial) {
  if (arguments.length !== 2 || !entire || !partial) {
    return;
  }

  // jQuery.extend(entire, partial)
  /*
  for (let key in partial) {
    if (key in entire) {
      console.log(key, JSON.stringify(partial[key], null, 2))
    }
  }
  */

  for (let key in partial) {
    let nodes = partial[key];

    // 处理数组类型的数据
    if (Array.isArray(nodes)) {

      // 处理 series
      if (key === 'series') {
        let series = entire[key] = mergeSeries(entire[key], nodes);

        // 根据 series 处理 legend
        legendWithSeries(series, entire.legend);
      }

      // 覆盖原有数据
      // overwriteArray(entire[key], nodes)

      // 重写原有数据
      // rewriteArray(entire[key], nodes)
    }
  }

  // console.log(entire)
}


// function overwriteArray(target, source) {
//   target = source
// }

/**
 * 重写数组中某项的数据
 */
// function rewriteArray(target, source) {
//   source.forEach((item, i) => {
//     target[i] = item
//   })
// }

/**
 * 合并 series
 *
 */
function mergeSeries(target, source) {
  let result = [];

  source.map((item) => {
    result.push(item);
  });

  return result;
}

/**
 * 根据 series 保证 legend 数据的合法性
 */
function legendWithSeries(series, legend) {
  let legendData = legend.data;
  legend.data = [];

  series.forEach((item, i) => {
    legend.data.push(Object.assign(legendData[i], { name: item.name }));
  });
}
