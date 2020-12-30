/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description:  第 6 章: 示例应用
* @author: PresByter
* @date  : 2020/12/30 10:48:14
* @file  : func.js
* @see https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch6.html
*/
const curry = fn =>
  (judge = (...args) =>
    args.length >= fn.length
      ? fn (...args)
      : (...arg) => judge (...args, ...arg));

//  match :: Regex -> (String -> [String])
var match = curry (function (reg, s) {
  return s.match (reg);
});
var onHoliday = match(/holiday/ig);
console.log(onHoliday('holidaypppholiday'));