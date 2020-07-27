/**
 *～╭════╮┌══════════════┐
 * ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
 * ╰⊙═⊙╯╰══⊙══════⊙══╯
 * @description: 263. 丑数 
 * @author: PresByter
 * @date  : 2020/07/27 13:50:02
 * @file  : 263.ts
 * @see https://leetcode-cn.com/problems/ugly-number/
 */
/**
 * 263. 丑数
编写一个程序判断给定的数是否为丑数。

丑数就是只包含质因数 2, 3, 5 的正整数。

示例 1:

输入: 6
输出: true
解释: 6 = 2 × 3
示例 2:

输入: 8
输出: true
解释: 8 = 2 × 2 × 2
示例 3:

输入: 14
输出: false 
解释: 14 不是丑数，因为它包含了另外一个质因数 7。
说明：

1 是丑数。
输入不会超过 32 位有符号整数的范围: [−2^31,  2^31 − 1]。
 */
function isUgly(num: number): boolean {
    if (num <= 1) return num === 1;
    const constsants = [1, 2, 3, 5]
    if (constsants.includes(num)) {
        return true
    }
    while (num % 5 == 0) {
        num /= 5;
    }
    while (num % 3 == 0) {
        num /= 3;
    }
    while (num % 2 == 0) {
        num >>= 1;
    }
    return num == 1;
};
console.log(isUgly(30));
// console.log(isUgly(25));
// console.log(isUgly(9));
// console.log(isUgly(3));
// console.log(isUgly(6));
// console.log(isUgly(8));
// console.log(isUgly(28));
