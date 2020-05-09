import Chart from '../chart'
import _ from 'lodash'

import { prefix as urlPrefix } from 'config/urls'
import { imagePath } from 'utils/image-path'

class DynamicImage extends Chart {
  constructor(option, el, theme) {
    super(option, el, theme)
    this.setData(option)
  }

  setData(partialOption) {
    if (partialOption && partialOption.image) {
      
      let imageUrl = partialOption.image;
      
      _.merge(this.option, partialOption); 

      this.el.style.backgroundRepeat = 'no-repeat'
      this.el.style.backgroundSize = 'cover'
      this.el.style.backgroundClip = 'content-box'
      this.el.style.backgroundPosition = 'center center'
      this.el.style.backgroundImage = 'url(' + imagePath(urlPrefix, imageUrl) + ')';
    } else {
      this.el.style.backgroundImage = 'none'
    }
  }

  setBorderStyleStyle(borderStyle) {
    if (borderStyle) {
      let border = `${borderStyle.width}px ${borderStyle.style || 'solid'} ${borderStyle.color}`
      this.el.style.border = border
    }
  }

}

export default DynamicImage
