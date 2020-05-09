import { getChartDefaultOption } from '../../config'
import style from '../../style.js'
import intl from 'src/intl'

let  color = ['rgba(3, 169, 244, 1)', 'rgba(144, 237, 125, 1)', '#e2db1a', '#f79726',
  '#0677ff', '#6b2eda', '#30d209', '#2647ff', '#b121ef', '#f32d2e' ]
export default Object.assign({}, getChartDefaultOption(), {
  color,
  title: {
    //text: '机房规划设备与实际设备对比',
    textStyle: {
      color: style.title.textStyle.color,
      fontSize: style.title.textStyle.fontSize
    }
  },
  tooltip: {},
  legend: {
    orient: 'horizontal',
    left: style.legendPos.left,
    top: style.legendPos.top,
    textStyle: {
      color: style.legend.textStyle.color,
      fontSize: style.legend.textStyle.fontSize
    },
    show: true,
    data: [
      { name: intl.formatMessage({ id: 'number of planning equipment', defaultMessage: '规划设备数' }), icon: 'circle' }, 
      { name: intl.formatMessage({ id: 'actual number of devices', defaultMessage: '实际设备数' }), icon: 'circle' }
    ]
  },
  grid: {
    top: style.gridPos.legendTop,
    left: style.gridPos.left,
    right: style.gridPos.right,
    bottom: style.gridPos.bottom,
    containLabel: true,
    show: false,
    borderWidth: 1,
    borderColor: style.gridBorderColor
  },
  radar: [{
    shape: 'circle',
    splitNumber: 4,
    center: ['50%', '50%'],
    indicator: [
      { 
        name: intl.formatMessage({ id: 'pc server', defaultMessage: 'PC服务器' }), 
        max: 300 
      },
      { 
        name: intl.formatMessage({ id: 'minicomputer', defaultMessage: '小型机' }), 
        max: 100 
      },
      { 
        name: intl.formatMessage({ id: 'virtual machine', defaultMessage: '虚拟机' }), 
        max: 250 
      },
      { 
        name: intl.formatMessage({ id: 'storage device', defaultMessage: '存储设备' }), 
        max: 100 
      },
      { 
        name: intl.formatMessage({ id: 'database', defaultMessage: '数据库' }), 
        max: 200 
      },
      { 
        name: intl.formatMessage({ id: 'middleware', defaultMessage: '中间件' }), 
        max: 150 
      }
    ],
    radius: '60%',
    name: {
      show: true,
      formatter:'{value}',
      textStyle: {
        color: style.labelColor,
        fontSize: style.fontSize,
        opacity: style.opacity
      }
    },
    axisLine: {
      show: true
    },
    areaStyle: {
      color: 'rgba(91, 182, 255, 0.07)'
    }
  }],
  series: [{
    //name: '预算 vs 开销',
    type: 'radar',
    areaStyle: {
      normal: {
        show: true,
        opacity: 0.2
      }
    },
    label: {
      normal: {
        show: false,
        textStyle: {
          color: style.fontColor,
          fontSize: 12,
          fontWeight: 'bold'
        }
      }
    },
    showSymbol: true,
    symbol: 'circle',
    symbolSize: 5,
    data: [{
      value : [294, 89, 138, 97, 143, 103],
      name : intl.formatMessage({ id: 'number of planning equipment', defaultMessage: '规划设备数' }),
      lineStyle: {
        normal: {
          type: 'dashed'
        }
      }
    },
    {
      value : [279, 91, 232, 81, 170, 132],
      name : intl.formatMessage({ id: 'actual number of devices', defaultMessage: '实际设备数' }),
      lineStyle: {
        normal: {
          type: 'solid'
        }
      }
    }
    ]
  }]
})
