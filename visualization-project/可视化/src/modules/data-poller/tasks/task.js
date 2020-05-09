import Subscriber from './subscriber'

/**
 * 任务
 */
class Task {
  constructor(id, option) {
    this.id = id
    this.status = 'waiting'
    this.subscribers = {}

    this.option = Object.assign({}, option)
    this.lastData = null
    this.callback = this.option.callback
  }

  setOption(name, value) {
    if (typeof name === 'string') {
      this.option[name] = value
    } else {
      for (let key in name) {
        this.option[key] = name[key]
      }
    }
  }

  start() {
    this.run()
  }

  stop() {
    this.status = 'stop'
  }

  parseData(data) {
    let parsedData = {}

    for (let key in data) {
      if (this.option.fields[key]) {
        data[key]['name'] = this.option.fields[key]
      }

      parsedData[key] = data[key]
    }

    return parsedData
  }

  intervalCallback() {
    this.callback(data => {
      this.lastData = data
      // 通知所有订阅者
  
      data = this.parseData(data)
      this.dispatch(data)
    })
  }

  run() {
    this.intervalCallback()
    this.status = 'running'
  }

  dispatch(data) {
    for (let id in this.subscribers) {
      let subscriber = this.subscribers[id]
      subscriber.receive(data, this.option.fields)
    }
  }

  destroy() {
    this.stop()
    this.subscribers = null
  }

  addSubscriber(id, option, callback, isRun = true) {
    if (id in this.subscribers) {
      this.subscribers[id]
    } else {
      this.subscribers[id] = new Subscriber(id, option, callback)
    }

    if (isRun && this.lastData) {
      this.subscribers[id].receive(this.lastData, this.option.fields)
    }
    return this
  }

  removeSubscriber(id) {
    let subscriber = this.subscribers[id]
    if (subscriber) {
      subscriber.destroy()
      subscriber = null
      delete this.subscribers[id]
    }
  }

  hasSubscribers() {
    return Object.keys(this.subscribers).length
  }

  getSubscriber(id) {
    return this.subscribers[id]
  }

  // 刷新
  flush(bool) {
    if (bool) {
      this.dispatch(this.lastData)
    } else {
      this.run()
    }
  }
}

export default Task
