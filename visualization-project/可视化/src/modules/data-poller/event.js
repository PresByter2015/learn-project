import EventEmitter from 'eventemitter3'
let eventEmitter = new EventEmitter

eventEmitter.emitAsync = function(event) {
  return new Promise(resolve => {
    this.emit(event)
    resolve()
  })
}

export default eventEmitter
