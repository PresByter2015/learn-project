/**
 * 节点类
 * nw ------ n ------ ne
 * |                  |
 * |                  |
 * w       center     e
 * |                  |
 * |                  |
 * sw ------ s ------ se
 */
class Node {
  constructor(id, options = {}) {
    this.id = id;
    this.options = options;

    /**
     * 坐标系信息
     */
    this._coords = {
      x: options.x || 0,
      y: options.y || 0,
      width: options.width,
      height: options.height,
      rotate: 0
    };
  }

  get coords() {
    return this._coords;
  }

  /**
   * 设置坐标信息
   *
   * @param data
   * @returns {{x: number, y: number, w: number, h: number, scale: number, rotate: number}|*}
   */
  set coords(data) {
    Object.assign(this._coords, data);

    return this._coords;
  }

  get x() {
    return this._coords.x;
  }

  get y() {
    return this._coords.y;
  }

  get width() {
    return this._coords.width;
  }

  get height() {
    return this._coords.height;
  }

  /**
   * 更新位置
   * @param coords
   */
  update(coords = {}) {
    this.coords = coords;
  }

  /**
   * east
   * @returns {{x: *, y: *}}
   */
  get e() {
    return {
      x: this.x + this.width,
      y: this.y + this.height / 2
    };
  }

  /**
   * south
   * @returns {{x: *, y: *}}
   */
  get s() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height
    };
  }

  /**
   * west
   * @returns {{x: *, y: *}}
   */
  get w() {
    return {
      x: this.x,
      y: this.y + this.height / 2
    };
  }

  /**
   * north
   * @returns {{x: *, y: *}}
   */
  get n() {
    return {
      x: this.x + this.width / 2,
      y: this.y
    };
  }

  /**
   * center
   * @returns {{x: *, y: *}}
   */
  get c() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
  }

  /**
   * 东南角位置
   * @returns {{x: number, y: number}}
   */
  get se() {
    return {
      x: this.x + this.width,
      y: this.y + this.height
    };
  }

  /**
   * 东北角位置
   * @returns {{x: number, y: number}}
   */
  get ne() {
    return {
      x: this.x + this.width,
      y: this.y
    };
  }

  /**
   * 西北角位置
   * @returns {{x: number, y: number}}
   */
  get nw() {
    return {
      x: this.x,
      y: this.y
    };
  }

  /**
   * 西南角位置
   * @returns {{ x: number, y: number }}
   */
  get sw() {
    return {
      x: this.x,
      y: this.y + this.height
    };
  }
}

/**
 * node控制点相对方位坐标
 * @param  {[type]} props  [description]
 * @param  {[type]} RADIUS [description]
 * @return {[type]}        [description]
 */
Node.relativeDirectionPoints = function (props, RADIUS) {
  return {
    coords: props,
    ne: {
      x: props.width - RADIUS,
      y: -RADIUS
    },
    se: {
      x: props.width - RADIUS,
      y: props.height - RADIUS
    },
    sw: {
      x: -RADIUS,
      y: props.height - RADIUS
    },
    nw: {
      x: -RADIUS,
      y: -RADIUS
    },
    n: {
      x: props.width / 2 - RADIUS,
      y: -RADIUS
    },
    e: {
      x: props.width - RADIUS,
      y: props.height / 2 - RADIUS
    },
    s: {
      x: props.width / 2 - RADIUS,
      y: props.height - RADIUS
    },
    w: {
      x: -RADIUS,
      y: props.height / 2 - RADIUS
    }
  };
};

Node.isTopoNode = function (node) {
  return node.chart.type === 'mold';
};

Node.isTopoEdge = function (node) {
  return node.chart.type === 'edge';
};

export default Node;
