import intl from 'src/intl'
import style from '../../style.js'
import utils from '../../utils'

export default [{
  title: intl.formatMessage({ id: 'theme', defaultMessage: '主题' }),
  fields: [
    {
      name: 'series_title_show',
      label: intl.formatMessage({ id: 'theme', defaultMessage: '主题' }),
      type: 'checkbox',
      action: 'toggle',
      value: true
    },

    {
      type: 'compose',
      rel: 'toggle:series_title_show',
      label: intl.formatMessage({ id: 'font', defaultMessage: '字体' }),
      className: 'font-combination',
      fields: [
        {
          name: 'series_title_textStyle_fontSize',
          type: 'fontSizeSelect',
          value: style.fontSize
        },

        {
          name: 'series_title_textStyle_fontWeight',
          type: 'bold',
          value: false
        },

        {
          name: 'series_title_textStyle_color',
          type: 'color',
          value: style.fontColor
        },
      ]
    },

    {
      name: 'series_detail_show',
      label: intl.formatMessage({ id: 'number', defaultMessage: '数值' }),
      type: 'checkbox',
      action: 'toggle',
      value: true
    },

    {
      type: 'compose',
      rel: 'toggle:series_detail_show',
      label: intl.formatMessage({ id: 'font', defaultMessage: '字号' }),
      fields: [
        {
          name: 'series_detail_textStyle_fontSize',
          type: 'fontSizeSelect',
          value: 20
        }
      ]
    },
  ]
}, {
  title: intl.formatMessage({ id: 'label', defaultMessage: '标签' }),
  fields: [
    {
      name: 'series_radius',
      label: intl.formatMessage({ id: 'outer radius', defaultMessage: '外半径' }),
      suffix: '%',
      type: 'number',
      value: 70
    },

    {
      name: 'series_axisLabel_show',
      label: intl.formatMessage({ id: 'label', defaultMessage: '标签' }),
      type: 'checkbox',
      action: 'toggle',
      value: true
    },

    {
      name: 'series_axisLabel_precise',
      label: intl.formatMessage({ id: 'accuracy', defaultMessage: '显示精度' }),
      type: 'number',
      props: {
        min: 0,
        max: 2
      },
      value: 0,
      rel: 'toggle:series_axisLabel_show'
    }
  ]
}, {
  title: intl.formatMessage({ id: 'segments number', defaultMessage: '分段数' }),
  fields: [
    {
      action: 'dynamicGrowth',
      name: 'series_axisLine_lineStyle_number',
      label: intl.formatMessage({ id: 'number of segments', defaultMessage: '分段个数' }), 
      type: 'number',
      value: 3,
      min: 1,
      max: 3
    },

    {
      rel: 'dynamicGrowth:series_axisLine_lineStyle_number',
      name: 'series_axisLine_lineStyle_scale',
      label: intl.formatMessage({ id: 'segment ratio', defaultMessage: '分段比例' }), 
      type: 'inputGroup',
      subType: 'number',
      value: [3, 3, 3]
    },

    utils.colorGroup({ label: intl.formatMessage({ id: 'segment color', defaultMessage: '分段颜色' }),
      name: 'series_axisLine_lineStyle_color',
      value: ['#03a9f4', '#90ed7d', '#f32d2e']
    }),

    {
      name: 'series_max',
      label: intl.formatMessage({ id: 'max', defaultMessage: '最大值' }),
      type: 'number',
      value: 100,
      min: 0
    },

    {
      name: 'series_min',
      label: intl.formatMessage({ id: 'min', defaultMessage: '最小值' }),
      type: 'number',
      value: 0,
      min: 0
    },

    {
      name: 'series_splitNumber',
      label: intl.formatMessage({ id: 'separated number', defaultMessage: '分割数' }),
      type: 'number',
      value: 5,
      min: 1
    },

    {
      name: 'series_startAngle',
      label: intl.formatMessage({ id: 'start angle', defaultMessage: '起始角度' }),
      type: 'number',
      value: 200
    },

    {
      name: 'series_endAngle',
      label: intl.formatMessage({ id: 'end angle', defaultMessage: '结束角度' }),
      type: 'number',
      value: -20
    },
  ]
}, {
  title: intl.formatMessage({ id: 'split line', defaultMessage: '分割线' }),
  fields: [
    {
      action: 'toggle',
      name: 'series_axisTick_show',
      label: intl.formatMessage({ id: 'small split line', defaultMessage: '小分割线' }),
      type: 'checkbox',
      value: false
    },

    {
      rel: 'toggle:series_axisTick_show',
      name: 'series_axisTick_length',
      label: intl.formatMessage({ id: 'length', defaultMessage: '线长' }),
      type: 'number',
      value: 5,
    },

    {
      action: 'toggle',
      name: 'series_splitLine_show',
      type: 'checkbox',
      label: intl.formatMessage({ id: 'large split line', defaultMessage: '大分割线' }),
      value: false
    },

    {
      rel: 'toggle:series_splitLine_show',
      name: 'series_splitLine_length',
      type: 'number',
      label: intl.formatMessage({ id: 'length', defaultMessage: '线长' }),
      value: 10,

    }
  ]
}, {
  title: intl.formatMessage({ id: 'pointer', defaultMessage: '指针' }),
  fields: [
    {
      name: 'series_pointer_length',
      label: intl.formatMessage({ id: 'pointer length', defaultMessage: '指针长度' }),
      type: 'number',
      value: 80,
      suffix: '%',
      min: 0
    },

    {
      name: 'series_pointer_width',
      label: intl.formatMessage({ id: 'pointer width', defaultMessage: '指针宽度' }),
      type: 'number',
      value: 0,
      min: 0
    }
  ]
}]
