/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: 70. 爬楼梯 
* @author: PresByter
* @date  : 2020/06/29 18:21:22
* @file  : 70.ts
*/
/**
 * https://leetcode-cn.com/problems/climbing-stairs/
 * 70. 爬楼梯
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例 1：

输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
示例 2：

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶

输入： 4
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶 + 1
2.  1 阶 + 2 阶 + 1
2.  1 阶 + 1 阶 + 2
2.  2 阶 + 1 阶 + 1
5.  2 阶 + 2 阶

输入： 5
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶 + 1 + 1
2.  1 阶 + 2 阶 + 1 + 1
3.  2 阶 + 2 阶 + 1



思路:
1-1
2-2
3-1+2=3
4-3+2=5
...
f(n)=f(n-1)+f(n-2)
 */

/**
* @param {number} n
* @return {number}
*/
const climbStairs = (n: number): number => {
    if (n === 1) return 1
    if (n === 2) return 2
    // return climbStairs(n - 1) + climbStairs(n - 2)
    return memoFunc(n, [0, 1, 2])
};
function memoFunc(n: number, memo: number[]) {
    if (memo[n]) return memo[n]
    else
        memo[n] = memoFunc(n - 1, memo) + memoFunc(n - 2, memo)
    return memo[n]    
}
console.log(1, climbStairs(1));
console.log(2, climbStairs(2));
console.log(3, climbStairs(3));
console.log(4, climbStairs(4));
console.log(5, climbStairs(5));
console.log(6, climbStairs(6));
