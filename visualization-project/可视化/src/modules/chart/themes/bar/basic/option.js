import { getChartDefaultOption } from '../../config'
import style from '../../style.js'
import intl from 'src/intl'

export default Object.assign({}, getChartDefaultOption(), {
  title: {
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
      { 
        name: intl.formatMessage({ id: 'last month', defaultMessage: '上月' }), 
        icon: 'circle' 
      }, 
      { 
        name: intl.formatMessage({ id: 'this month', defaultMessage: '本月' }), 
        icon: 'circle' 
      }
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
  xAxis: {
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
    },
    data: [
      intl.formatMessage({ id: 'event', defaultMessage: '事件' }),
      intl.formatMessage({ id: 'problem', defaultMessage: '问题' }),
      intl.formatMessage({ id: 'change', defaultMessage: '变更' }),
      intl.formatMessage({ id: 'inspection', defaultMessage: '巡检' }),
      intl.formatMessage({ id: 'repair', defaultMessage: '修复' })
    ]
  },
  yAxis: [{
    nameLocation: 'middle',
    min: undefined,
    max: undefined,
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
      textStyle: {
        color: style.labelColor,
        fontSize: style.fontSize,
        opacity: style.notSupportOpacity
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#236592',
        opacity: style.opacity
      }
    }
  },{
    nameLocation: 'middle',
    nameTextStyle: {
      color: style.fontColor,
      opacity: style.opacity,
      fontSize: style.fontSize
    },
    axisLine: {
      show: false,
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
      show: false,
      margin: 8,
      textStyle: {
        color: style.labelColor,
        fontSize: style.fontSize,
        opacity: style.notSupportOpacity
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#236592',
        opacity: style.opacity
      }
    }
  }],
  series: [{
    barWidth: 10,
    name: intl.formatMessage({ id: 'last month', defaultMessage: '上月' }),
    type: 'bar',
    data: [40, 20, 10, 10, 20]
  }, {
    barWidth: 10,
    name: intl.formatMessage({ id: 'this month', defaultMessage: '本月' }),
    type: 'bar',
    data: [42, 30, 15, 10, 15]
  }]
})
