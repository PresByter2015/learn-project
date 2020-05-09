import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

/**
 * resizeHandler
 */
let resizeHandler = (function () {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => emitter.emit('resize'), 200);
  };
})();

window.addEventListener('resize', resizeHandler, false);

export default emitter;
