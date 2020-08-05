import {patch} from './vdom/patch';
import Watcher from './observer/watcher';
export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    // 将虚拟节点渲染成真实节点
    // 用新的 创建的元素 替换 老的$el
    vm.$el = patch (vm.$el, vnode);
  };
}

export function mountComponent (vm, el) {
  vm.$el = el;
  // 调用render方法去渲染 el属性
  // 先调用render方法创建虚拟节点，在将虚拟节点渲染到页面上
  callHook (vm, 'beforeMount');
  let updateComponent = () => {
    // 将虚拟节点 渲染到页面上
    vm._update (vm._render ());
  };
  // 更新渲染
  // 初始化就会创建watcher
  let watcher = new Watcher (
    vm,
    updateComponent,
    () => {
      callHook (vm, 'beforeUpdate');
    },
    true
  );
  // 要把属性 和 watcher绑定在一起
  callHook (vm, 'mounted');
}
export function callHook (vm, hook) {
  const handlers = vm.$options[hook]; // vm.$options.created =[a1,a2,a3]
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call (vm); //更改生命周期的this call
    }
  }
}
