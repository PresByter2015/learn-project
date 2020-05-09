/**
 * - loving flower - enjoy life -
 */
function animation(points) {
  let interval = 200;
  let f = 0;

  return {
    get: function () {
      let offset = f;
      let arr = calcPoints(points, offset, interval);
      f += 5;
      if (f === interval) {
        f = 0;
      }
      return arr;
    }
  };
}

/**
 * 计算折线上的等距点
 * @param  {[type]} points   [折线]
 * @param  {[type]} offset   [起始偏移]
 * @param  {[type]} interval [流量点间隔]
 * @return {[type]}          [description]
 */
function calcPoints(points, offset, interval) {
  if (!points) {
    return [];
  }

  let arr = [];
  offset = offset || 0;
  for (let i = 1; i < points.length; i++) {
    let ret = calcPoint(points[i - 1], points[i], offset, interval);
    arr = arr.concat(ret.points);
    offset = interval - ret.leave;
  }

  return arr;
}

/**
 * 返回在startPoint和endPoint这根线上的等距点以及未填满的剩余长度
 * @param  {[type]} startPoint [起点]
 * @param  {[type]} endPoint   [终点]
 * @param  {[type]} offset     [起始偏移]
 * @param  {[type]} step       [两点步长]
 * @return {[type]}            {
 *                               points: [[],[]...],
 *                               leave: 0
 *                             }
 */
function calcPoint(startPoint, endPoint, offset, step) {
  let x = endPoint[0] - startPoint[0];
  let y = endPoint[1] - startPoint[1];
  let dis = Math.sqrt(x * x + y * y);
  if (dis < offset) {
    return {
      points: [],
      leave: step - offset + dis
    };
  }
  let count = parseInt((dis - offset) / step);
  let points = [];
  for (let i = 0; i <= count; i++) {
    points.push([startPoint[0] + ((offset + i * step) * x / dis), startPoint[1] + ((offset + i * step) * y / dis)]);
  }
  return {
    points: points,
    leave: dis - offset - step * count
  };
}

export { animation };
