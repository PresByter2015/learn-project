import EventEmitter from 'eventemitter3';

let eventEmitter = new EventEmitter;

eventEmitter.emitAsync = function (event, id) {
  return new Promise(resolve => {
    this.emit(event, id);
    resolve();
  });
};

export default eventEmitter;
