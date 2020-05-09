import intl from 'src/intl'
import style from '../../style.js'
import utils from '../../utils'

export default [{
  title: intl.formatMessage({ id: 'rose', defaultMessage: '玫瑰图' }),
  fields: [
    {
      name: 'series_center_0',
      label: intl.formatMessage({ id: 'horizontal', defaultMessage: '水平位置' }),
      type: 'number',
      suffix: '%',
      props: {
        min: 0,
        max: 100
      },
      value: 50
    },

    {
      name: 'series_center_1',
      label: intl.formatMessage({ id: 'vertical', defaultMessage: '垂直位置' }),
      type: 'number',
      suffix: '%',
      props: {
        min: 0,
        max: 100
      },
      value: 50
    },

    {
      name: 'series_radius_0',
      label: intl.formatMessage({ id: 'inner radius', defaultMessage: '内半径' }),
      type: 'number',
      suffix: '%',
      props: {
        min: 0,
        max: 100
      },
      value: 20
    },

    {
      name: 'series_radius_1',
      label: intl.formatMessage({ id: 'outer radius', defaultMessage: '外半径' }),
      type: 'number',
      suffix: '%',
      props: {
        min: 0,
        max: 100
      },
      value: 55
    }
  ]
}, {
  title: intl.formatMessage({ id: 'value label', defaultMessage: '值标签' }),
  fields: [
    {
      name: 'series_label_normal_show',
      label: intl.formatMessage({ id: 'value', defaultMessage: '值' }),
      type: 'checkbox',
      action: 'toggle',
      value: true
    },

    {
      type: 'compose',
      label: intl.formatMessage({ id: 'label font', defaultMessage: '字号' }),
      rel: 'toggle:series_label_normal_show',
      fields: [
        {
          name: 'series_label_normal_textStyle_fontSize',
          type: 'fontSizeSelect',
          value: style.fontSize
        },
        // {
        //   name: 'series_label_normal_textStyle_fontWeight',
        //   type: 'bold',
        //   value: false
        // },
        {
          name: 'series_label_normal_textStyle_color',
          type: 'color',
          value: style.fontColor
        }
      ]
    },

    {
      name: 'series_label_normal_position',
      label: intl.formatMessage({ id: 'position', defaultMessage: '位置' }),
      type: 'radioGroup',
      rel: 'toggle:series_label_normal_show',
      props: {
        options: [
          {
            name: intl.formatMessage({ id: 'inside', defaultMessage: '内部' }),
            value: 'inside'
          }, {
            name: intl.formatMessage({ id: 'outside', defaultMessage: '外部' }),
            value: 'outside'
          }
        ]
      },
      value: 'outside'
    },

    {
      name: 'series_labelLine_normal_show',
      label: intl.formatMessage({ id: 'label lines', defaultMessage: '标签线' }),
      type: 'checkbox',
      action: 'toggle',
      value: true
    },

    {
      name: 'series_labelLine_normal_length',
      label: intl.formatMessage({ id: 'length', defaultMessage: '标签线长' }),
      type: 'number',
      rel: 'toggle:series_labelLine_normal_show',
      value: 10
    }
  ]
}, {
  title: intl.formatMessage({ id: 'legend', defaultMessage: '图例' }),
  fields: [
    {
      name: 'legend_show',
      label: intl.formatMessage({ id: 'legend', defaultMessage: '图例' }),
      type: 'checkbox',
      value: false,
      action: 'toggle'
    },

    {
      type: 'compose',
      label: intl.formatMessage({ id: 'label font', defaultMessage: '字号' }),
      rel: 'toggle:legend_show',
      fields: [
        {
          name: 'legend_textStyle_fontSize',
          type: 'fontSizeSelect',
          value: style.legend.textStyle.fontSize
        },

        {
          name: 'legend_textStyle_color',
          type: 'color',
          value: style.legend.textStyle.color
        }
      ]
    },

    {
      name: 'legend_position',
      rel: 'toggle:legend_show',
      label: intl.formatMessage({ id: 'position', defaultMessage: '位置' }),
      type: 'radioGroup',
      props: {
        type: 'position'
      },
      value: 'right'
    }
  ]
}, {
  title: intl.formatMessage({ id: 'series', defaultMessage: '系列' }),
  fields: [
    utils.colorGroup({ label: intl.formatMessage({ id: 'category color', defaultMessage: '系列颜色' }), 
      name: 'color', value: ['#03A9F4', '#90ED7D', '#E2DB1A', '#F79726'] })
  ]
}]
