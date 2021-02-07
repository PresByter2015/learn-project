/**
 * @description:  
 * @author: PresByter
 * @date   : 2021/02/07 09:45:36
 * @latest : 2021/02/07 09:45:36
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see 
 * 求两个数组的交集 
 * const firstArray = [2, 2, 4, 1]; 
 * const secondArray = [1, 2, 0, 2]; 
 * intersection(firstArray, secondArray);
 *  实现intersection函数
 */
function intersection (params1, params2) {
  let res = params1.filter (item => params2.includes (item));
  return [...new Set (res)];
}
const firstArray = [2, 2, 4, 1];
const secondArray = [1, 2, 0, 2];
let res = intersection (firstArray, secondArray);
// console.log (res);

/**
 * @description:  给定一个整数数组，找到从三个整数中产生的最大乘积
 * @author: PresByter
 * @date   : 2021/02/07 10:15:30
 * @latest : 2021/02/07 10:15:30
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see 
 * 给定一个整数数组，找到从三个整数中产生的最大乘积

给定一个整数数组，找到从三个整数中产生的最大乘积 const unsortedArray = [-10, 7, 2, 3, 5, -1, -7]; computeProduct(unsortedArray) 实现computeProduct函数
 */

const unsortedArray = [-10, 7, 2, 3, 5, -1, -7];
// const unsortedArray = [-10, 7, 2, 3, 5, -1, 6, 8];
function computeProduct (params) {
  params.sort ();
  //   return eval (params.splice (-3).join ('*'));
  return params.splice (-3).reduce ((a, b) => a * b);
}
let res2 = computeProduct (unsortedArray);
console.log (res2); //105

// const unsortedArray = [-10, 7, 2, 3, 5, -1, -7];

// let num = computeProduct (unsortedArray); //490 console.log(num)

// function sortIntegers (a, b) {
//   return a - b;
// }

// function computeProduct (unsorted) {
//   const sortedArray = unsorted.sort (sortIntegers);
//   const arraynelement = sortedArray.length - 1;
//   let product1 = 1;
//   let product2 = 1;
//   for (let x = arraynelement; x > arraynelement - 3; x--) {
//     product1 = product1 * sortedArray[x];
//   }
//   console.log (product1, sortedArray);
//   product2 = sortedArray[0] * sortedArray[1] * sortedArray[arraynelement];
//   if (product1 > product2) return product1;
//   return product2;
// }
// console.log (num);
