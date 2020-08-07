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
