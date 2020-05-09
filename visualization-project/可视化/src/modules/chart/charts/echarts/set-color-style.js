export default function (colorStyle) {
  this.setOptionColor(colorStyle)

  if (typeof this.afterSetColorStyle === 'function') {
    this.afterSetColorStyle(this.option.color)
  }
}
