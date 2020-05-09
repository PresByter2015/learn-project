/**
 * 订阅者
 */
class Subscriber {
  constructor(id, option, callback) {
    this.id = id

    if (typeof option === 'function') {
      this.callback = option
    } else {
      this.option = option || {}
      this.callback = callback || function() {}
    }
  }

  receive(data, fieldsMap) {
    if (fieldsMap) {
      this.option.fields = fieldsMap
    }
    this.callback.bind(this, data, fieldsMap)()
    return this
  }

  setOption(option) {
    Object.assign(this.option, option)
    return this
  }

  destroy() {

  }
}

export default Subscriber
