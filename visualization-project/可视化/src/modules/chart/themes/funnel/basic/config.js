import style from '../../style.js'
import intl from 'src/intl'

export default [{
  title: intl.formatMessage({ id: 'funnel', defaultMessage: '漏斗图' }),
  fields: [
    {
      name: 'series_minSize',
      label: intl.formatMessage({ id: 'min width', defaultMessage: '最小映射宽度' }),
      type: 'number',
      suffix: '%',
      value: 0
    },

    {
      name: 'series_maxSize',
      label: intl.formatMessage({ id: 'max width', defaultMessage: '最大映射宽度' }),
      type: 'number',
      suffix: '%',
      value: 100
    },

    {
      name: 'series_sort',
      label: intl.formatMessage({ id: 'sort', defaultMessage: '排序' }),
      type: 'radioGroup',
      props: {
        options: [
          {
            name: intl.formatMessage({ id: 'reverse', defaultMessage: '倒序' }),
            value: 'descending'
          }, {
            name: intl.formatMessage({ id: 'positive', defaultMessage: '正序' }),
            value: 'ascending'
          }
        ]
      },
      value: 'descending'
    }
  ]
}, {
  title: intl.formatMessage({ id: 'legend', defaultMessage: '图例' }),
  fields: [
    {
      name: 'legend_show',
      label: intl.formatMessage({ id: 'legend', defaultMessage: '图例' }),
      type: 'checkbox',
      value: true,
      action: 'toggle'
    },

    {
      type: 'compose',
      rel: 'toggle:legend_show',
      label: intl.formatMessage({ id: 'font', defaultMessage: '字体' }),
      fields: [
        {
          name: 'legend_textStyle_fontSize',
          type: 'fontSizeSelect',
          value: 12
        },
        {
          name: 'legend_textStyle_color',
          type: 'color',
          value: style.legend.textStyle.color
        }
      ]
    },

    // 显示位置
    {
      name: 'legend_position',
      rel: 'toggle:legend_show',
      label: intl.formatMessage({ id: 'position', defaultMessage: '位置' }),
      type: 'radioGroup',
      props: {
        type: 'position'
      },
      value: 'top'
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
      rel: 'toggle:series_label_normal_show',
      label: intl.formatMessage({ id: 'label font', defaultMessage: '标签字体' }),
      fields: [
        {
          name: 'series_label_normal_textStyle_fontSize',
          type: 'fontSizeSelect',
          value: style.fontSize
        },
        {
          name: 'series_label_normal_textStyle_color',
          type: 'color',
          value: style.fontColor
        }
      ]
    },

    {
      name: 'series_label_normal_position',
      label: intl.formatMessage({ id: 'position', defaultMessage: '显示位置' }),
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
      value: 'inside'
    },

    {
      name: 'series_labelLine_normal_show',
      label: intl.formatMessage({ id: 'label line', defaultMessage: '标签线' }),
      type: 'checkbox',
      action: 'toggle',
      value: true
    },

    {
      name: 'series_labelLine_normal_length',
      label: intl.formatMessage({ id: 'label line length', defaultMessage: '标签线长' }),
      type: 'number',
      rel: 'toggle:series_labelLine_normal_show',
      value: 10
    }
  ]
}, {
  title: intl.formatMessage({ id: 'series', defaultMessage: '系列' }),
  fields: [
    {
      name: 'color',
      label: intl.formatMessage({ id: 'category color', defaultMessage: '分类颜色' }),
      type: 'colorGroup',
      props: {
        type: 'group'
      },
      value: ['#03A9F4', '#90ED7D', '#E2DB1A', '#F79726', '#0677FF']
    }
  ]
}]
