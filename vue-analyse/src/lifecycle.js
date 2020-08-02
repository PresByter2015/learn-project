import {patch} from './vdom/patch';
export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    // 将虚拟节点渲染成真实节点
    vm.$el = patch (vm.$el, vnode);
  };
}

export function mountComponent (vm, el) {
  vm.$el = el;
//   let updateComponent = () => {
    // 将虚拟节点 渲染到页面上
    vm._update (vm._render ());
//   };
//   new Watcher (vm, updateComponent, () => {}, true);
}
