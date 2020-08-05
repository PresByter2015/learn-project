import {pushTarget, popTarget} from '../observer/dep';
let id = 0; //给每一个 Watcher 增加一个 唯一标识
class Watcher {
  // vm 实例
  // exprOrFn vm._update(vm._render)
  constructor (vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof exprOrFn == 'function') {
      this.getter = exprOrFn;
    }
    this.cb = cb;
    this.options = options;
    this.id = id++;
    this.get ();

    this.deps = [];
    this.depsId = new Set ();
  }
  addDep (dep) {
    let id = dep.id;
    if (!this.depsId.has (id)) {
      this.depsId.add (id);
      this.deps.push (dep);
      dep.addSub (this);
    }
  }
  update () {
    this.get ();
  }
  get () {
    // this.getter (); //数据更新
    // Dep.target = watcher
    pushTarget (this); //jiajia加一个 watcher
    this.getter ();
    popTarget ();
  }
}

export default Watcher;
