import { getChartDefaultOption } from '../../config'
import style from '../../style'

let dataSH = [
  [1,91,45,125,0.82,34,23,'良'],
  [2,65,27,78,0.86,45,29,'良'],
  [3,83,60,84,1.09,73,27,'良'],
  [4,109,81,121,1.28,68,51,'轻度污染'],
  [5,106,77,114,1.07,55,51,'轻度污染'],
  [6,109,81,121,1.28,68,51,'轻度污染'],
  [7,106,77,114,1.07,55,51,'轻度污染'],
  [8,89,65,78,0.86,51,26,'良'],
  [9,53,33,47,0.64,50,17,'良'],
  [10,80,55,80,1.01,75,24,'良'],
  [11,117,81,124,1.03,45,24,'轻度污染'],
  [12,99,71,142,1.1,62,42,'良'],
  [13,95,69,130,1.28,74,50,'良'],
  [14,116,87,131,1.47,84,40,'轻度污染'],
  [15,108,80,121,1.3,85,37,'轻度污染']
]

let itemStyle = {
  normal: {
    opacity: 0.8,
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)'
  }
}

export default Object.assign({}, getChartDefaultOption(), {
  legend: {
    left: style.legendPos.left,
    top: style.legendPos.top,
    orient: 'horizontal',
    data: [{ name: '上海', icon: 'circle' }],
    textStyle: {
      color: style.legend.textStyle.color,
      fontSize: style.legend.textStyle.fontSize
    },
    show: true
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
  tooltip: {
    padding: 10,
    backgroundColor: '#222',
    borderColor: '#777',
    borderWidth: 1,
  },
  xAxis: {
    type: 'value',
    //name: '日期',
    nameLocation: 'middle',
    nameGap: 30,
    nameTextStyle: {
      color: style.fontColor,
      opacity: style.opacity,
      fontSize: style.fontSize
    },
    min: undefined,
    max: undefined,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#236592',
        opacity: style.opacity
      }
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
  },
  yAxis: [{
    min: undefined,
    max: undefined,
    type: 'value',
    //name: 'AQI指数',
    nameLocation: 'middle',
    nameGap: 40,
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
  }],
  visualMap: [
    {
      left: 'right',
      top: '10%',
      min: 0,
      max: undefined,
      dimension: 2,
      show: false,
      itemWidth: 20,
      itemHeight: 120,
      calculable: false,
      precision: 0.1,
      textGap: 30,
      textStyle: {
        color: '#fff'
      },
      inRange: {
        symbolSize: [10, 50]
      },
      outOfRange: {
        symbolSize: [10, 70]
      }
    }
  ],
  series: [
    {
      name: '上海',
      type: 'scatter',
      symbol: 'circle',
      itemStyle: itemStyle,
      data: dataSH,
      symbolSize: (data) => {
        return Math.sqrt(data[2]) / 5e2
      }
    }]
})
