/**
 * @description:  
 * @author: PresByter
 * @date   : 2021/02/03 18:56:06
 * @latest : 2021/02/03 18:56:06
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see 
 * 
 * 
 * 假设有两个数组 a 和 b，数组的内容都是从小到大排好序的数字。现在我们和合并这两个数字，并且合并之后的数字也是要从小到大排好序的。
 * 请写下你的实现，但是请不要直接使用 JS 的 sort() 方法，并且确保只使用一次 for 循环。

例如，a=[2,5,11]，b=[4,7,9,10]，那么合并的结果c=[2,4,5,7,9,10,11]
提示：你可以在一个for循环中同时控制两个数组下标i和j。比较a[i]和b[j]，将小的数字加到c中，同时更新相应的下标。但是注意各种边界条件。

 */
const a = [2, 5, 11], b = [4, 7, 9, 10];
function namess (a = [], b = []) {
  const len = Math.max (a.length, b.length), c = [];
  let i = 0, j = 0;
  //   for ( i < len; i++) {
  //   }
  while (i < len) {
    i++;
  }
  return c;
}

console.log (namess (a, b));
