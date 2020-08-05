export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
];
const strats = {};
function mergeHook (parentVal, childValue) {
  if (childValue) {
    if (parentVal) {
      return parentVal.concat (childValue); //把儿子合并到爸爸
    } else {
      return [childValue];//[created,created,]
    }
  } else {
    return parentVal;//不合并了 采用父 的
  }
}
LIFECYCLE_HOOKS.forEach (hook => {
  strats[hook] = mergeHook; //钩子函數  策略模式
});
// mergeOptions (this.options, mixin);
export function mergeOptions (parent, child) {
  const options = {};
  //   遍历 父亲
  for (let key in parent) {
    //属性字段合并
    // 根据key 不同的策略进行合并
    mergeField (key);
  }
  //   遍历 儿子
  for (let key in child) {
    if (!parent.hasOwnProperty (key)) {
      mergeField (key);
    }
  }
  //   父子的合并
  function mergeField (key) {
    if (strats[key]) {
      // 策略模式
      options[key] = strats[key] (parent[key], child[key]);
    } else {
      if (typeof parent[key] == 'object' && typeof child[key] == 'object') {
        options[key] = {
          ...parent[key],
          ...child[key],
        };
      } else {
        options[key] = child[key];
      }
    }
  }
  return options;
}
