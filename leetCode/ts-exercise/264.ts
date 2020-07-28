/**
 * @description: 264. 丑数 II
 * @author: PresByter
 * @date   : 2020/07/28 16:09:14
 * @latest : 2020/07/28 16:09:14
 * @param {number[]} nums 参数描述 e.g.
 * @return {boolean} 返回结果描述 e.g.
 * @see https://leetcode-cn.com/problems/ugly-number-ii/
 */
/**
 * 264. 丑数 II
编写一个程序，找出第 n 个丑数。

丑数就是质因数只包含 2, 3, 5 的正整数。

示例:

输入: n = 10
输出: 12
解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
说明:

1 是丑数。
n 不超过1690。

 */
/**
 * 思路：动态规划，没一个丑数，都是前面的丑数 与 2/3/5 的乘积。所以 取 与这三个乘积的 最小值 即可。
 * 
 * 分别 找 3 个变量 来记录基本丑数 2，3，5 的步数，当前 将每一个丑数按照从大到小依次 放入 数组中，依次 取数组的 数
 * 为 乘数 分别与 2/3/5 进行 乘积，最后 将对应的变量 加 1
 */
function nthUglyNumber(n: number): number {
    if (n < 1 || n > 1690) return 0
    let arr = [1]
    let obj = {
        2: 0,
        3: 0,
        5: 0,
    }
    while (arr.length < n) {
        let min = Math.min(arr[obj[2]] * 2, arr[obj[3]] * 3, arr[obj[5]] * 5)
        arr.push(min)
        if (min === arr[obj[2]] * 2) {
            obj[2] = obj[2] + 1
        }
        if (min === arr[obj[3]] * 3) {
            obj[3] = obj[3] + 1
        }
        if (min === arr[obj[5]] * 5) {
            obj[5] = obj[5] + 1
        }
    }
    // console.log(arr);
    return arr[n - 1]
};
console.log(nthUglyNumber(1690));
// console.log(nthUglyNumber(5));
// console.log(nthUglyNumber(4));
// console.log(nthUglyNumber(3));
// console.log(nthUglyNumber(2));
// console.log(nthUglyNumber(1));
