// 2.生成虚拟dom
// import {createTextNode, createElement} from './vdom/create-element';
export function renderMixin (Vue) {
  //用对象 来描述 dom 的结构
  Vue.prototype._v = function (text) {
    // 创建虚拟dom文本
    return createTextNode (text);
  };
  Vue.prototype._c = function () {
    // 创建虚拟dom元素
    return createElement (...arguments);
  };
  Vue.prototype._s = function (val) {
    // 创建string
    return val == null
      ? ''
      : typeof val === 'object' ? JSON.stringify (val) : val;
  };
  Vue.prototype._render = function () {
    const vm = this;
    const {render} = vm.$options;
    let vnode = render.call (vm);
    return vnode;
  };
}
// 虚拟文本节点  只有数据
export function createTextNode (text) {
  return vnode (undefined, undefined, undefined, undefined, text);
}
// 虚拟元素
export function createElement (tag, data = {}, ...children) {
  let key = data.key;
  if (key) {
    delete data.key;
  }
  return vnode (tag, data, key, children);
}
// 虚拟节点
function vnode (tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text,
  };
}
