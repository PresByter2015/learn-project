import style from '../../style.js'
import intl from 'src/intl'

let hotConfig = [{
  title: intl.formatMessage({ id: 'thermal map', defaultMessage: '热力地图' }),
  fields: [{
    name: 'markType',
    value: 'hot',
    type: 'hidden'
  },
    {
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
  // title:'热区',
  title: intl.formatMessage({ id: 'hot area', defaultMessage: '热区' }),
  fields: [{
    name: 'visualMap_inRange_color_1',
    // label: '最大值',
    label: intl.formatMessage({ id: 'max', defaultMessage: '最大值' }),
    type: 'color',
    value: '#19a7f4'
  }, {
    name: 'visualMap_inRange_color_0',
    // label: '最小值',
    label: intl.formatMessage({ id: 'min', defaultMessage: '最小值' }),
    type: 'color',
    value: '#afdef4'
  }]
}];

export default hotConfig
