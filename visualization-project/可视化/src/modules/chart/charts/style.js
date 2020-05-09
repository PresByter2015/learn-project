import getterSetter from 'modules/object/getterSetter'

/**
 * @class Style
 */
export default class {
  constructor() {
    this.style = {}
  }

  get(name) {
    return this.style[name]
  }

  set(name, value) {
    getterSetter(this.style, name, value)
  }

  toObject() {
    return this.style;
  }
}
