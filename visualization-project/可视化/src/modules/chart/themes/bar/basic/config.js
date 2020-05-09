import style from '../../style.js'
import utils from '../../utils'
import intl from 'src/intl'

/**
 * 表单配置
 */
export default [{
  title: intl.formatMessage({ id: 'x axis', defaultMessage: 'X轴' }),
  fields: [
    {
      name: 'xAxis_axisLine_show',
      label: intl.formatMessage({ id: 'axis', defaultMessage: '轴线' }),
      type: 'checkbox',
      value: true,
      action: 'toggle'
    },

    {
      name: 'xAxis_axisLine_lineStyle_color',
      rel: 'toggle:xAxis_axisLine_show',
      label: intl.formatMessage({ id: 'color', defaultMessage: '轴线颜色' }),
      type: 'color',
      value: style.axisLineColor,
    },

    {
      name: 'xAxis_axisLabel_show',
      label: intl.formatMessage({ id: 'axis label', defaultMessage: '轴标签' }),
      type: 'checkbox',
      value: true,
      action: 'toggle'
    },

    {
      type: 'compose',
      rel: 'toggle:xAxis_axisLabel_show',
      label: intl.formatMessage({ id: 'label font', defaultMessage: '标签字体' }),
      fields: [
        {
          name: 'xAxis_axisLabel_textStyle_fontSize',
          type: 'FontSizeSelect',
          value: 12
        }, {
          name: 'xAxis_axisLabel_textStyle_color',
          type: 'color',
          value: style.labelColor
        }
      ]
    },

    {
      rel: 'toggle:xAxis_axisLabel_show',
      label: intl.formatMessage({ id: 'rotation angle', defaultMessage: '旋转角度' }),
      name: 'xAxis_axisLabel_rotate',
      type: 'number',
      suffix: intl.formatMessage({ id: 'degree', defaultMessage: '度' }),
      value: 0
    },

    {
      rel: 'toggle:xAxis_axisLabel_show',
      label: intl.formatMessage({ id: 'axis spacing', defaultMessage: '与轴间距' }),
      name: 'xAxis_axisLabel_margin',
      type: 'number',
      value: 8,
      props: {
        min: 0,
        max: 50
      }

    },

    // 辅助线
    {
      name: 'xAxis_splitLine_show',
      label: intl.formatMessage({ id: 'auxiliary line', defaultMessage: '辅助线' }),
      type: 'checkbox',
      value: true
    }
  ]
},

  //y轴
{
  title: intl.formatMessage({ id: 'y axis', defaultMessage: 'Y轴' }),
  fields: [
    {
      name: 'yAxis_axisLine_show',
      label: intl.formatMessage({ id: 'axis', defaultMessage: '轴线' }),
      type: 'checkbox',
      value: true,
    },

    {
      name: 'yAxis_axisLine_lineStyle_color',
      label: intl.formatMessage({ id: 'color', defaultMessage: '轴线颜色' }),
      type: 'color',
      value: style.axisLineColor
    },

    // 显示轴标签
    {
      name: 'yAxis_axisLabel_show',
      label: intl.formatMessage({ id: 'axis label', defaultMessage: '轴标签' }),
      type: 'checkbox',
      value: true,
      action: 'toggle'
    },

    {
      type: 'compose',
      rel: 'toggle:yAxis_axisLabel_show',
      label: intl.formatMessage({ id: 'label font', defaultMessage: '标签字体' }),
      fields: [
        {
          name: 'yAxis_axisLabel_textStyle_fontSize',
          type: 'FontSizeSelect',
          value: 12
        }, {
          name: 'yAxis_axisLabel_textStyle_color',
          type: 'color',
          value: style.labelColor
        }
      ]
    },

    {
      type: 'compose',
      rel: 'toggle:yAxis_axisLabel_show',
      label: intl.formatMessage({ id: 'axis spacing', defaultMessage: '与轴间距' }),
      fields: [
        {
          name: 'yAxis_axisLabel_margin',
          type: 'number',
          value: 8,
          props: {
            min: 0,
            max: 50
          }
        }
      ]
    },

    {
      name: 'yAxis_interval',
      label: intl.formatMessage({ id: 'interval', defaultMessage: '轴刻度' }),
      type: 'number',
      value: null,
      props: {
        min: 0
      }
    },
    {
      name: 'yAxis_max',
      label: intl.formatMessage({ id: 'max', defaultMessage: '最大值' }),
      type: 'number',
      value: null
    },

    {
      name: 'yAxis_min',
      label: intl.formatMessage({ id: 'min', defaultMessage: '最小值' }),
      type: 'number',
      value: null
    },
    {
      name: 'yAxis_splitLine_show',
      label: intl.formatMessage({ id: 'auxiliary line', defaultMessage: '辅助线' }),
      type: 'checkbox',
      value: true
    }
  ]
},
{
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
  title: intl.formatMessage({ id: 'series', defaultMessage: '系列' }),
  fields: [
    {
      name: 'series_gradient_type',
      label: intl.formatMessage({ id: 'fill style', defaultMessage: '填充样式' }),
      rel: 'disable:series_stack',
      type: 'radioGroup',
      props: {
        type: 'colorType'
      },
      value: 'single',
      action: 'toggle'
    },

    utils.colorGroup({
      label: intl.formatMessage({ id: 'column color', defaultMessage: '柱体颜色' }),
      name: 'color',
      value: ['#03a9f4', '#90ed7d'],
      rel: 'toggle:series_gradient_type=single'
    }),

    {
      name: 'series_gradient_gradientGroup',
      label: intl.formatMessage({ id: 'column color', defaultMessage: '柱体颜色' }),
      type: 'colorGradient',
      value: [
        ['rgba(3, 169, 244, 1)', 'rgba(3, 169, 244, 0.15)'],
        ['rgba(144, 237, 125, 1)', 'rgba(144, 237, 125, 0.15)']
      ],
      rel: 'toggle:series_gradient_type=gradient'
    },
    {
      name: 'series_gradient_gradientDirection',
      label: intl.formatMessage({ id: 'degree', defaultMessage: '角度' }),
      type: 'radioGroup',
      props: {
        type: 'colorGradientDirection'
      },
      value: 'vertical',
      rel: 'toggle:series_gradient_type=gradient'
    },

    {
      name: 'series_barWidth',
      label: intl.formatMessage({ id: 'width', defaultMessage: '柱体宽度' }),
      type: 'number',
      props: {
        min: 1
      },
      value: 10
    },

    {
      name: 'series_stack',
      label: intl.formatMessage({ id: 'stacked', defaultMessage: '堆叠' }),
      type: 'checkbox',
      value: false,
      action: 'disable',
      rel: 'toggle:series_gradient_type=single'
    },
    
    {
      name: 'animation',
      label: intl.formatMessage({ id: 'show animation', defaultMessage: '开启动画' }),
      type: 'checkbox',
      value: false,
    },
  ]
}
]
