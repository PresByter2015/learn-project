import {initState} from './state';
import {compileToFunctions} from './compiler/index';
import {mountComponent, callHook} from './lifecycle';
import {mergeOptions} from './util/index';
export function initMixin (Vue) {
  // 全局组件 和 局部组件
  Vue.prototype._init = function (options) {
    const vm = this;
    // vm.$options = options;// 自定义的 options 和 全局的 options 合并
    vm.$options = mergeOptions (vm.constructor.options, options);
    // 初始化状态 一个 初始化的劫持 数据改变—> 更新视图
    callHook (vm, 'beforeCreate');
    initState (vm); // 扩展 功能 状态相关的
    callHook (vm, 'created');

    // Vue 是 一个参考 MVVM的框架。 数据视图，视图数据变化。 MVVM 不能跳过数据更新视图。$ref 直接修改dom 所以不是一个标准的MVVM 框架。
    // 如果有 el 说明渲染模板
    // 页面挂载
    if (vm.$options.el) {
      vm.$mount (vm.$options.el);
    }
  };
  Vue.prototype.$mount = function (el) {
    //挂载操作
    const vm = this;
    const options = vm.$options;
    el = document.querySelector (el);
    /*
        1. 先找render
        2. 接着找 template
        3. 找当前 el 指定 的元素中的内容进行渲染
        */
    // 如果没有render方法
    if (!options.render) {
      let template = options.template;
      // 如果没有模板但是有el
      if (!template && el) {
        template = el.outerHTML;
      }
      //   将模板 转义成 模板函数
      const render = compileToFunctions (template);
      options.render = render;
    }
    // 挂载组件
    mountComponent (vm, el);
    console.log (options.render); //最终渲染时 拿到的都是 这个render 方法
  };
}
