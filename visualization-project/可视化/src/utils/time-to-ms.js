const time2ms = {
  h: function (time) {
    return time * 60 * 60 * 1000;
  },

  m: function (time) {
    return time * 60 * 1000;
  },

  s: function (time) {
    return time * 1000;
  },
  d: function (time) {
    return time * 24 * 60 * 60 * 1000;
  }
};

/**
 * 时间转换成毫秒
 */
export default function (time) {
  let unit = time.slice(time.length - 1);

  if (time2ms.hasOwnProperty(unit)) {
    return time2ms[unit](time.slice(0, time.length - 1));
  }
  return time;
}
