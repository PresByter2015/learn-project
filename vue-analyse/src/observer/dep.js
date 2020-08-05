//
let id = 0;
class Dep {
  constructor () {
    this.id = id++;
    this.subs = [];
  }
  depend () {
    if (Dep.target) {
      Dep.target.addDep (this); // 让watcher,去存放dep
    }
  }
  notify () {
    this.subs.forEach (watcher => watcher.update ());
  }
  addSub (watcher) {
    this.subs.push (watcher);
  }
}
let stack = [];
export function pushTarget (watcher) {
  Dep.target = watcher; //保留watcher
  stack.push (watcher);
}
export function popTarget () {
  stack.pop ();
  Dep.target = stack[stack.length - 1];
}
Dep.target = null; //全局变量
export default Dep;
// 多对多的关系 一个属性有一个dep是用来收集watcher的
// dep 可以存多个 watcher
// 一个watcher可以对应多个dep
