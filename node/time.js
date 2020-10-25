/**
 * @function 将毫秒制时间格式化为时分秒
 * @param { second: number } second 要格式的时间片段
 * @return { object } 将时间项分开作为对象的属性返回
 */
export function secondToTime(second) {
    function add0(item) {
      return +item > 9 ? '' + item : '0' + item
    }
    let s = second
    if (s <= 0) s = 0
    const day = Math.floor(s / 86400)
    const hour = Math.floor((s - day * 86400) / 3600)
    const hours = Math.floor(s / 3600)
    const min = Math.floor((s - hours * 3600) / 60)
    const sec = Math.floor(s - hours * 3600 - min * 60)
    return {
      // day: `${day}`,
      // hour: `${hour}`.padStart(2, '0'),
      // hours: `${hours}`.padStart(2, '0'),
      // minute: `${min}`.padStart(2, '0'),
      // second: `${sec}`.padStart(2, '0'),
      day: `${day}`,
      hour: add0(hour),
      hours: add0(hours),
      minute: add0(min),
      second: add0(sec),
    }
  }
/**
 * 倒计时
 * @param { start: date } 倒计时开始的时间
 * @param { end: date } 倒计时结束的时间
 * @param { callback: function } 每次所执行的函数
 */
export function countdown (now = Date.now (), end, callback) {
  const times = 1000; // 频率
  const s = +new Date (now);
  window.__now = s;
  const e = +new Date (end);
  const d = secondToTime ((e - s) / 1000);
  let n = +new Date ();
  // 返回唯一对象，以备清除倒计时所用
  const _this = {
    t: null,
  };
  const tick = timer => {
    _this.t = setTimeout (() => {
      window.__now += times;
      const duration = e - window.__now;
      const d = secondToTime (duration / 1000);
      callback (_this.t, d);
      const _n = +new Date (); // 当前时间用来计算偏差值
      const x = _n - n - times;
      n = _n;
      tick (timer - x);
    }, timer);
  };
  tick (times);
  callback (_this.t, d);
  return _this;
}
