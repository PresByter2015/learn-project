/* eslint-disable */
import { abs, min } from 'utils/math';
import _ from 'lodash';

let POINT_CUT_DISTANCE = 5; // edge中连接点裁剪边距或折线裁剪边距
let LINE_SELECT_OFFSET = 10; // edge 可选偏移距离
let rectMargin = 10;

function combinePoints() {
  let points = Array.prototype.slice.call(arguments);
  let minPoint = { x: points[0].x, y: points[0].y };
  let maxPoint = { x: points[0].x, y: points[0].y };
  let point = null;

  for (let i = 1; i < points.length; i++) {
    point = points[i];

    if (minPoint.x > point.x) {
      minPoint.x = point.x;
    }
    if (minPoint.y > point.y) {
      minPoint.y = point.y;
    }

    if (maxPoint.x < point.x) {
      maxPoint.x = point.x;
    }
    if (maxPoint.y < point.y) {
      maxPoint.y = point.y;
    }
  }

  let style = {
    x: minPoint.x,
    y: minPoint.y,
    width: maxPoint.x - minPoint.x,
    height: maxPoint.y - minPoint.y
  };

  expandEdge(style, POINT_CUT_DISTANCE);
  points = _.map(points, function (point) {
    return coordTransform(point);
  });
  doTranslatePoints(points, {
    x: -style.x,
    y: -style.y
  });

  return {
    style: style,
    attr: {
      points: points
    }
  };
}

/**
 * 给连接点padding
 * @param  {[type]} style [description]
 * @param  {[type]} size  [description]
 * @return {[type]}       [description]
 */
function expandEdge(style, size) {
  style.x -= size;
  style.y -= size;
  style.width += 2 * size;
  style.height += 2 * size;
}

/**
 * 对象坐标转数组类型
 * @param  {[type]} point [description]
 * @return {[type]}       [description]
 */
function coordTransform(point) {
  return [point.x, point.y];
}

/**
 * 计算偏移后坐标
 * @param  {[type]} points [description]
 * @param  {[type]} offset [description]
 * @return {[type]}        [description]
 */
function doTranslatePoints(points, offset) {
  _.map(points, function (point) {
    point[0] += offset.x;
    point[1] += offset.y;
  });
}

/**
 * point 规定格式 {x:0,y:0}
 * direction 规定格式 's/w/e/n'
 * 返回edge的一些option:
 * edge.el 本身的props，还有重新计算过的始终点坐标（基于新的edge坐标系）
 *
 * @param  {[type]} opts
 * {
 *   src: { point: {x,y} , direction:''},
 *   dst: { point: {x,y} , direction:''}
 * }
 * @return {[type]}      [description]
 */
function calcStraightLinePath(opts) {

  let source = opts.src;
  let target = opts.dst;

  let sourcePoint = source.point;
  let targetPoint = target.point;

  let style = {
    x: min(sourcePoint.x, targetPoint.x),
    y: min(sourcePoint.y, targetPoint.y),
    width: abs(targetPoint.x - sourcePoint.x),
    height: abs(targetPoint.y - sourcePoint.y)
  };

  let points = [];
  points.push(coordTransform(sourcePoint));
  points.push(coordTransform(targetPoint));

  expandEdge(style, POINT_CUT_DISTANCE);
  doTranslatePoints(points, {
    x: -style.x,
    y: -style.y
  });

  return {
    style: style,
    attr: {
      points: points
    }
  };
}

function endDirection(startX, startY, endX, endY) {
  if (startX === endX) {
    if (endY > startY) {
      return 'n';
    } else {
      return 's';
    }
  } else {
    if (endX > startX) {
      return 'w';
    } else {
      return 'e';
    }
  }
}

function calcLinePath(type, opts) {
  if (type === 'broken') {
    let points = getPoints(opts.src, opts.dst); // [{x,y}, {x,y}...]
    return combinePoints.apply(this, points);
  } else {
    return calcStraightLinePath(opts);
  }
}

var directionConstant = {
  NORTH_EAST: 'north_east', //东北
  SOUTH_EAST: 'south_east', //东南
  SOUTH_WEST: 'south_west', //西南
  NORTH_WEST: 'north_west' //西北
};

function generateParameters(source, target) {
  var r = POINT_CUT_DISTANCE;
  var Sx = source.point.x + r * 0;
  var Sy = source.point.y + r * 0;
  var Sw = parseInt(source.boundry.width); //起(源)始节点宽度
  var Sh = parseInt(source.boundry.height); //起(源)始节点高度
  var Tx = target.point.x + r * 0;
  var Ty = target.point.y + r * 0;
  var Tw = parseInt(target.boundry.width); //目标（终）节点宽度
  var Th = parseInt(target.boundry.height); //目标（终）节点高度
  var Vd = Ty - Sy; //垂直距离
  var Hd = Tx - Sx; //水平距离
  var direction = getdirection(Sx, Sy, Tx, Ty);
  return {
    Sx: Sx, //起(源)点横坐标
    Sy: Sy, //起(源)点纵坐标
    Sw: Sw, //起(源)始节点宽度
    Sh: Sh, //起(源)始节点高度
    Tx: Tx, //目标（终）点横坐标
    Ty: Ty, //目标（终）点纵坐标
    Tw: Tw, //目标（终）节点宽度
    Th: Th, //目标（终）节点高度
    Hd: Hd, //起点到目标点的水平距离
    Vd: Vd, //起点到目标点的垂直距离
    direction: direction, //起点到目标（终）点的方向
    first: {}, //起(源)点到目标（终）点 经过的第一个点
    second: {}, //起(源)点到目标（终）点 经过的第二个点
    third: {}, //起(源)点到目标（终）点 经过的第三个点
    fourth: {}, //起(源)点到目标（终）点 经过的第四个点
    fifth: {}, //起(源)点到目标（终）点 经过的第五个点
    points: [] //起(源)点到目标（终）点 经过的所有点
  };
}

/**
 * {
 *   source: { point:{x,y}, direction:'', boundry:{x,y,width,height}},
 *   target: { point:{x,y}, direction:'', boundry:{x,y,width,height}}
 * }
 * 获取起点到终点的连线中所有连接点
 * 按照16连线方式来写，这样写会清晰一点，有部分算法逻辑有冗余，建议不合并，因为合并之后，逻辑更复杂，时间久了看着晕
 */
function getPoints(source, target) {
  var params = generateParameters(source, target);
  if (source.direction == 'n' && target.direction == 'n') {
    return T2T(params);
  }
  if (source.direction == 'n' && target.direction == 'w') {
    return T2L(params);
  }
  if (source.direction == 'n' && target.direction == 's') {
    return T2B(params);
  }
  if (source.direction == 'n' && target.direction == 'e') {
    return T2R(params);
  }
  if (source.direction == 'w' && target.direction == 'w') {
    return L2L(params);
  }
  if (source.direction == 'w' && target.direction == 's') {
    return L2B(params);
  }
  if (source.direction == 'w' && target.direction == 'e') {
    return L2R(params);
  }
  if (source.direction == 'w' && target.direction == 'n') {
    return L2T(params);
  }
  if (source.direction == 's' && target.direction == 'w') {
    return B2L(params);
  }
  if (source.direction == 's' && target.direction == 's') {
    return B2B(params);
  }
  if (source.direction == 's' && target.direction == 'e') {
    return B2R(params);
  }
  if (source.direction == 's' && target.direction == 'n') {
    return B2T(params);
  }
  if (source.direction == 'e' && target.direction == 'e') {
    return R2R(params);
  }
  if (source.direction == 'e' && target.direction == 'w') {
    return R2L(params);
  }
  if (source.direction == 'e' && target.direction == 'n') {
    return R2T(params);
  }
  if (source.direction == 'e' && target.direction == 's') {
    return R2B(params);
  }
}

/*
   将连线上的所有点，按顺序添加到数组中。
*/
function addPoints(params) {
  var sourcePoint = {
    x: params.Sx,
    y: params.Sy
  };
  var targetPoint = {
    x: params.Tx,
    y: params.Ty
  };
  params.points.push(sourcePoint);
  params.points.push(params.first);
  if (JSON.stringify(params.second) != '{}') {
    params.points.push(params.second);
  }
  if (JSON.stringify(params.third) != '{}') {
    params.points.push(params.third);
  }
  if (JSON.stringify(params.fourth) != '{}') {
    params.points.push(params.fourth);
  }
  if (JSON.stringify(params.fifth) != '{}') {
    params.points.push(params.fifth);
  }
  params.points.push(targetPoint);
  return params.points;
}

/*
   源点和目标点的方向分为东、西、南、北、西南、西北、东南、东北。
   为了简化方向的逻辑处理，“东”归为“东南” “南”归为“东南” “西”归为“西南” “中”归为西南 “北”归为“东北”
*/
function getdirection(Sx, Sy, Tx, Ty) {
  var Vd = Ty - Sy; //垂直距离
  var Hd = Tx - Sx; //水平距离
  if (Vd >= 0 && Hd >= 0) {
    return directionConstant.SOUTH_EAST;
  }
  if (Vd >= 0 && Hd < 0) {
    return directionConstant.SOUTH_WEST;
  }
  if (Vd < 0 && Hd >= 0) {
    return directionConstant.NORTH_EAST;
  }
  if (Vd < 0 && Hd < 0) {
    return directionConstant.NORTH_WEST;
  }
}

//e --> s
function R2B(params) {
  var minW = params.Sw / 2 + params.Tw;
  if (params.direction == directionConstant.SOUTH_EAST) {
    var distance = params.Hd - params.Tw / 2;
    if (distance > 0) {
      params.first['x'] = params.Sx + distance / 2;
    } else {
      params.first['x'] = params.Tx + params.Tw / 2 + rectMargin;
    }
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    params.second['y'] = params.Ty + rectMargin;
    params.third['x'] = params.Tx;
    params.third['y'] = params.second.y;
  }

  if (params.direction == directionConstant.NORTH_EAST) {
    params.first['x'] = params.Tx;
    params.first['y'] = params.Sy;
  }
  if (params.direction == directionConstant.SOUTH_WEST) {
    params.first['x'] = params.Sx + rectMargin;
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    if (params.Ty < params.Sy + params.Sh / 2) {
      params.second['y'] = params.Sy + params.Sh / 2 + rectMargin;
    } else {
      params.second['y'] = params.Ty + rectMargin;
    }
    params.third['x'] = params.Tx;
    params.third['y'] = params.second.y;
  }
  if (params.direction == directionConstant.NORTH_WEST) {
    params.first['x'] = params.Sx + rectMargin;
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    var distance = Math.abs(params.Vd) - params.Sh / 2;
    if (distance > 0) {
      params.second['y'] = params.Ty + distance / 2;
    } else {
      params.second['y'] = params.Sy + params.Sh / 2 + rectMargin;
    }
    params.third['x'] = params.Tx;
    params.third['y'] = params.second.y;
  }

  return addPoints(params);
}

//e --> n
function R2T(params) {
  var minW = params.Sw / 2 + params.Tw;
  if (params.direction == directionConstant.NORTH_EAST) {
    var distance = params.Hd - params.Tw / 2;
    if (distance > 0) {
      params.first['x'] = params.Sx + distance / 2;
    } else {
      params.first['x'] = params.Tx + params.Tw / 2 + rectMargin;
    }
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    params.second['y'] = params.Ty - rectMargin;
    params.third['x'] = params.Tx;
    params.third['y'] = params.second.y;
  }

  if (params.direction == directionConstant.SOUTH_EAST) {
    params.first['x'] = params.Tx;
    params.first['y'] = params.Sy;
  }
  if (params.direction == directionConstant.SOUTH_WEST || params.direction == directionConstant.NORTH_WEST) {
    params.first['x'] = params.Sx + rectMargin;
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    if (params.direction == directionConstant.SOUTH_WEST) {
      var distance = params.Vd - params.Sh / 2;
      if (distance > 0) {
        params.second['y'] = params.Ty - distance / 2;
      } else {
        params.second['y'] = params.Sy - params.Sh / 2 - rectMargin;
      }
    } else {
      if (params.Ty > params.Sy - params.Sh / 2) {
        params.second['y'] = params.Sy - params.Sh / 2 - rectMargin;
      } else {
        params.second['y'] = params.Ty - rectMargin;
      }
    }

    params.third['x'] = params.Tx;
    params.third['y'] = params.second.y;
  }
  return addPoints(params);
}


//e --> w
function R2L(params) {
  var minW = params.Sw / 2 + params.Tw;
  if (params.direction == directionConstant.NORTH_WEST || params.direction == directionConstant.SOUTH_WEST) {
    params.first['x'] = params.Sx + rectMargin;
    params.first['y'] = params.Sy;
    var distance = Math.abs(params.Vd) - params.Sh / 2 - params.Th / 2;
    params.second['x'] = params.first.x;
    if (params.direction == directionConstant.NORTH_WEST) {
      params.second['y'] = distance > 0 ? params.Sy - params.Sh / 2 - distance / 2 : params.Sy + params.Sh / 2 + rectMargin;
    } else {
      params.second['y'] = distance > 0 ? params.Sy + params.Sh / 2 + distance / 2 : params.Sy - params.Sh / 2 - rectMargin;
    }
    params.third['x'] = params.Tx - rectMargin;
    params.third['y'] = params.second.y;
    params.fourth['x'] = params.third.x;
    params.fourth['y'] = params.Ty;
  }
  if (params.direction == directionConstant.NORTH_EAST || params.direction == directionConstant.SOUTH_EAST) {
    params.first['x'] = params.Sx + params.Hd / 2;
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    params.second['y'] = params.Ty;
  }
  return addPoints(params);
}

//e -->e
function R2R(params) {
  var minW = params.Sw / 2 + params.Tw;
  if (params.direction == directionConstant.NORTH_WEST || params.direction == directionConstant.SOUTH_WEST) {
    params.first['x'] = params.Sx + rectMargin;
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    if (params.Sy + params.Sh / 2 + rectMargin > params.Ty && params.Ty > params.Sy - params.Sh / 2 - rectMargin) {
      if (params.direction == directionConstant.NORTH_EAST) {
        params.second['y'] = params.Sy - params.Sh / 2 - rectMargin;
      } else {
        params.second['y'] = params.Sy + params.Sh / 2 + rectMargin;
      }
      params.third['x'] = params.Tx + rectMargin;
      params.third['y'] = params.second.y;
      params.fourth['x'] = params.third.x;
      params.fourth['y'] = params.Ty;
    } else {
      params.second['y'] = params.Ty;
    }
  }

  if (params.direction == directionConstant.NORTH_EAST || params.direction == directionConstant.SOUTH_EAST) {

    params.first['y'] = params.Sy;
    if (params.Sy - params.Sh / 2 - rectMargin < params.Ty && params.Ty < params.Sy + params.Sh / 2 + rectMargin) {
      params.first['x'] = params.Sx + rectMargin;
      params.second['x'] = params.first.x;
      if (params.direction == directionConstant.NORTH_WEST) {
        params.second['y'] = params.Ty + params.Th / 2 + rectMargin;
      } else {
        params.second['y'] = params.Ty + params.Th / 2 + rectMargin;
      }
      params.third['x'] = params.Tx + rectMargin;
      params.third['y'] = params.second.y;
      params.fourth['x'] = params.third.x;
      params.fourth['y'] = params.Ty;
    } else {
      params.first['x'] = params.Tx + rectMargin;
      params.second['x'] = params.first.x;
      params.second['y'] = params.Ty;
    }
  }
  return addPoints(params);
}

//s -->n
function B2T(params) {
  if (params.direction == directionConstant.NORTH_EAST || params.direction == directionConstant.NORTH_WEST) {
    var Hd = Math.abs(params.Hd) - params.Sw / 2 - params.Tw / 2;
    params.first['x'] = params.Sx;
    if (Hd > 0) {
      params.first['y'] = params.Sy + rectMargin;
      if (params.direction == directionConstant.NORTH_EAST) {
        params.second['x'] = params.Sx + params.Sw / 2 + Hd / 2;
      } else {
        params.second['x'] = params.Sx - params.Sw / 2 - Hd / 2;
      }
    } else {
      if (params.Sy < params.Ty + params.Th) {
        params.first['y'] = params.Ty + params.Th + rectMargin;
      } else {
        params.first['y'] = params.Sy + rectMargin;
      }
      if (params.direction == directionConstant.NORTH_EAST) {
        params.second['x'] = params.Tx + params.Tw / 2 + rectMargin;
      } else {
        params.second['x'] = params.Tx - params.Tw / 2 - rectMargin;
      }

    }
    params.second['y'] = params.first.y;
    params.third['x'] = params.second.x;
    params.third['y'] = params.Ty - rectMargin;
    params.fourth['x'] = params.Tx;
    params.fourth['y'] = params.third.y;
  }
  if (params.direction == directionConstant.SOUTH_WEST || params.direction == directionConstant.SOUTH_EAST) {
    params.first['x'] = params.Sx;
    params.first['y'] = params.Sy + params.Vd / 2;
    params.second['x'] = params.Tx;
    params.second['y'] = params.first.y;
  }

  return addPoints(params);
}

//s -->e
function B2R(params) {
  var minW = params.Sw / 2 + params.Tw / 2;
  if (params.direction == directionConstant.NORTH_EAST) {
    params.first['x'] = params.Sx;
    params.first['y'] = params.Sy + rectMargin;
    if (params.Hd > params.Sw / 2) {
      params.second['x'] = params.Tx + rectMargin;
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty;
    } else {
      params.second['x'] = params.Sx + params.Sw / 2 + rectMargin;
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty;
    }
    params.second['y'] = params.first.y;

  }

  if (params.direction == directionConstant.SOUTH_EAST) {
    params.first['x'] = params.Sx;
    var distance = params.Vd - params.Th / 2;
    if (distance > 0) {
      params.first['y'] = params.Sy + distance / 2;
    } else {
      params.first['y'] = params.Ty + params.Th / 2 + rectMargin;
    }
    params.second['x'] = params.Tx + rectMargin;
    params.second['y'] = params.first.y;
    params.third['x'] = params.second.x;
    params.third['y'] = params.Ty;

  }

  if (params.direction == directionConstant.NORTH_WEST) {
    params.first['x'] = params.Sx;
    params.first['y'] = params.Sy + rectMargin;
    if (Math.abs(params.Hd) < params.Sw / 2) {
      params.second['x'] = params.Sx + params.Sw / 2 + rectMargin;
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty;
    } else {
      params.second['x'] = params.Tx + rectMargin;
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty;
    }
    params.second['y'] = params.first.y;
  }

  if (params.direction == directionConstant.SOUTH_WEST) {
    params.first['x'] = params.Sx;
    params.first['y'] = params.Ty;
  }
  return addPoints(params);
}

//s -->s
function B2B(params) {

  if (params.direction == directionConstant.NORTH_WEST || params.direction == directionConstant.NORTH_EAST) {
    params.first['x'] = params.Sx;
    params.first['y'] = params.Sy + rectMargin;
    if (Math.abs(params.Hd) < params.Sw / 2) {
      if (params.direction == directionConstant.NORTH_WEST) {
        params.second['x'] = params.Sx - params.Sw / 2 - rectMargin;
      } else {
        params.second['x'] = params.Sx + params.Sw / 2 + rectMargin;
      }
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty + rectMargin;
      params.fourth['x'] = params.Tx;
      params.fourth['y'] = params.third.y;
    } else {
      params.second['x'] = params.Tx;
    }
    params.second['y'] = params.first.y;
  }

  if (params.direction == directionConstant.SOUTH_EAST || params.direction == directionConstant.SOUTH_WEST) {
    params.first['x'] = params.Sx;
    if (Math.abs(params.Hd) < params.Sw / 2) {
      params.first['y'] = params.Sy + rectMargin;
      if (params.direction == directionConstant.SOUTH_EAST) {
        params.second['x'] = params.Tx - params.Sw / 2 - rectMargin;
      } else {
        params.second['x'] = params.Tx + params.Sw / 2 + rectMargin;
      }
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty + rectMargin;
      params.fourth['x'] = params.Tx;
      params.fourth['y'] = params.third.y;
    } else {
      params.first['y'] = params.Ty + rectMargin;
      params.second['x'] = params.Tx;
    }
    params.second['y'] = params.first.y;
  }


  return addPoints(params);
}


//s -->w
function B2L(params) {

  if (params.direction == directionConstant.NORTH_EAST) {
    params.first['x'] = params.Sx;
    params.first['y'] = params.Sy + rectMargin;
    params.second['y'] = params.first.y;
    var Hd = params.Tx - params.Sx - params.Sw / 2;
    if (Hd > 0) {
      params.second['x'] = params.Sx + params.Sw / 2 + Hd / 2;
    } else {
      params.second['x'] = params.Sx - params.Sw / 2 - rectMargin;
    }
    params.third['x'] = params.second.x;
    params.third['y'] = params.Ty;
  }

  if (params.direction == directionConstant.SOUTH_EAST) {
    params.first['x'] = params.Sx;
    params.first['y'] = params.Ty;
  }
  if (params.direction == directionConstant.SOUTH_WEST || params.direction == directionConstant.NORTH_WEST) {
    params.first['x'] = params.Sx;
    var Vd = Math.abs(params.Ty - params.Sy) - params.Th / 2;
    if (Vd > 0) {
      if (params.direction == directionConstant.SOUTH_WEST) {
        params.first['y'] = params.Sy + Vd / 2;
      } else {
        params.first['y'] = params.Sy + rectMargin;
      }
    } else {
      params.first['y'] = params.Ty + params.Th / 2 + rectMargin;
    }
    params.second['x'] = params.Tx - rectMargin;
    params.second['y'] = params.first.y;
    params.third['x'] = params.second.x;
    params.third['y'] = params.Ty;
  }
  return addPoints(params);
}

//w -->n
function L2T(params) {
  if (params.direction == directionConstant.NORTH_EAST) {
    params.first['x'] = params.Sx - rectMargin;
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    if (params.Sy - params.Ty - params.Sh / 2 > 0) {
      params.second['y'] = params.Ty - rectMargin;
    } else {
      params.second['y'] = params.Sy - params.Sh / 2 - rectMargin;
    }
    params.third['x'] = params.Tx;
    params.third['y'] = params.second.y;
  }

  if (params.direction == directionConstant.SOUTH_EAST) {
    var Vd = params.Ty - params.Sy - params.Sh / 2;
    params.first['x'] = params.Sx - rectMargin;
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    if (Vd > 0) {
      params.second['y'] = params.Sy + params.Sh / 2 + Vd / 2;
    } else {
      params.second['y'] = params.Sy - params.Sh / 2 - rectMargin;
    }
    params.third['x'] = params.Tx;
    params.third['y'] = params.second.y;
  }

  if (params.direction == directionConstant.NORTH_WEST) {
    var Hd = params.Sx - params.Tx - params.Sw / 2; //水平距离
    if (params.Hd < rectMargin) {
      if (Hd < 0) {
        params.first['x'] = params.Tx - params.Th / 2 - rectMargin;
      } else {
        params.first['x'] = params.Sx - Hd / 2;
      }
    } else {
      params.first['x'] = params.Sx - rectMargin;
    }
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    params.second['y'] = params.Ty - rectMargin;
    params.third['x'] = params.Tx;
    params.third['y'] = params.second.y;
  }

  if (params.direction == directionConstant.SOUTH_WEST) {
    params.first['x'] = params.Tx;
    params.first['y'] = params.Sy;
  }
  return addPoints(params);
}

//w -->e
function L2R(params) {
  if (params.direction == directionConstant.NORTH_EAST) {
    params.first['x'] = params.Sx - rectMargin;
    params.first['y'] = params.Sy;
    var distance = Math.abs(params.Vd) - params.Sh / 2 - params.Th / 2;
    if (distance > 0) {
      params.second['x'] = params.first.x;
      params.second['y'] = params.Sy - params.Sh / 2 - distance / 2;
      params.third['x'] = params.Tx + rectMargin;
      params.third['y'] = params.second.y;
      params.fourth['x'] = params.third.x;
      params.fourth['y'] = params.Ty;
    } else {
      params.second['x'] = params.first.x;
      params.second['y'] = params.Sy + params.Sh / 2 + rectMargin;
      params.third['x'] = params.Tx + rectMargin;
      params.third['y'] = params.second.y;
      params.fourth['x'] = params.third.x;
      params.fourth['y'] = params.Ty;
    }
  }
  if (params.direction == directionConstant.SOUTH_EAST) {
    params.first['x'] = params.Sx - rectMargin;
    params.first['y'] = params.Sy;
    var distance = Math.abs(params.Vd) - params.Sh / 2 - params.Th / 2;
    if (distance > 0) {
      params.second['x'] = params.first.x;
      params.second['y'] = params.Sy + params.Sh / 2 + distance / 2;

      params.third['x'] = params.Tx + rectMargin;
      params.third['y'] = params.second.y;
      params.fourth['x'] = params.third.x;
      params.fourth['y'] = params.Ty;
    } else {
      params.second['x'] = params.first.x;
      params.second['y'] = params.Sy - params.Sh / 2 - rectMargin;
      params.third['x'] = params.Tx + rectMargin;
      params.third['y'] = params.second.y;
      params.fourth['x'] = params.third.x;
      params.fourth['y'] = params.Ty;
    }
  }
  if (params.direction == directionConstant.NORTH_WEST || params.direction == directionConstant.SOUTH_WEST) {
    params.first['x'] = params.Sx + params.Hd / 2;
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    params.second['y'] = params.Ty;
  }
  return addPoints(params);
}

//w -->s
function L2B(params) {
  if (params.Hd > 0) {
    params.first['x'] = params.Sx - rectMargin;
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    if ((params.Vd - params.Sh / 2) > 0) {
      params.second['y'] = params.Ty + rectMargin;
    } else if ((Math.abs(params.Vd) - params.Sh / 2) > 0) {
      params.second['y'] = params.Sy - params.Sh / 2 - (Math.abs(params.Vd) - params.Sh / 2) / 2;
    } else {
      params.second['y'] = params.Sy + params.Sh / 2 + rectMargin;
    }
    params.third['x'] = params.Tx;
    params.third['y'] = params.second.y;
  } else {
    params.first['y'] = params.Sy;
    if (Math.abs(params.Hd) < params.Tw / 2) {
      if (params.Vd > 0) {
        params.first['x'] = params.Tx - params.Tw / 2 - rectMargin;
        params.second['x'] = params.first.x;
        params.second['y'] = params.Ty + rectMargin;
        params.third['x'] = params.Tx;
        params.third['y'] = params.second.y;
      } else {
        params.first['x'] = params.Tx;
      }

    } else {
      if (params.Vd < 0 && Math.abs(params.Vd) > rectMargin) {
        params.first['x'] = params.Tx;
      } else {
        params.first['x'] = params.Sx - rectMargin;
        params.second['x'] = params.first.x;
        params.second['y'] = params.Ty + rectMargin;
        params.third['x'] = params.Tx;
        params.third['y'] = params.second.y;
      }
    }
  }
  return addPoints(params);
}


//w -->w
function L2L(params) {
  if (params.direction == directionConstant.NORTH_EAST || params.direction == directionConstant.SOUTH_EAST) {
    params.first['x'] = params.Sx - rectMargin;
    params.first['y'] = params.Sy;
    params.second['x'] = params.first.x;
    if (params.Sy + params.Sh / 2 + rectMargin > params.Ty && params.Ty > params.Sy - params.Sh / 2 - rectMargin) {
      if (params.direction == directionConstant.NORTH_EAST) {
        params.second['y'] = params.Sy - params.Sh / 2 - rectMargin;
      } else {
        params.second['y'] = params.Sy + params.Sh / 2 + rectMargin;
      }
      params.third['x'] = params.Tx - rectMargin;
      params.third['y'] = params.second.y;
      params.fourth['x'] = params.third.x;
      params.fourth['y'] = params.Ty;
    } else {
      params.second['y'] = params.Ty;
    }
  }

  if (params.direction == directionConstant.NORTH_WEST || params.direction == directionConstant.SOUTH_WEST) {

    params.first['y'] = params.Sy;
    if (params.Sy - params.Sh / 2 - rectMargin < params.Ty && params.Ty < params.Sy + params.Sh / 2 + rectMargin) {
      params.first['x'] = params.Sx - rectMargin;
      params.second['x'] = params.first.x;
      if (params.direction == directionConstant.NORTH_WEST) {
        params.second['y'] = params.Ty + params.Th / 2 + rectMargin;
      } else {
        params.second['y'] = params.Ty + params.Th / 2 + rectMargin;
      }
      params.third['x'] = params.Tx - rectMargin;
      params.third['y'] = params.second.y;
      params.fourth['x'] = params.third.x;
      params.fourth['y'] = params.Ty;
    } else {
      params.first['x'] = params.Tx - rectMargin;
      params.second['x'] = params.first.x;
      params.second['y'] = params.Ty;
    }
  }
  return addPoints(params);
}

//n -->e
function T2R(params) {
  var Vd = Math.abs(params.Ty - params.Sy) - params.Th / 2;

  if (params.direction == directionConstant.NORTH_EAST || params.direction == directionConstant.SOUTH_EAST) {
    var Hd = Math.abs(params.Tx - params.Sx);
    params.first['x'] = params.Sx;
    if (params.direction == directionConstant.NORTH_EAST) {
      params.first['y'] = Vd > 0 ? params.Sy - Vd / 2 : params.Ty - rectMargin - params.Th / 2;
    } else {
      params.first['y'] = Vd > rectMargin ? params.Sy - rectMargin : params.Ty - rectMargin - params.Th / 2;
    }
    if (Hd > params.Sw / 2) {
      params.second['x'] = params.Tx + rectMargin;
    } else {
      params.second['x'] = params.Sx + params.Sw / 2 + rectMargin;
    }

    params.second['y'] = params.first.y;
    params.third['x'] = params.second.x;
    params.third['y'] = params.Ty;
  }

  if (params.direction == directionConstant.NORTH_WEST) {
    params.first['x'] = params.Sx;
    params.first['y'] = params.Ty;
  }

  if (params.direction == directionConstant.SOUTH_WEST) {
    var Hd = params.Sx - params.Tx - params.Sw / 2;
    params.first['x'] = params.Sx;
    params.first['y'] = params.Sy - rectMargin;
    params.second['x'] = Hd < 0 ? params.Sx + params.Sw / 2 + rectMargin : params.Sx - params.Sw / 2 - Hd / 2;
    params.second['y'] = params.first.y;
    params.third['x'] = params.second.x;
    params.third['y'] = params.Ty;
  }
  return addPoints(params);
}

//n -->s
function T2B(params) {
  if (params.direction == directionConstant.SOUTH_EAST || params.direction == directionConstant.SOUTH_WEST) {
    var Hd = Math.abs(params.Hd) - params.Sw / 2 - params.Tw / 2;
    params.first['x'] = params.Sx;
    if (Hd > 0) {
      params.first['y'] = params.Sy - rectMargin;
      if (params.direction == directionConstant.SOUTH_EAST) {
        params.second['x'] = params.Sx + params.Sw / 2 + Hd / 2;
      } else {
        params.second['x'] = params.Sx - params.Sw / 2 - Hd / 2;
      }
    } else {
      if (params.Sy < params.Ty + params.Th) {
        params.first['y'] = params.Sy - rectMargin;
      } else {
        params.first['y'] = params.Ty + params.Th + rectMargin;
      }
      if (params.direction == directionConstant.SOUTH_EAST) {
        params.second['x'] = params.Tx + params.Tw / 2 + rectMargin;
      } else {
        params.second['x'] = params.Tx - params.Tw / 2 - rectMargin;
      }

    }
    params.second['y'] = params.first.y;
    params.third['x'] = params.second.x;
    params.third['y'] = params.Ty + rectMargin;
    params.fourth['x'] = params.Tx;
    params.fourth['y'] = params.third.y;
  }
  if (params.direction == directionConstant.NORTH_WEST || params.direction == directionConstant.NORTH_EAST) {
    params.first['x'] = params.Sx;
    params.first['y'] = params.Sy + params.Vd / 2;
    params.second['x'] = params.Tx;
    params.second['y'] = params.first.y;
  }

  return addPoints(params);
}

//n -->w
function T2L(params) {
  var minW = params.Sw / 2 + 5;
  params.first['x'] = params.Sx;
  params.first['y'] = params.Sy - rectMargin;
  var Hd = Math.abs(params.Hd) - params.Sw / 2;
  var Vd = Math.abs(params.Vd) - params.Th / 2;
  if (params.direction == directionConstant.SOUTH_EAST) {
    if (Hd < rectMargin) {
      params.second['x'] = params.first.x - minW + Hd;
      ;
      params.second['y'] = params.first.y;
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty;
    } else {
      params.second['x'] = params.Tx - Hd / 2;
      params.second['y'] = params.first.y;
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty;
    }
  }

  if (params.direction == directionConstant.NORTH_EAST) {
    params.second['x'] = params.first.x;
    params.second['y'] = params.Ty;
  }

  if (params.direction == directionConstant.SOUTH_WEST) {
    if (Hd < rectMargin) {
      params.second['x'] = params.first.x - rectMargin - params.Sw / 2;
      ;
      params.second['y'] = params.first.y;
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty;
    } else {
      if (Vd > rectMargin) {
        params.second['x'] = params.Tx - rectMargin;
        params.second['y'] = params.first.y;
        params.third['x'] = params.second.x;
        params.third['y'] = params.Ty;
      } else {
        params.second['x'] = params.first.x;
        params.second['y'] = params.Ty - rectMargin - params.Th / 2;
        params.third['x'] = params.Tx - rectMargin;
        params.third['y'] = params.second.y;
        params.fourth['x'] = params.third.x;
        params.fourth['y'] = params.Ty;
      }
    }
  }
  if (params.direction == directionConstant.NORTH_WEST) {
    if (Vd < rectMargin) {
      params.second['x'] = params.first.x;
      params.second['y'] = params.Ty - rectMargin - params.Th / 2;
      params.third['x'] = params.Tx - rectMargin;
      params.third['y'] = params.second.y;
      params.fourth['x'] = params.Tx - rectMargin;
      params.fourth['y'] = params.Ty;
    } else {
      params.second['x'] = params.Tx - rectMargin;
      ;
      params.second['y'] = params.first.y;
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty;
    }
  }
  return addPoints(params);
}


//n -->n
function T2T(params) {

  if (params.direction == directionConstant.SOUTH_WEST || params.direction == directionConstant.SOUTH_EAST) {
    params.first['x'] = params.Sx;
    params.first['y'] = params.Sy - rectMargin;
    if (Math.abs(params.Hd) < params.Sw / 2) {
      if (params.direction == directionConstant.SOUTH_WEST) {
        params.second['x'] = params.Sx - params.Sw / 2 - rectMargin;
      } else {
        params.second['x'] = params.Sx + params.Sw / 2 + rectMargin;
      }
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty - rectMargin;
      params.fourth['x'] = params.Tx;
      params.fourth['y'] = params.third.y;
    } else {
      params.second['x'] = params.Tx;
    }
    params.second['y'] = params.first.y;
  }

  if (params.direction == directionConstant.NORTH_EAST || params.direction == directionConstant.NORTH_WEST) {
    params.first['x'] = params.Sx;
    if (Math.abs(params.Hd) < params.Sw / 2) {
      params.first['y'] = params.Sy - rectMargin;
      if (params.direction == directionConstant.NORTH_EAST) {
        params.second['x'] = params.Tx - params.Sw / 2 - rectMargin;
      } else {
        params.second['x'] = params.Tx + params.Sw / 2 + rectMargin;
      }
      params.third['x'] = params.second.x;
      params.third['y'] = params.Ty - rectMargin;
      params.fourth['x'] = params.Tx;
      params.fourth['y'] = params.third.y;
    } else {
      params.first['y'] = params.Ty - rectMargin;
      params.second['x'] = params.Tx;
    }
    params.second['y'] = params.first.y;
  }
  return addPoints(params);
}

function getBeveling(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function drawDashLine(ctx, x1, y1, x2, y2, dashLen) {
  dashLen = dashLen ? dashLen : 5;
  //得到斜边的总长度
  var beveling = getBeveling(x2 - x1, y2 - y1);
  //计算有多少个线段
  var num = Math.floor(beveling / dashLen);

  for (var i = 0; i < num; i++) {
    ctx[i % 2 == 0 ? 'moveTo' : 'lineTo'](x1 + (x2 - x1) / num * i, y1 + (y2 - y1) / num * i);
  }
}

/**
 * 直线方程
 * ax+by=c => a, b, c 表示
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
function lineEquation(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
}

lineEquation.prototype.getX = function (y) {
  return (this.c - this.b * y) / this.a;
};

lineEquation.prototype.getY = function (x) {
  return (this.c - this.a * x) / this.b;
};

function transPointToLine(pointA, pointB) {
  let x1 = pointA[0];
  let y1 = pointA[1];
  let x2 = pointB[0];
  let y2 = pointB[1];
  let a = y2 - y1;
  let b = x1 - x2;
  let c = x1 * y2 - x2 * y1;
  return new lineEquation(a, b, c);
}

function didSelectLine(points, mouseX, mouseY, scale) {
  let mouseXX = mouseX / scale;
  let mouseYY = mouseY / scale;
  for (let i = 1; i < points.length; i++) {
    let line = transPointToLine(points[i - 1], points[i]);
    if (line.b === 0) {
      let x = line.getX(mouseY / scale);
      let minY = Math.min(points[i - 1][1], points[i][1]);
      let maxY = Math.max(points[i - 1][1], points[i][1]);
      if (abs(x - mouseXX) <= LINE_SELECT_OFFSET / scale
        && mouseYY > minY && mouseYY < maxY) {
        return true;
      }
    } else {
      let y = line.getY(mouseX / scale);
      let minX = Math.min(points[i - 1][0], points[i][0]);
      let maxX = Math.max(points[i - 1][0], points[i][0]);
      if (abs(y - mouseYY) <= LINE_SELECT_OFFSET / scale
        && mouseXX > minX && mouseXX < maxX) {
        return true;
      }
    }
  }
}

export { calcLinePath, endDirection, drawDashLine, didSelectLine };
