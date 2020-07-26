/**
 *～╭════╮┌══════════════┐
 * ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
 * ╰⊙═⊙╯╰══⊙══════⊙══╯
 * @description: 258. 各位相加 
 * @author: PresByter
 * @date  : 2020/07/26 23:25:24
 * @file  : 258.ts
 * @see https://leetcode-cn.com/problems/add-digits/
 */
/**
 * 258. 各位相加
给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。

示例:

输入: 38
输出: 2 
解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。
 */
function addDigits(num: number): number {
    const a = [...String(num)].map(v => +v)
    const sums = sum(a)
    if (sums > 9) {
        addDigits(sums)
    } else {
        return sums
    }
    return sums > 9 ? addDigits(sums) : sums
};
console.log(addDigits(38));

function sum(arr: number[]) {
    return arr.reduce((prev: number, curr: number) => {
        return prev + curr;
    });
}

/**
 * @description: 第二种方法 
 * @author: PresByter
 * @date   : 2020/07/26 23:42:53
 * @latest : 2020/07/26 23:42:53
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see 
 */
function addDigits2(num: number): number {
    while(Math.floor(num/10)>0){
        let temp = 0;
        while(num>0){
            let mod = num % 10;
            temp+=mod;
            num = Math.floor(num/10);
        }
        num = temp;
    }
    return num;
};

