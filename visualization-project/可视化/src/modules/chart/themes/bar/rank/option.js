import { getChartDefaultOption } from '../../config'
import style from '../../style.js'
import intl from 'src/intl'

function generatorColor(num) {
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push('#1EAAF1')
  }
  return arr
}

let color = generatorColor(10)

export default Object.assign({}, getChartDefaultOption(),{
  color,
  title: {
    //text: '攻击来源地区top5',
    textStyle: {
      color: style.title.textStyle.color,
      fontSize: style.title.textStyle.fontSize
    }
  },
  tooltip: {},
  legend: {
    orient: 'vertical',
    left: 'right',
    top: 'middle',
    textStyle: {
      color: style.legend.textStyle.color,
      fontSize: style.legend.textStyle.fontSize
    },
    show: true,
    data: [ intl.formatMessage({ id: 'area', defaultMessage: '地区' })]
  },
  grid: {
    top: style.gridPos.top,
    left: style.gridPos.left,
    right: style.gridPos.right,
    bottom: style.gridPos.bottom,
    containLabel: true,
    show: false,
    borderWidth: 1,
    borderColor: style.gridBorderColor
  },
  xAxis: {
    type: 'value',
    min: undefined,
    max: undefined,
    interval: undefined,
    nameTextStyle: {
      color: style.fontColor,
      opacity: style.opacity,
      fontSize: style.fontSize
    },
    axisLine: { //轴，下面有条是grid线，
      show: true,
      onZero: false,
      lineStyle: {
        color: style.axisLineColor,
        width: style.axisLine.lineStyle.width,
        opacity: style.notSupportOpacity
      }
    },
    axisTick: { //刻度
      show: false
    },
    axisLabel: {
      show: true,
      margin: 8,
      rotate: 0,
      textStyle: {
        color: style.labelColor,
        opacity: style.notSupportOpacity,
        fontSize: style.fontSize
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#236592',
        opacity: style.opacity
      }
    }
  },
  yAxis: [{
    inverse: true, // 反向坐标轴
    nameLocation: 'middle',
    type: 'category',
    nameTextStyle: {
      color: style.fontColor,
      opacity: style.opacity,
      fontSize: style.fontSize
    },
    axisLine: {
      show: true,
      onZero: false,
      lineStyle: {
        opacity: style.notSupportOpacity,
        color: style.axisLineColor,
        width: style.axisLine.lineStyle.width
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      margin: 8,
      rotate: 0,
      textStyle: {
        color: style.labelColor,
        opacity: style.notSupportOpacity,
        fontSize: style.fontSize
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#236592',
        opacity: style.opacity
      }
    },
    data: [
      intl.formatMessage({ id: 'jiangsu', defaultMessage: '江苏' }),
      intl.formatMessage({ id: 'zhejiang', defaultMessage: '浙江' }),
      intl.formatMessage({ id: 'shanghai', defaultMessage: '上海' }),
      intl.formatMessage({ id: 'beijing', defaultMessage: '北京' }),
      intl.formatMessage({ id: 'guangdong', defaultMessage: '广东' })],
  },{
    nameLocation: 'middle',
    type: 'category',
    nameTextStyle: {
      color: style.fontColor,
      opacity: style.opacity,
      fontSize: style.fontSize
    },
    axisLine: {
      show: false,
      onZero: false,
      lineStyle: {
        color: style.axisLineColor
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      margin: 8,
      rotate: 0,
      textStyle: {
        color: style.labelColor,
        opacity: style.notSupportOpacity,
        fontSize: style.fontSize
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#236592',
        opacity: style.opacity
      }
    },
    data: []
  }],
  series: [{
    name: intl.formatMessage({ id: 'area', defaultMessage: '地区' }),
    barWidth: 10,
    type: 'bar',
    label: {
      normal: {
        show: false,
        position: 'insideRight',
        formatter: '{c}',
        formatterIndex: '1', //自增属性
        textStyle: {
          color: style.fontColor,
          fontSize: style.fontSize,
          opacity: style.opacity
        }
      }
    },
    itemStyle: {
      normal: {}
    },
    data: [{ value: 410, itemStyle: { normal: {} } },
      { value: 360, itemStyle: { normal: {} } },
      { value: 329, itemStyle: { normal: {} } },
      { value: 303, itemStyle: { normal: {} } },
      { value: 267, itemStyle: { normal: {} } }]
  }]
})
