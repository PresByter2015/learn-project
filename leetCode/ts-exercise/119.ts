/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: 119. 杨辉三角 II 
* @author: PresByter
* @date  : 2020/06/27 21:25:48
* @file  : 119.ts
*/
/**
 * 119. 杨辉三角 II
 * 
 * https://leetcode-cn.com/problems/pascals-triangle-ii/
 * 
给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。



在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

输入: 3
输出: [1,3,3,1]
 */
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = (rowIndex: number): number[] => {
    let res: number[][] = [[1]]
    if (rowIndex === 1) return [1, 1]
    if (rowIndex === 0) return [1]
    for (let i = 1; i < rowIndex + 1; i++) {
        let temp: number[] = [1]
        for (let j = 1; j < i; j++) {
            const start = res[i - 1][j - 1]
            const end = res[i - 1][j]
            temp.push(start + end)
        }
        temp.push(1)
        res[i] = temp
    }
    return res[rowIndex]
};
console.log(getRow(5));
console.log(getRow(3));
console.log(getRow(0));