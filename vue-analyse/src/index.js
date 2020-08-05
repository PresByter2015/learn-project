// es6 的类写法
import {initMixin} from './init';
import {lifecycleMixin} from './lifecycle';
import {renderMixin} from './vdom/index';
import {initGlobalAPI} from './global-api/index'
function Vue (options) {
  this._init (options); //入口文件，初始化 操作 _init 写在Vue 原型上
}
// 初始化

// 写成一个个插件 对原型进行扩展
// Vue.prototype._init = () => {};// 解耦出去
// 扩展功能  原型方法
initMixin (Vue); // 给原型上新增_init方法

lifecycleMixin (Vue); // 混合生命周期

renderMixin (Vue); // render 函数

// 静态方法 extend 。。
initGlobalAPI(Vue)

export default Vue;
