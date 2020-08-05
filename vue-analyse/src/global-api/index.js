import {mergeOptions} from '../util/index.js';
export function initGlobalAPI (Vue) {
  Vue.options = {};

  Vue.mixin = function (mixin) {
    // 将属性合并到Vue.options上
    this.options = mergeOptions (this.options, mixin);
    // 先 考虑 生命周期  不考虑 data methods 等
    console.log ('initGlobalAPI', this.options);
    return this;
  };
}
