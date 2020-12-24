/**
 * @description:  compose
 * @author: PresByter
 * @date   : 2020/12/24 11:33:07
 * @latest : 2020/12/24 11:33:07
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch5.html#%E5%87%BD%E6%95%B0%E9%A5%B2%E5%85%BB
 */
const compose = function (fn, g) {
  return function (params) {
    return fn (g (params));
  };
};

var toUpperCase = function (x) {
  return x.toUpperCase ();
};
var exclaim = function (x) {
  return x + '!';
};
var shout = compose (exclaim, toUpperCase);

const a = shout ('send in the clowns');

console.log (a);
