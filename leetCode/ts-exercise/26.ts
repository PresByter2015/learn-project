/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description:  26. 删除排序数组中的重复项
* @author: PresByter
* @date  : 2020/06/14 17:14:28
* @file  : 26.ts
*/
/**
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 * 
 * 给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

 

示例 1:

给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。
示例 2:

给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
* @param {number[]} nums
* @return {number}
*/
const removeDuplicates = (nums: number[]): number => {
    let len: number = nums.length
    let res: number = 1
    for (let i = 1; i < len; i++) {
        if (nums[i] != nums[i-1]) nums[res++] = nums[i];
        // console.log(nums);
    }
    return res
};

const res1 = removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])
console.log(res1);
