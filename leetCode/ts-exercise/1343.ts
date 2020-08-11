/**
 * @description: 1343. 大小为 K 且平均值大于等于阈值的子数组数目
 * @author: PresByter
 * @date   : 2020/08/11 11:41:52
 * @latest : 2020/08/11 11:41:52
 * @param {number[]} nums 参数描述 e.g.
 * @return {boolean} 返回结果描述 e.g.
 * @see https://leetcode-cn.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/
 */
/**
 * 1343. 大小为 K 且平均值大于等于阈值的子数组数目
给你一个整数数组 arr 和两个整数 k 和 threshold 。

请你返回长度为 k 且平均值大于等于 threshold 的子数组数目。



示例 1：

输入：arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
输出：3
解释：子数组 [2,5,5],[5,5,5] 和 [5,5,8] 的平均值分别为 4，5 和 6 。其他长度为 3 的子数组的平均值都小于 4 （threshold 的值)。
示例 2：

输入：arr = [1,1,1,1,1], k = 1, threshold = 0
输出：5
示例 3：

输入：arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5
输出：6
解释：前 6 个长度为 3 的子数组平均值都大于 5 。注意平均值不是整数。
示例 4：

输入：arr = [7,7,7,7,7,7,7], k = 7, threshold = 7
输出：1
示例 5：

输入：arr = [4,4,4,4], k = 4, threshold = 1
输出：1


提示：

1 <= arr.length <= 10^5
1 <= arr[i] <= 10^4
1 <= k <= arr.length
0 <= threshold <= 10^4
 */

function numOfSubarrays(arr: number[], k: number, threshold: number): number {
    let sum = 0
    if (arr.length < k) {
        return sum
    }
    let target = k * threshold
    let tempArrSum = 0
    let j = 0
    while (j < k) {
        tempArrSum = tempArrSum + arr[j]
        j++
    }
    if (tempArrSum >= target) {
        sum += 1
    }
    for (let i = k; i < arr.length; i++) {
        tempArrSum = tempArrSum - arr[i - k] + arr[i]
        // console.log(tempArrSum);

        if (tempArrSum >= target) {
            sum++
        }
        // if (i + k > arr.length) {
        //     break
        // } else {
        //     tempArrSum = tempArrSum - arr[i - k] + arr[i]
        //     console.log(tempArrSum);

        //     if (tempArrSum >= target) {
        //         sum++
        //     }
        //     // const temp = []
        //     // // 这里可以对 滑动数组的值进行 求和，先设置一个arrsum，每次移动的时候，增加一个后一个值，删除前一个值。
        //     // let j = 0
        //     // while (j < k) {
        //     //     // console.log([arr[i], arr[i + 1], arr[i + 2]]);
        //     //     temp.push(arr[i + j])
        //     //     j++
        //     // }
        //     // if (temp.reduce((x, y) => x + y) / k >= threshold) {
        //     //     sum++
        //     // }
        //     // console.log(temp.reduce((x, y) => x + y) / k);
        // }

    }
    return sum
};
console.log(numOfSubarrays([2, 2, 2, 2, 5, 5, 5, 8], 3, 4));
console.log(numOfSubarrays([1, 1, 1, 1, 1], 1, 0));
console.log(numOfSubarrays([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5));
