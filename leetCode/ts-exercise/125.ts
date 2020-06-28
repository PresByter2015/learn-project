/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: 125. 验证回文串 
* @author: PresByter
* @date  : 2020/06/28 21:11:04
* @file  : 125.ts
*/
/**
 * 125. 验证回文串
 * 
 * https://leetcode-cn.com/problems/valid-palindrome/
 * 
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

示例 1:

输入: "A man, a plan, a canal: Panama"
输出: true
示例 2:

输入: "race a car"
输出: false
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindromeStr = (s: string): boolean => {
    const res = s.replace(/[^a-zA-Z|\d]/g, '').toLocaleLowerCase()
    return res === [...res].reverse().join('')
};
// console.log(isPalindromeStr("A man, a plan, a canal: Panama"));
// console.log(isPalindromeStr("race a car"));
console.log(isPalindromeStr("0P"));
