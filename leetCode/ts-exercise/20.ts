/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: 20. 有效的括号 
* @author: PresByter
* @date  : 2020/05/02 16:30:51
* @file  : 20.ts
*/
/**
 * 20. 有效的括号
 * 
 * https://leetcode-cn.com/problems/valid-parentheses/
 * 
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:

输入: "()"
输出: true
示例 2:

输入: "()[]{}"
输出: true
示例 3:

输入: "(]"
输出: false
示例 4:

输入: "([)]"
输出: false
示例 5:

输入: "{[]}"
输出: true
 */
/**
 * @param {string} s
 * @return {boolean}
 */
const isValidParentheses = function (s: string): boolean {
    const pobj = {
        ')': '(',
        ']': '[',
        '}': '{',
    }
    let parr: string[] = []
    for (let i = 0; i < s.length; i++) {
        if (pobj[s[i]] && parr.includes(pobj[s[i]])) {
            parr.pop()
        } else {
            parr.push(s[i])
        }
    }
    // console.log(parr);
    return parr.length === 0
};
console.log(isValidParentheses('()[]{}'));
console.log(isValidParentheses('([]{'));
console.log(isValidParentheses('(]'));
console.log(isValidParentheses('{([])}'));
