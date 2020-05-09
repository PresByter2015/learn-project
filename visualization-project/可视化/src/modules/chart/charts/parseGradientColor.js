import colorUtils from 'utils/color'

/*
* 解析渐变颜色的深、浅
* deepAlpha: 较深部分的不透明度系数 1~100
* shallowAlpha: 较浅部分的不透明度系数 1~100
* */
export function parseGradientColor(color, deepAlpha, shallowAlpha) {
  let colorDeep = '' //较深部分
  let colorShallow = '' //较浅部分

  if (colorUtils.isRGBA(color)) {
    let dstColor = colorUtils.parseRgba(color)
    let parsedColor = dstColor.color
    let parsedAlpha = dstColor.alpha > 100 ? 100 : dstColor.alpha

    let alphaDeep = parsedAlpha * deepAlpha / 100
    let alphaShallow = parsedAlpha * shallowAlpha / 100

    colorDeep = colorUtils.hex2rgb(parsedColor, alphaDeep)
    colorShallow = colorUtils.hex2rgb(parsedColor, alphaShallow)
  } else {
    colorDeep = colorUtils.hex2rgb(color, deepAlpha)
    colorShallow = colorUtils.hex2rgb(color, shallowAlpha)
  }

  return { colorDeep, colorShallow }
}
