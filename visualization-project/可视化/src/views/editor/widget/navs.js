import intl from 'src/intl';

export default {
  graphics: {
    title: intl.formatMessage({ id: 'graphics', defaultMessage: '图形' }),
    themes: [
      { type: 'circle', klass: 'circle' } //圆
    ]
  },

  molds: {
    title: intl.formatMessage({ id: 'molds', defaultMessage: '模具' }),
    themes: [
      { type: 'mold', klass: 'mold' } //模具
    ]
  },

  charts: {
    title: intl.formatMessage({ id: 'charts', defaultMessage: '图表' }),
    themes: [
      { type: 'bar', klass: 'bar' }, //柱状图
      { type: 'line', klass: 'line' }, //折线图
      { type: 'pie', klass: 'pie' }, //饼图
      { type: 'gauge', klass: 'gauge' }, //仪表盘
      // { type: 'scatter', klass: 'scatter' }, //散点图(暂时注释掉)
      { type: 'radar', klass: 'radar' }, //雷达图
      { type: 'geo', klass: 'geo' }, //地图
      { type: 'funnel', klass: 'funnel' }, //漏斗图
      { type: 'table', klass: 'table' }, //表格
      { type: 'card', klass: 'card' }, // 应用卡片
      { type: 'process', klass: 'process' } //环状图
    ]
  },

  texts: {
    title: intl.formatMessage({ id: 'texts', defaultMessage: '文本' }),
    themes: [
      { type: 'text', klass: 'text' }, //文本
      { type: 'counter', klass: 'counter' } //滚动计数器
    ]
  },

  others: {
    title: intl.formatMessage({ id: 'others', defaultMessage: '其他' }),
    themes: [
      { type: 'time', klass: 'time' }, //时间
      { type: 'image', klass: 'image' }, //图片
      // { type: 'video', klass: 'video' }, //视频
      { type: 'dynamicimage', klass: 'dynamicimage' } //动态图片
    ]
  },

  video: {
    title: intl.formatMessage({ id: 'video', defaultMessage: '视频' }),
    themes: [
      { type: 'media', klass: 'media' }, //图片
     

    ]
  },
};
