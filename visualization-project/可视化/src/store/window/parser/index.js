import Bar from './bar'
import Pie from './pie'
import Line from './line'
import Gauge from './gauge'
import Rank from './rank'
// import barLine from './barLine'
import Funnel from './funnel'
import Radar from './radar'
import Scatter from './scatter'
import Geo from './geo'

const Parser = {
  // 解析折线图
  line: Line,

  // 解析饼图
  pie: Pie,

  // 解析柱状图
  bar: Bar,

  // 解析仪表盘
  gauge: Gauge,

  //解析排名柱状图
  rank: Rank,

  // barLine: barLine,

  //解析漏斗图
  funnel: Funnel,

  //解析雷达图
  radar: Radar,

  //解析散点图
  scatter: Scatter,

  //解析地图
  geo: Geo

}

export default Parser
