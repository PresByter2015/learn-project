import { getChartDefaultOption } from '../../config';
import style from '../../style.js';
import intl from 'src/intl';

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
    data: [{
      name: `${intl.formatMessage({ id: 'visits', defaultMessage: '访问量' })}`, icon: 'circle'
    }, {
      name: `${intl.formatMessage({ id: 'response time', defaultMessage: '响应时间' })}`
    }]
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
    type: 'category',
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
      show: false,
      lineStyle: {
        color: '#236592',
        opacity: style.opacity
      }
    },
    data: ['14:20', '14:40', '15:00', '15:20', '15:40', '15:53']
  },
  yAxis: [{
    type: 'value',
    nameLocation: 'middle',
    nameGap: 35,
    max: undefined,
    min: undefined,
    interval: undefined,
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
  }, {
    type: 'value',
    min: undefined,
    max: undefined,
    interval: undefined,
    nameLocation: 'middle',
    nameGap: 35,
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
      show: false,
      lineStyle: {
        color: '#236592',
        opacity: style.opacity
      }
    }
  }],
  series: [{
    name: intl.formatMessage({ id: 'visits', defaultMessage: '访问量' }),
    barWidth: 10,
    type: 'bar',
    data: [100, 50, 150, 250, 410, 300]
  }, {
    name: intl.formatMessage({ id: 'response time', defaultMessage: '响应时间' }),
    type: 'line',
    lineMode: 1,
    yAxisIndex: 1,
    step: false,
    smooth: 0.4,
    symbol: 'circle',
    showSymbol: true,
    symbolSize: 5,
    lineStyle: {
      normal: {
        opacity: 1
      }
    },
    areaStyle: {
      normal: {
        show: false,
        opacity: 0
      }
    },
    data: [1, 0.8, 1.5, 2, 2.6, 2.3]
  }]
});
