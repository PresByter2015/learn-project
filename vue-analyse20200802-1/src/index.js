// es6 的类写法
import {initMixin} from './init';
function Vue (options) {
  this._init (options); //入口文件，初始化 操作 _init 写在Vue 原型上
}
// 初始化

// 写成一个个插件 对原型进行扩展
// Vue.prototype._init = () => {};// 解耦出去
// 扩展功能
initMixin (Vue); // 给原型上新增_init方法
export default Vue;
