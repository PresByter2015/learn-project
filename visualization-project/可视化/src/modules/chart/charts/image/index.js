import Chart from '../chart'

import { prefix as urlPrefix } from 'config/urls'
import { imagePath } from 'utils/image-path'


class Image extends Chart {
  constructor(option, el, theme) {
    super(option, el, theme)
  }

  setBackgroundStyle(imageUrl) {
  
    this.el.style.backgroundRepeat = 'no-repeat'
    this.el.style.backgroundSize = 'cover'
    this.el.style.backgroundClip = 'content-box'
    this.el.style.backgroundPosition = 'center center'
    this.el.style.backgroundImage = 'url(' + imagePath(urlPrefix, imageUrl) + ')';
  }

  setBorderStyleStyle(borderStyle) {
    if (borderStyle) {
      let border = `${borderStyle.width}px ${borderStyle.style || 'solid'} ${borderStyle.color}`
      this.el.style.border = border
    }
  }

}

export default Image
