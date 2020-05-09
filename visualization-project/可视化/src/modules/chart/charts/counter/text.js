class Text {
  constructor(char) {
    this.el = document.createElement('div')
    this.char = char

    this.el.textContent = this.char
  }

  setStyle() {

  }

  render(text) {
    this.el.textContent = text
  }
}

export default Text
