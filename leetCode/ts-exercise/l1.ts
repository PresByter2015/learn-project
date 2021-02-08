/**
 * @description: 找出数组arr中重复出现过的元素 [1,2,3,4,1,2,2,2] [1,2] 
 * @author: PresByter
 * @date   : 2021/02/08 09:56:20
 * @latest : 2021/02/08 09:56:20
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see 
 */
function findRepeat(nums: number[]): number[] {
    let left: number[] = [...new Set(nums)]
    let map: { [key in number]: number } = {}
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] ? map[nums[i]]++ : map[nums[i]] = 1
    }
    return left.filter(item => map[item] > 1)
};
console.log(findRepeat([1, 2, 3, 4, 1, 2, 2, 2]));

//1:for/for in/+sort先进行排序，然后判断排序之后的前一个数据是否等于后一个数据，如果是且结果数组没有这个元素

function duplicates1(arr: number[]) {
    let resArr = []; arr.sort();
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == arr[i - 1] && resArr.indexOf(arr[i]) == -1) {
            resArr.push(arr[i]);
        }
    }
    return resArr;
}

function duplicates2(arr: number[]) {
    let resArr = [];
    arr.sort();
    for (i in arr) {
        if (arr[i] == arr[i - 1] && resArr.indexOf(arr[i]) == -1) {
            resArr.push(arr[i]);
        }
    }
    return resArr;
}

//2.forEach利用索引判断是否重复（使用了两次） 
function duplicates3(arr: number[]) {
    var resArr: number[] = [];
    arr.forEach(v => {
        //判断原数组是否有重复数据 //判断结果数组是否已经具有该数据 
        if (arr.indexOf(v) != arr.lastIndexOf(v) && resArr.indexOf(v) == -1) {
            resArr.push(v);
        }
    });
    return resArr;
}

//3.reduce先判断数组中元素出现的次数，如果大于1并且结果数组之前无此元素，则将这个元素放到结果数组中 
function duplicates4(arr: number[]) {
    let b = []; let resArr = []; for (let i = 0; i < arr.length; i++) {
        b[i] = arr.reduce((init, curr) => {
            //如果当前置等于item，该函数值加一
            return curr === arr[i] ? init + 1 : init;
        }, 0)
        if (b[i] > 1 && resArr.indexOf(arr[i]) === -1) { resArr.push(arr[i]); }
    } return resArr;
}