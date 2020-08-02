import {initState} from './state';

export function initMixin(Vue){
    Vue.prototype._init = function (options) {
        const vm  = this;
        vm.$options = options
        // 初始化状态 一个 初始化的劫持 数据改变—> 更新视图
        initState(vm) // 扩展 功能 状态相关的

        // Vue 是 一个参考 MVVM的框架。 数据视图，视图数据变化。 MVVM 不能跳过数据更新视图。$ref 直接修改dom 所以不是一个标准的MVVM 框架。
    }
}