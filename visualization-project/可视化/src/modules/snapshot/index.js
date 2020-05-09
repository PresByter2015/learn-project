// import html2canvas from 'html2canvas'
import html2canvas from 'modules/html2canvas'
import browser from 'utils/browser'
import PrintDOM from 'utils/print-dom'
import domtoimage from 'dom-to-image'
import $ from 'jquery'

/**
 * 截屏模块
 */
export default function (elem, option) {
  return new Promise((resolve, reject) => {
    if (!isElement(elem)) {
      return reject('invalid dom node')
    }

    if (browser.msie) {
      //IE9 IE10调用print-dom
      if (browser.versionNumber < 11) {
        PrintDOM(elem, (imageSrc) => {
          resolve(imageSrc)
        })
      } else {
        //IE11调用html2canvas
        html2canvas(elem, {
          width: option.width,
          height: option.height,
          onrendered: (canvas) => {
            const src = canvas.toDataURL()

            resolve(src)
          }
        })
      }
      
    } else {
      domtoimage.toPng($('.grid-for-snapshot')[0]).then(function (dataUrl) {
        resolve(dataUrl)
      })
    }

  })
}

function isElement(elem) {
  return elem && typeof elem === 'object' && elem.nodeType === 1
}
