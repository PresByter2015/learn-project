/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: 118. 杨辉三角 
* @author: PresByter
* @date  : 2020/06/25 14:01:55
* @file  : 118.ts
*/
/**
 * 118. 杨辉三角
 * 
 * https://leetcode-cn.com/problems/pascals-triangle/
 * 
给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。

在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

输入: 5
输出:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
 */
/**
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = function (numRows: number): number[][] {
    let res: number[][] = [[1]]
    if (numRows === 1) return res
    if (numRows === 0) return []
    for (let i = 1; i < numRows; i++) {
        let temp: number[] = []
        for (let j = 0; j < i + 1; j++) {
            const start = res[i - 1][j - 1] === undefined ? 0 : res[i - 1][j - 1]
            const end = res[i - 1][j] === undefined ? 0 : res[i - 1][j]
            temp.push(start + end)
        }
        res[i] = temp
    }
    return res
};
console.log(generate(5));
console.log(generate(0));
