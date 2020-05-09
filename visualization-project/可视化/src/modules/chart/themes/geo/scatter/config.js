import style from '../../style.js'
import umbrella from './mark/ceng2.png'
import intl from 'src/intl'

let scatterConfig = [{
  title: intl.formatMessage({ id: 'scatter map', defaultMessage: '散点热力图' }),
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
    label: intl.formatMessage({ id: 'label', defaultMessage: '显示标签' }),
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
  title: intl.formatMessage({ id: 'show mark points', defaultMessage: '标记点' }),
  fields: [{
    name: 'series_itemStyle_normal_color',
    label: intl.formatMessage({ id: 'mark dot color', defaultMessage: '标记点颜色' }),
    type: 'color',
    value: 'rgba(12,171,243,0.6)'
  }, {
    name: 'series_symbol',
    label: intl.formatMessage({ id: 'mark dot shape', defaultMessage: '标记点形状' }),
    type: 'select',
    options: [{
      value: 'circle',
      label: intl.formatMessage({ id: 'circle', defaultMessage: '圆形' }),
    }, {
      value: 'rect',
      label: intl.formatMessage({ id: 'rect', defaultMessage: '矩形' }),
    }, {
      value: 'triangle',
      label: intl.formatMessage({ id: 'triangle', defaultMessage: '三角形' }),
    }, {
      value: 'image://' + umbrella,
      label: intl.formatMessage({ id: 'umbrella', defaultMessage: '安布雷拉' }),
    }],
    value: 'circle'
  }, {
    name: 'series_effectType',
    // label: '标记点动画',
    label: intl.formatMessage({ id: 'mark point animation', defaultMessage: '标记点动画' }),
    type: 'select',
    options: [{
      value: 0,
      // label: '无',
      // label: '涟漪'
      label:intl.formatMessage({ id: 'none', defaultMessage: '无' }),
    }, {
      value: 'ripple',
      // label: '涟漪'
      label:intl.formatMessage({ id: 'ripple', defaultMessage: '涟漪' }),
    }, {
      value: 'radiation',
      // label: '旋转'
      label: intl.formatMessage({ id: 'rotate', defaultMessage: '旋转' }),
    }, {
      value: 'raindrop',
      // label: '雨滴'
      label: intl.formatMessage({ id: 'raindrop', defaultMessage: '雨滴' }),
    }],
    value: 0
  }]
}]

export default scatterConfig
