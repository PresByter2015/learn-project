import intl from 'src/intl'
import { getChartDefaultOption } from '../../config'
import style from '../../style'

const serverA = intl.formatMessage({
  id: 'server a',
  defaultMessage: '服务器A'
})

const serverB = intl.formatMessage({
  id: 'server b',
  defaultMessage: '服务器B'
})

export default Object.assign({}, getChartDefaultOption(), {
  title: {
    //text: '服务器A与服务器B的CPU使用率趋势图',
    textStyle: {
      color: style.title.textStyle.color,
      fontSize: style.title.textStyle.fontSize
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: style.chartBorderColor
      }
    }
  },
  legend: {
    orient: 'horizontal',
    left: style.legendPos.left,
    top: style.legendPos.top,
    textStyle: {
      fontSize: style.fontSize,
      color: style.fontColor
    },
    show: true,
    data: [{ name: serverA }, { name: serverB }]
  },
  grid: {
    top: style.gridPos.legendTop,
    left: style.gridPos.left,
    right: style.gridPos.right,
    bottom: style.gridPos.bottom,
    containLabel: true
  },
  toolbox: {
    show: true
  },
  xAxis: {
    boundaryGap : false,
    nameTextStyle: {
      color: style.fontColor,
      opacity: style.opacity,
      fontSize: style.fontSize
    },
    axisLine: { //轴，下面有条是grid线，
      show: true,
      onZero: true,
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
    data: ['14:20', '14:40', '15:00', '15:20', '15:40', '15:53']
  },
  yAxis: [{
    max: undefined,
    min: undefined,
    //interval: undefined,
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
    }
  },{
    min: undefined,
    max: undefined,
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
    }
  }],
  series: [{
    name: serverA,
    type: 'line',
    showSymbol: true, //自加属性
    symbol: 'circle',
    symbolSize: 5,
    lineMode: 1, //自行设定的折线属性 1为平滑折线 2为普通折线 3为阶梯折线
    step: false,
    smooth: 0.3,
    lineStyle: {
      normal: {
        opacity: 1
        //color: '#03a9f4'
      }
    },
    areaStyle: {
      normal: {
        show: true,
        //color: '#03a9f4',
        opacity: 0.2
      }
    },
    data: [30, 40, 15, 5, 15, 25]
  }, {
    name: serverB,
    type: 'line',
    lineMode: 1,
    showSymbol: true, //自加属性
    symbol: 'circle',
    symbolSize: 5,
    smooth: 0.3,
    step: false,
    lineStyle: {
      normal: {
        opacity: 1,
        //color: '#90ed7d'
      }
    },
    areaStyle: {
      normal: {
        show: true,
        //color: '#90ed7d',
        opacity: 0.2
      }
    },
    data: [40, 45, 60, 30, 20, 10]
  }]
})

