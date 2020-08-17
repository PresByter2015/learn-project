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
    let temp = 0, pre = 0
    for (let i = 0; i < k; i++) {//一共旋转 K次
        // console.log(i, i + k, i + k - nums.length, temp[i + k - nums.length + 1]);
        pre = nums[nums.length - 1]
        for (let j = 0; j < nums.length; j++) {//每次旋转一位
            temp = nums[j]
            nums[j] = pre
            pre = temp
        }
    }
    // nums = [...temp2, ...temp]
};
function rotate2(nums: number[], k: number): void {
    //删除第k个元素开始之后的元素，删除长度为k
    const del = nums.splice(nums.length - k, k)
    //用unshift方法在数组开始添加删除的元素 es6三个点语法将数组转化为参数序列
    nums.unshift(...del)
    // nums = [...del, ...nums]
};
const arr1 = [1, 2, 3, 4, 5, 6, 7]
// rotate(arr1, 3)
rotate2(arr1, 2)
console.log(arr1);
