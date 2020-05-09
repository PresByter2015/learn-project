/**
 * 部件类型默认单元格标准
 */
export const chartDefaultSize = {
  // 折线图
  line: { x: 34, y: 22 },

  // 柱状图
  bar: { x: 34, y: 22 },

  // 饼图
  pie: { x: 34, y: 22 },

  // 仪表盘
  gauge: { x: 22, y: 22 },

  // 文本
  text: { x: 22, y: 8 },

  // 滚动计数器
  counter: { x: 22, y: 8 },

  // 表格
  table: { x: 34, y: 22 },

  // 应用卡片
  card: { x: 20, y: 24 },

  // 地球仪
  globe: { x: 34, y: 34 },

  // 关系图
  ci: { x: 24, y: 18 },

  // 地图
  geo: { x: 34, y: 28 },

  // 漏斗图
  funnel: { x: 34, y: 34 },

  // 雷达图
  radar: { x: 30, y: 30 },

  // 散点图
  scatter: { x: 50, y: 35 },

  //图片
  image: { x: 22, y: 12 },

  //动态图片
  dynamicimage: { x: 10, y: 14 },
  
  //视频
  video: { x: 50, y: 54 },

  //时间
  time: { x: 22, y: 8 },

  //圆形
  circle: { x: 20, y: 20 },

  //环形图
  process: { x: 30, y: 30 },

  //模具
  mold: { x: 10, y: 10 }
};

export const chartDefaultOption = {
  color: [
    '#03a9f4',
    '#90ed7d',
    '#e2db1a',
    '#f32d2e',
    '#f79726',
    '#0677ff',
    '#6b2eda',
    '#30d209',
    '#2647ff',
    '#b121ef'
  ],
  textStyle: {
    color: 'rgba(255, 255, 255, 1)'
  }
};

export function getChartDefaultSize(type) {
  return chartDefaultSize[type] || {};
}

export function getChartDefaultOption() {
  return chartDefaultOption;
}
