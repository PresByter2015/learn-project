import { getChartDefaultOption } from '../config'

let axisData = ['周一','周二','周三','周四','周五','周六','周日']
let data = axisData.map(function (item, i) {
  return Math.round(Math.random() * 1000 * (i + 1))
})
let links = data.map(function (item, i) {
  return {
    source: i,
    target: i + 1
  }
})
links.pop()
const chartOption = {
  title: {
    text: '笛卡尔坐标系上的 Graph'
  },
  tooltip: {},
  xAxis: {
    type : 'category',
    boundaryGap : false,
    data : axisData
  },
  yAxis: {
    type : 'value'
  },
  series: [
    {
      type: 'graph',
      layout: 'none',
      coordinateSystem: 'cartesian2d',
      symbolSize: 40,
      label: {
        normal: {
          show: true
        }
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      data: data,
      links: links,
      lineStyle: {
        normal: {
          color: '#2f4554'
        }
      }
    }
  ]
}

const basic = Object.assign({}, getChartDefaultOption('graph'), {
  type: 'graph',
  chart: {
    option: Object.assign({}, getChartDefaultOption(), chartOption)
  }
})

export default {
  basic
}
