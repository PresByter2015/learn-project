/**
 * @description: 189. 旋转数组 
 * @author: PresByter
 * @date   : 2020/08/14 11:41:45
 * @latest : 2020/08/14 11:41:45
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see https://leetcode-cn.com/problems/rotate-array/
 */
/**
 * 189. 旋转数组
给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

示例 1:

输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]
示例 2:

输入: [-1,-100,3,99] 和 k = 2
输出: [3,99,-1,-100]
解释: 
向右旋转 1 步: [99,-1,-100,3]
向右旋转 2 步: [3,99,-1,-100]
说明:

尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
要求使用空间复杂度为 O(1) 的 原地 算法。

 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    const temp = nums.slice(0, k - 1)
    for (let i = 0; i < nums.length; i++) {
        nums[i] = i + k - 1 < nums.length ? nums[i + k - 1] : temp[i + k - nums.length - 1]
        // console.log(i, i + k, i + k - nums.length, temp[i + k - nums.length + 1]);
        // nums[i] = nums[i + k]
    }
};
const arr1 = [-1, -100, 3, 99]
rotate(arr1, 3)
console.log(arr1);
