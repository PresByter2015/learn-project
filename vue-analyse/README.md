"serve": "cross-env ENV=development rollup -c -w"  -c 使用配置文件 -w 監控文件 監控 监控
生成

使用class 方法写在clas中

Vue 是 一个参考 MVVM的框架。 数据视图，视图数据变化。 MVVM 不能跳过数据更新视图。$ref 直接修改dom 所以不是一个标准的MVVM 框架。

vm是实例  Vue 是构造函数

封装 继承 用类

style

没显示出来

对象类型的值 进行 json.stringify；所以修改对象里面的值 ，整个对象都会更新
通过数组长度 索引更新 是无效的

数组 更新数组
1. 取值arr 会调用get方法 当前数组记住这个渲染的watcher
2. 我给所有的对象类型都增加一个dep类型
3. 当页面对array取值时 我让数组记住这个watcher
4. 当前的observe的实例 拿到 其下面的dep 然后 notify
5. 更新数组的时候 通知对应的watcher进行更新

Vue.$set() 

{arr: [{a:1}, 2, 3]} 总共有 5 dep -》 {}  arr  a :1 

七.实现Vue异步更新之nextTick
#1.实现队列机制
去重 更新
nextTick 原理 就是异步  一般 使用数据更新之后 再调用nextTick

dom更新异步更新,渲染是异步的 

微信小程序 setData 是整个视图渲染更新

diff 算法
每次都进行 更新
初次 传入的 是vm.$el
O(n^3)

key 为什么不能去数组下标 index
 反转节点 ，整个数组反转，index 是 key ，跟没有key 是一样一样的，没有key就不复用，直接创建元素
 移动性能> 修改性能 > 创建性能
 
 组件的合并策略
  就近策略，将全局组件放到原型链上
 组件渲染流程
 1.调用Vue。component
 2.内部用的是Vue.extend就是产生一个子类来继承父类
 3. 创建子类实例时 会调用父类的——init方法 在去$mount即可
 4.组件的初始化就是 new 这个组件的构造函数并且调用$mount方法
 5.创建虚拟节点 根据标签晒出组件对应，生成组件的虚拟节点 componentOptions里面包含Ctor,children 
