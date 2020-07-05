/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description:  167. 两数之和 II - 输入有序数组
* @author: PresByter
* @date  : 2020/07/05 20:57:57
* @file  : 167.ts
*/
/**
 * 167. 两数之和 II - 输入有序数组
 * 
 * https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/
 * 
给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

说明:

返回的下标值（index1 和 index2）不是从零开始的。
你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
示例:

输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
 */
function twoSum2(numbers: number[], target: number): number[] {
    let index1 = 0, index2 = 1
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (target - numbers[i] === numbers[j]) {
                index1 = i
                index2 = j
            }
        }
    }
    return [index1 + 1, index2 + 1]

    // 二分 查找
    // let left = 0, right = numbers.length - 1
    // while (left < right) {
    //     const res = numbers[left] + numbers[right]
    //     if (res > target) {
    //         right--
    //     } else if (res === target) {
    //         return [left + 1, right + 1]
    //     } else {
    //         left++
    //     }
    // }
    // return [left, right]
};
console.log(twoSum2([2, 7, 11, 15], 9));
console.log(twoSum2([12, 1, 7, 11, 2, 15], 9));
