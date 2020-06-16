/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: 35. 搜索插入位置 
* @author: PresByter
* @date  : 2020/06/16 14:51:59
* @file  : 35.ts
*/
/**
 * 35. 搜索插入位置
 * 
 * https://leetcode-cn.com/problems/search-insert-position/
 * 
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

示例 1:

输入: [1,3,5,6], 5
输出: 2
示例 2:

输入: [1,3,5,6], 2
输出: 1
示例 3:

输入: [1,3,5,6], 7
输出: 4
示例 4:

输入: [1,3,5,6], 0
输出: 0
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = (nums: number[], target: number): number => {
    let newNums = [...new Set([...nums, target])].sort((a, b) => a - b)
    return newNums.findIndex(v => v === target)
};

console.log(searchInsert([1, 2, 3, 4, 5, 10], 2));
