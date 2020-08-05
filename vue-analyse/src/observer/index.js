/**
 * @description: 响应式数据原理 
 * @author: PresByter
 * @date   : 2020/08/02 10:19:58
 * @latest : 2020/08/02 10:19:58
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see 
 */
import {arrayMethods} from './array';
import Dep from './dep';
class Observer {
  // 观测值 数据
  constructor (value) {
    Object.defineProperty (value, '__ob__', {
      enumerable: false, //不能被枚举，不能被循环出来
      configurable: false,
      value: this, //
    });
    // value.__ob__=this //这样就死循环了
    //   使用 Object.defineProperty  重新定义 属性
    // this.walk (value);
    if (Array.isArray (value)) {
      // 通知视图可以更新了
      // 函数劫持，切片编程
      // 对每一个方法进行重写 如数组的 pop push shift 等
      value.__proto__ = arrayMethods; // 重写数组原型方法，使Vue调用自己的方法
      this.observeArray (value);
    } else {
      this.walk (value);
    }
  }
  //   数组的每一项
  observeArray (value) {
    for (let i = 0; i < value.length; i++) {
      observe (value[i]); //观测竖中指中的对象类型
    }
  }
  walk (data) {
    // 让对象上的所有属性依次进行观测
    // 循环对象 数组 进行定义
    let keys = Object.keys (data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive (data, key, value); // 定义成响应式 数据
    }
  }
}
// 递归属性劫持
function defineReactive (data, key, value) {
  //生成一个闭包
  observe (value);

  let dep = new Dep ();
  //
  Object.defineProperty (data, key, {
    get () {
      //依赖收集
      //取值
      console.log ('取值');
      if (Dep.target) {
        // 如果取值时有watcher
        dep.depend (); // 让watcher保存dep，并且让dep 保存watcher
      }
      return value;
    },
    set (newValue) {
      //依赖更新
      console.log ('设置值');
      //设置值
      if (newValue == value) return;
      observe (newValue); // 深层的数据 都设置一下get 和set；当前 数据由基本变量改为引用变量的时候，会继续劫持监控
      value = newValue;
      dep.notify (); // 通知渲染watcher去更新
    },
  });
}
export function observe (data) {
  // typeof null 也是  object
  // 观测对象
  if (typeof data !== 'object' && data != null) {
    //数据过滤  只能是对象
    return;
  }
  if (data.__ob__) {
    //已經被观测过了
    return data;
  }
  return new Observer (data);
}
