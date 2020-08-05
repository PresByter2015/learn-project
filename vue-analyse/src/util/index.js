export function proxy (vm, data, key) {
  Object.defineProperty (vm, key, {
    // vm.a
    get () {
      return vm[data][key]; // vm._data.a
    },
    set (newValue) {
      // vm.a = 100;
      vm[data][key] = newValue; // vm._data.a = 100;
    },
  });
}

export function defineProperty (target, key, value) {
  Object.defineProperty (target, key, {
    enumerable: false, // 不能被枚举，不能被循环出来
    configurable: false,
    value,
  });
}

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
strats.data = function (parentVal, childValue) {
  return childValue; // 这里应该有合并data的策略
};
strats.computed = function () {};
strats.watch = function () {};

function mergeHook (parentVal, childValue) {
  if (childValue) {
    if (parentVal) {
      return parentVal.concat (childValue); //把儿子合并到爸爸
    } else {
      return [childValue]; //[created,created,]
    }
  } else {
    return parentVal; //不合并了 采用父 的
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
        // todo默认合并
        options[key] = child[key];
      }
    }
  }
  return options;
}
