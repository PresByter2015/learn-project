import intl from 'src/intl'
import { getChartDefaultOption } from '../../config'
import style from '../../style.js'

let color = [ '#03a9f4', '#90ed7d', '#e2db1a', '#f79726', '#0677ff',
  '#6b2eda','#30d209', '#2647ff', '#b121ef', '#f32d2e']
export default Object.assign({}, getChartDefaultOption(), {
  color,
  title: {
    textStyle: {
      color: style.title.textStyle.color,
      fontSize: style.title.textStyle.fontSize
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    top: 'center',
    padding: [0, 20, 0, 0],
    textStyle: {
      color: style.legend.textStyle.color,
      fontSize: style.legend.textStyle.fontSize
    },
    show: false,
    data: [
      { name: intl.formatMessage({ id: 'remind', defaultMessage: '提醒' }), icon: 'circle' },
      { name: intl.formatMessage({ id: 'warning', defaultMessage: '警告' }), icon: 'circle' },
      { name: intl.formatMessage({ id: 'critical', defaultMessage: '严重' }), icon: 'circle' },
      { name: intl.formatMessage({ id: 'main', defaultMessage: '主要' }), icon: 'circle' }
    ]
  },
  series: [{
    name: intl.formatMessage({ id: 'category', defaultMessage: '分类' }),
    type: 'pie',
    radius : ['0%', '60%'],
    center: ['50%', '50%'],
    avoidLabelOverlap: true,
    label: {
      normal: {
        show: true,
        position: 'outside',
        textStyle: {
          color: style.fontColor,
          fontWeight: 'normal',
          fontSize: style.fontSize
        }
      },
      emphasis: {
        show: true,
        textStyle: {
          fontSize: '20',
          fontWeight: 'bold'
        }
      }
    },
    labelLine: {
      normal: {
        show: true,
        length: 10,
        lineStyle: {
          //color: style.fontColor
        }
      }
    },
    data: [{
      value: 30,
      name: intl.formatMessage({ id: 'warning', defaultMessage: '警告' })
    },{
      value: 50,
      name: intl.formatMessage({ id: 'remind', defaultMessage: '提醒' })
    }, {
      value: 60,
      name: intl.formatMessage({ id: 'main', defaultMessage: '主要' })
    },{
      value: 100,
      name: intl.formatMessage({ id: 'critical', defaultMessage: '严重' })
    }]
  }]
})
