import EventEmitter from 'eventemitter3'

/**
 * 键盘模块
 */
class Keyboard extends EventEmitter {
  constructor() {
    super()
    this.handlers = {}

    this.initKeyDown()
  }

  initKeyDown() {
    this.handleKeyDown = (event) => {
      let key = {
        meta: event.metaKey,
        ctrl: event.ctrlKey,
        shift: event.shiftKey,
        key: event.key,
        keyCode: event.keyCode || event.which
      }

      let shortcut =  this.getShortcut(key)

      if (shortcut) {
        shortcut = shortcut.split(' ')
        this.emit(shortcut[0], event, shortcut[1])
      }
    }

    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  getShortcut(key) {
    let { keyCode } = key

    // 保存
    if ((key.meta || key.ctrl) && keyCode === 83) {
      return 'save'
    }

    if ((key.meta || key.ctrl) && keyCode === 67) {
      return 'copy'
    }

    if ((key.meta || key.ctrl) && keyCode === 86) {
      return 'paste'
    }

    if (keyCode === 46 || keyCode === 8 || (key.meta && keyCode === 8)) {
      return 'delete'
    }

    // arrow left
    if (keyCode === 37) {
      return 'arrow left'
    }

    // arrow up
    if (keyCode === 38) {
      return 'arrow up'
    }

    // arrow right
    if (keyCode === 39) {
      return 'arrow right'
    }

    // arrow down
    if (keyCode === 40) {
      return 'arrow down'
    }

    return false
  }
}

export default new Keyboard
