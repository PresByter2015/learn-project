import echarts from 'modules/echarts'
import { parseGradientColor } from './parseGradientColor'

//处理渐变的series
export function dealGradientSeries(series, seriesStyle, optionColor) {
  return series.map((item, index) => {
    Object.assign(item, seriesStyle)
    delete item.color
    item.gradient = null //避免合并时又合回去(notMerge为false时)

    let direction = ''
    let gradientGroup = seriesStyle.gradient.gradientGroup
    let colorGradient = []

    let { colorDeep, colorShallow } = parseGradientColor(optionColor[index], 100, 15)

    //当初始化的渐变色组合不足以满足配置的系列数时从option的color上取颜色
    if (gradientGroup.length < index + 1) {
      colorGradient = [colorDeep, colorShallow]
    } else {
      colorGradient = [gradientGroup[index][0], gradientGroup[index][1]]
    }

    if (seriesStyle.gradient.gradientDirection && seriesStyle.gradient.gradientDirection === 'horizontal') {
      //水平
      direction = [0, 0, 1, 0]
    } else {
      //默认垂直
      direction = [0, 0, 0, 1]
    }

    let itemStyle = {
      normal: {
        color: new echarts.graphic.LinearGradient(
          ...direction, [
            {
              offset: 0,
              color: colorGradient[0]
            },
            {
              offset: 1,
              color: colorGradient[1]
            }
          ]
        )
      }
    }

    item.itemStyle = itemStyle

    return item
  })
}
