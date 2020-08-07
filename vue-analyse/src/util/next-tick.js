let callbacks = [];
let pending = false;
function flushCallbacks () {
  //   callbacks.forEach (cb => cb ());
  while (callbacks.length) {
    let cb = callbacks.shift ();
    cb ();
  }
  pending = false;
}
let timerFunc;
if (Promise) {
  // then方法是异步的
  timerFunc = () => {
    Promise.resolve ().then (flushCallbacks);
  };
} else if (MutationObserver) {
  //监控dom
  // MutationObserver 也是一个异步方法
  let observe = new MutationObserver (flushCallbacks); // H5的api，监控dom的变化
  let textNode = document.createTextNode (1);
  observe.observe (textNode, {
    //监控 文本节点里面字符的变化
    characterData: true,
  });
  timerFunc = () => {
    textNode.textContent = 2; //文本节点一变化 就执行flushCallbacks
  };
} else if (setImmediate) {
  //IE浏览器的API
  timerFunc = () => {
    setImmediate (flushCallbacks);
  };
} else {
  timerFunc = () => {
    setTimeout (flushCallbacks, 0);
  };
}
export function nextTick (cb) {
  callbacks.push (cb);
  timerFunc ();
  pending = true;
}
