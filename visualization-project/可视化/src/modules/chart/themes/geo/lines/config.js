import style from '../../style.js'
import intl from 'src/intl'

let linesConfig = [{
  title: intl.formatMessage({ id: 'fly line map', defaultMessage: '飞线地图' }),
  fields: [{
    name: 'geo_itemStyle_normal_color',
    label: intl.formatMessage({ id: 'area color', defaultMessage: '区域颜色' }),
    type: 'color',
    value: '#13487b'
  }, {
    name: 'geo_itemStyle_normal_borderColor',
    label: intl.formatMessage({ id: 'area strokes', defaultMessage: '地区区域描边' }),
    type: 'color',
    value: '#2079b1'
  }, {
    name: 'series_label_normal_show',
    label: intl.formatMessage({ id: 'show label', defaultMessage: '显示标签' }),
    type: 'checkbox',
    value: false,
    action: 'toggle'
  }, {
    type: 'compose',
    label: intl.formatMessage({ id: 'label font', defaultMessage: '标签字体' }),
    rel: 'toggle:series_label_normal_show',
    fields: [{
      name: 'series_label_normal_textStyle_fontSize',
      type: 'fontSizeSelect',
      value: 12
    }, {
      name: 'series_label_normal_textStyle_color',
      type: 'color',
      value: '#fff'
    }]
  }]
}, {
  title: intl.formatMessage({ id: 'legend', defaultMessage: '图例' }),
  fields: [{
    name: 'legend_show',
    label: intl.formatMessage({ id: 'legend', defaultMessage: '图例' }),
    type: 'checkbox',
    value: false,
    action: 'toggle'
  }, {
    name: 'legend_position',
    rel: 'toggle:legend_show',
    label: intl.formatMessage({ id: 'display position', defaultMessage: '显示位置' }),
    type: 'radioGroup',
    props: {
      type: 'position'
    },
    value: 'right'
  }, {
    type: 'compose',
    label: intl.formatMessage({ id: 'font', defaultMessage: '字体' }),
    rel: 'toggle:legend_show',
    fields: [{
      name: 'legend_textStyle_fontSize',
      type: 'fontSizeSelect',
      value: style.legend.textStyle.fontSize
    }, {
      name: 'legend_textStyle_color',
      type: 'color',
      value: style.legend.textStyle.color
    }]
  }]
}, {
  title: intl.formatMessage({ id: 'flying line', defaultMessage: '飞线' }),
  fields: [{
    name: 'series_lineStyle_normal_color',
    label: intl.formatMessage({ id: 'flying line color', defaultMessage: '飞线颜色' }),
    type: 'color',
    value: '#ffeb10'
  }, {
    name: 'series_lineStyle_normal_width',
    label: intl.formatMessage({ id: 'flying line width', defaultMessage: '飞线宽度' }),
    type: 'number',
    props: {
      min: 0,
      max: 5,
      step: 1
    },
    value: 1
  }, {
    name: 'series_lineStyle_normal_curveness',
    label: intl.formatMessage({ id: 'flying line height', defaultMessage: '飞线高度' }),
    type: 'number',
    props: {
      min: 0,
      max: 1,
      step: 0.1
    },
    value: 0.2
  }]
}]

export default linesConfig
