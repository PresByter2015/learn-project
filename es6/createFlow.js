/**
 * @description:  一道蚂蚁金服异步串行面试题
 * @author: PresByter
 * @date   : 2020/08/20 11:22:39
 * @latest : 2020/08/20 11:22:39
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see https://github.com/sl1673495/blogs/issues/55
 */
/**
 * 先看题目：

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

createFlow([
  () => log("a"),
  () => log("b"),
  subFlow,
  [() => delay(1000).then(() => log("d")), () => log("e")],
]).run(() => {
  console.log("done");
});

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印
按照上面的测试用例，实现 createFlow：

flow 是指一系列 effects 组成的逻辑片段。
flow 支持嵌套。
effects 的执行只需要支持串行。

FIXME:分析
当执行 run 的时候 才会执行该函数
 */
function createFlow (effects = []) {
  let sources = [...effects].flat ();
  //   console.log (effects.flat ());
  //   let i = 0;
  //   while (i < effects.length) {
  //     effects[i] ();
  //     i++;
  //   }
  function run (callback) {
    while (sources.length) {
      const task = sources.shift ();
      // 把callback放到下一个flow的callback时机里执行
      const next = () => createFlow (sources).run (callback);

      if (typeof task === 'function') {
        const res = task ();
        if (res && res.then) {
          res.then (next);
          return;
        }
      } else if (task && task.isFlow) {
        task.run (next);
        return;
      }
    }
    // callback?.();
    callback && callback ();
  }

  return {
    run,
    isFlow: true,
  };
}
const delay = ms => new Promise (resolve => setTimeout (resolve, ms));

const subFlow = createFlow ([
  () => delay (1000).then (() => console.log ('c')),
]);

createFlow ([
  () => console.log ('a'),
  () => console.log ('b'),
  subFlow,
  [() => delay (1000).then (() => console.log ('d')), () => console.log ('e')],
]).run (() => {
  console.log ('done');
});
// console.log (typeof createFlow);
