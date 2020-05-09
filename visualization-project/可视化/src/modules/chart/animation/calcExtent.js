export const requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

export const cancelAnimationFrame = (function () {
  return window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame;
})();

export function wave(extent = 0.1) {
  let mod = false;
  return function (ary) {
    mod = !mod;
    return ary && ary.map((item) => {
      if (mod) {
        item = item && item.map((child, index) => {
          child = Number(child) || 0;
          if (index % 2 === 0) {
            child *= (1 + extent);
          } else {
            child *= (1 - extent);
          }
          return Number(child.toFixed(0));
        });
      } else {
        item = item && item.map((child, index) => {
          child = Number(child) || 0;
          if (index % 2 === 0) {
            child *= (1 - extent);
          } else {
            child *= (1 + extent);
          }
          return Number(child.toFixed(0));
        });
      }
      return item;
    });
  };
}

export function linear(arr, extent = 0.1, duration = 3000) {
  let UpperArray = arr && arr.map((item) => {
    return item && item.map((child) => {
      child = Number(child);
      return child * (1 + extent);
    });
  });

  let FloorArray = arr && arr.map((item) => {
    return item && item.map((child) => {
      return child * (1 - extent);
    });
  });

  let stepArray = arr && arr.map((item, index) => {
    return item && item.map((child, i) => {
      let speed = ((child - FloorArray[index][i]) / ((duration / 1000) * 60));
      if (i % 2 === 0) {
        return -speed;
      } else {
        return speed;
      }
    });
  });

  return function (arr) {
    return arr && arr.map((item, i) => {
      item = item && item.map((child, j) => {
        let up = UpperArray[i][j];
        let down = FloorArray[i][j];
        let step = stepArray[i][j];
        child = Number(child);
        if (child >= up) {
          if (step > 0) {
            stepArray[i][j] = -step;
          }
        } else if (child <= down) {
          if (step < 0) {
            stepArray[i][j] = -step;
          }
        }
        child += stepArray[i][j];
        return child;
      });
      return item;
    });
  };
}
