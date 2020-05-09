import intl from 'src/intl'
import { getChartDefaultOption } from '../../config'
import style from '../../style.js'

let color = [ '#03a9f4', '#90ed7d', '#f32d2e', '#f79726', '#0677ff',
  '#6b2eda','#30d209', '#2647ff', '#b121ef', '#f32d2e']

let segement = intl.formatMessage({ id: 'segmented', defaultMessage: '分段' })

export default Object.assign({}, getChartDefaultOption(), {
  color,
  title: {
    //text: '服务器A内存平均使用率',
    textStyle: {
      fontWeight: 'normal',
      color: style.title.textStyle.color,
      fontSize: style.title.textStyle.fontSize
    }
  },
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: false
  },
  series: [{
    name: intl.formatMessage({ id: 'memory usage', defaultMessage: '内存使用率' }),
    type: 'gauge',
    min: 0,
    max: 100,
    splitNumber: 5,
    center: ['50%', '60%'],
    radius: '70%',
    startAngle: 200,
    endAngle: -20,
    title: {
      show: true,
      offsetCenter: [0, 0],
      textStyle: {
        color: style.fontColor,
        fontSize: style.fontSize,
        fontWeight: 'normal'
      }
    },
    axisLine: { // 坐标轴线
      lineStyle: { // 属性lineStyle控制线条样式
        scale: [
          { 
            name: `${segement}1`, 
            value: 3 
          },
          { 
            name: `${segement}2`, 
            value: 3 
          },
          { 
            name: `${segement}1`, 
            value: 3 
          }
        ],
        color: [
          [0.333333, '#93EB82'],
          [0.666666, '#E2D937'],
          [1, '#EA4129']
        ],
        number: 3,
        width: 6
      }
    },
    axisTick: {
      show: false,
      length: 10,
      lineStyle: {
        color: style.fontColor,
        width: 1
      }
    },
    splitLine: {
      show: false,
      length: 15,
      lineStyle: {
        color: style.fontColor,
        width: 1
      }
    },
    pointer: {
      show: false,
      width: 0,
      length: '80%'
    },
    itemStyle: {
      normal: {
        color: 'auto'
      }
    },
    axisLabel: {
      show: true,
      precise: 0,
      distance: 5,
      // formatter: '{value}%',
      textStyle: {
        fontSize: 12,
        color: 'auto'
      },
      color: 'auto'
    },
    detail: {
      show: true,
      precise: 0,
      offsetCenter: ['0%', '-40%'],
      formatter: '{value}%',
      textStyle: {
        color: 'auto',
        fontWeight: 'normal',
        fontSize: 20
      }
    },
    data: [{ value: 75, name: intl.formatMessage({ id: 'memory usage', defaultMessage: '内存使用率' }) }]
  }]
})
