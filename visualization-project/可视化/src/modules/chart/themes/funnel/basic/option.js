import { getChartDefaultOption } from '../../config'
import style from '../../style.js'
import intl from 'src/intl'

let color = ['#03a9f4', '#90ed7d', '#e2db1a', '#f79726', '#0677ff',
  '#6b2eda', '#30d209', '#2647ff', '#b121ef', '#f32d2e']

export default Object.assign({}, getChartDefaultOption(), {
  color,
  title: {
    //text: '线上服务转化率',
    textStyle: {
      color: style.title.textStyle.color,
      fontSize: style.title.textStyle.fontSize
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: false
  },
  legend: {
    orient: 'horizontal',
    left: style.legendPos.left,
    top: style.legendPos.top,
    textStyle: {
      color: style.fontColor,
      fontSize: style.legend.textStyle.fontSize
    },
    show: false,
    data: [
      { 
        icon: 'circle',
        name: intl.formatMessage({ id: 'access', defaultMessage: '访问' })
      },
      { 
        icon: 'circle',
        name: intl.formatMessage({ id: 'registered', defaultMessage: '注册' }) 
      },
      { 
        icon: 'circle',
        name: intl.formatMessage({ id: 'use', defaultMessage: '使用' })
      },
      { 
        icon: 'circle',
        name: intl.formatMessage({ id: 'advisory', defaultMessage: '咨询' }) 
      },
      { 
        icon: 'circle', 
        name: intl.formatMessage({ id: 'pay', defaultMessage: '付费' })
      }
    ]
  },
  series: [
    {
      //name: '预期',
      name: intl.formatMessage({ id: 'expected', defaultMessage: '预期' }),
      type: 'funnel',
      sort: 'descending',
      left: '10%',
      width: '80%',
      height: '80%',
      y: style.gridPos.legendTop,
      gap: 10,
      minSize: '0%',
      maxSize: '100%',
      label: {
        normal: {
          show: true,
          position: 'inside',
          formatter: '{b}',
          textStyle: {
            color: style.fontColor,
            fontSize: style.fontSize,
            fontWeight: 'normal'
          }
        },
        emphasis: {
          position:'inside',
          formatter: '{b}： {c}'
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 10
        }
      },
      itemStyle: {
        normal: {
          borderWidth: 0,
          opacity: 1
        }
      },
      data: [
        { 
          value: 100, 
          name: intl.formatMessage({ id: 'access', defaultMessage: '访问' })
        },
        { 
          value: 80, 
          name: intl.formatMessage({ id: 'registered', defaultMessage: '注册' }) 
        },
        { 
          value: 60, 
          name: intl.formatMessage({ id: 'use', defaultMessage: '使用' })
        },
        { 
          value: 40, 
          name: intl.formatMessage({ id: 'advisory', defaultMessage: '咨询' }) 
        },
        { 
          value: 20, 
          name: intl.formatMessage({ id: 'pay', defaultMessage: '付费' })
        }
      ]
    }
  ]
})
