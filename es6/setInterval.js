/**
 * @description:  为什么要用 setTimeout 模拟 setInterval 
 * @author: PresByter
 * @date   : 2021/03/08 14:14:40
 * @latest : 2021/03/08 14:14:40
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see https://mp.weixin.qq.com/s/bNNDadbjNe806EP478io6g
 */

// for (let i = 0; i < 5; i++) {
//   setTimeout (function () {
//     console.log (i);
//   }, 1000);
// }
/**
 * 在前一个定时器执行完前，不会向队列插入新的定时器（解决缺点一）
 * 保证定时器间隔（解决缺点二）
 * 
 */
let timer = null;

const interval = (func, wait) => {
  let interv = function () {
    func.call (null);
    timer = setTimeout (interv, wait);
  };
  timer = setTimeout (interv, wait);
};

interval (function () {
  let d = new Date ().getTime ();
  console.log ('time is :', `${d}`.substring(10,11));
}, 100);

// if (timer) {
//   window.clearSetTimeout (timer);
//   timer = null;
// }
