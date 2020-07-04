/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: 136. 只出现一次的数字 
* @author: PresByter
* @date  : 2020/07/04 20:44:47
* @file  : 136.ts
*/
/**
 * 136. 只出现一次的数字
 * 
 * https://leetcode-cn.com/problems/single-number/
 * 
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:

输入: [2,2,1]
输出: 1
示例 2:

输入: [4,1,2,1,2]
输出: 4
 */

function singleNumber(nums: number[]): number {
    let len = nums.length
    let resArr: number[] = []
    for (let i = 0; i < len; i++) {
        let item = nums[i]
        if (resArr.includes(item)) {
            // 删除
            let index = resArr.findIndex(v => v === item)
            resArr.splice(index, 1)
        } else {
            // 添加
            resArr.push(item)
        }
    }
    return resArr[0]
};
console.log(singleNumber([4, 1, 2, 1, 2]));
console.log(singleNumber([2, 1, 2]));
