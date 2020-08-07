import {pushTarget, popTarget} from './dep';

let id = 0; //给每一个 Watcher 增加一个 唯一标识
class Watcher {
  // vm.$watch
  // vm实例
  // exprOrFn  vm._update(vm._render())
  constructor (vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;
    this.id = id++; // watcher的唯一标识
    if (typeof exprOrFn == 'function') {
      this.getter = exprOrFn;
    }
    this.get (); // 默认会调用get方法
    this.deps = [];
    this.depsId = new Set (); //存放deps 去重
  }
  addDep (dep) {
    let id = dep.id;
    if (!this.depsId.has (id)) {
      //如果已经存放了dep 就不放了
      this.depsId.add (id);
      this.deps.push (dep);
      dep.addSub (this); //把watcher 放入 dep
    }
  }
  get () {
    // Dep.target = watcher
    // debugger;
    pushTarget (this); // 当前watcher实例
    this.getter (); // 调用exprOrFn  渲染页面 取值（执行了get方法）  render方法 with(vm){_v(msg)}
    popTarget (); //渲染完成后 将watcher删掉了
  }
  run () {
    this.get ();
  }
  update () {
    //   不要 每次都要调用get，get会渲染页面
    // this.get (); // 重新渲染

    queueWatcher (this);
  }
}

let has = {};
let queue = [];

function flushSchedulerQueue () {
  for (let i = 0; i < queue.length; i++) {
    let watcher = queue[i];
    watcher.run ();
  }
  queue = []; //清空watcher
  has = {}; //清空id
}
let pending = false;
export function queueWatcher (watcher) {
  const id = watcher.id; //通过id来对象去重 只更新一个set，异步更新去重nextTick
  if (has[id] == null) {
    has[id] = true;
    queue.push (watcher);
    if (!pending) {
      //防抖处理
      nextTick (flushSchedulerQueue);
      pending = true;
    }
  }
}
export default Watcher;

// 在数据劫持的时候 定义defineProperty的时候 已经给每个属性都增加了一个dep

// 1.是想把这个渲染watcher 放到了Dep.target属性上
// 2.开始渲染 取值会调用get方法,需要让这个属性的dep 存储当前的watcher
// 3.页面上所需要的属性都会将这个watcher存在自己的dep中
// 4.等会属性更新了 就重新调用渲染逻辑 通知自己存储的watcher来更新
