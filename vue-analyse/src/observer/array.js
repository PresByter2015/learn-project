let oldArrayProtoMethods = Array.prototype; //拿到数组的原来的方法
// 继承一下 js 的 Array
export let arrayMethods = Object.create (oldArrayProtoMethods);
let methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
methods.forEach (method => {
  arrayMethods[method] = function (...args) {
    //   数组方法 被调用
    const result = oldArrayProtoMethods[method].apply (this, args);
    const ob = this.__ob__;
    let inserted;
    // 新增的方法 可能是对象类型，应该再次被劫持
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice': //arrayObject.splice(index,howmany,item1,.....,itemX)
        inserted = args.slice (2);//TODO:为什么是2  获取的参数也就是item1,.....,itemX
        // 新增的结果放进去
      default:
        break;
    }
    if (inserted) ob.observeArray (inserted); // 对数组新增的每一项进行观测
    ob.dep.notify() //update
    return result;
  };
});
