import style from '../../style'
import intl from 'src/intl'

/* eslint-disable */
export default [{

  title: 'X轴',
  fields: [
    {
      name: 'xAxis_axisLine_show',
      label: intl.formatMessage({ id: 'axis', defaultMessage: '轴线' }),
      type: 'checkbox',
      value: true,
      action: 'toggle'
    },
    
    {
      type: 'compose',
      rel: 'toggle:xAxis_axisLine_show',
      label: intl.formatMessage({ id: 'color', defaultMessage: '轴线颜色' }),
      fields: [
        { 
          name: 'xAxis_axisLine_lineStyle_color',
          type: 'color',
          value: style.axisLineColor
        }]
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
      type: 'compose',
      rel: 'toggle:xAxis_axisLabel_show',
      name: 'xAxis_axisLabel_rotate',
      label: intl.formatMessage({ id: 'rotation angle', defaultMessage: '旋转角度' }),
      suffix: intl.formatMessage({ id: 'degree', defaultMessage: '度' }),
      type: 'number',
      value: 0
    },

    { 
      type: 'compose',
      rel: 'toggle:xAxis_axisLabel_show',
      name: 'xAxis_axisLabel_margin',
      label: intl.formatMessage({ id: 'axis spacing', defaultMessage: '与轴间距' }),
      type: 'number',
      props: {
        min: 0,
        max: 50
      },
      value: 8
    },

    { 
      name: 'xAxis_splitLine_show',
      label: intl.formatMessage({ id: 'auxiliary line', defaultMessage: '辅助线' }),
      type: 'checkbox',
      value: false
    },
  ]
},

  //y轴
  { 
    title: 'Y轴',
    fields: [
      {
        name: 'yAxis_axisLine_show',
        label: intl.formatMessage({ id: 'axis', defaultMessage: '轴线' }),
        type: 'checkbox',
        value: true,
        action: 'toggle'
      },
      
      {
        type: 'compose',
        rel: 'toggle:yAxis_axisLine_show',
        label: intl.formatMessage({ id: 'color', defaultMessage: '轴线颜色' }),
        fields: [
          { 
            name: 'yAxis_axisLine_lineStyle_color',
            type: 'color',
            value: style.axisLineColor
          }]
      },

    {
      name: 'yAxis_axisLabel_show',
      label: intl.formatMessage({ id: 'axis label', defaultMessage: '轴标签' }),
      type: 'checkbox',
      value: true,
      action: 'toggle'
    },
    
    {
      type: 'compose',
      label: intl.formatMessage({ id: 'label font', defaultMessage: '标签字体' }),
      rel: 'toggle:yAxis_axisLabel_show',
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
        name: 'yAxis_axisLabel_margin',
        label: intl.formatMessage({ id: 'axis spacing', defaultMessage: '与轴间距' }),
        type: 'number',
        props: {
          min: 0,
          max: 50
        },
        value: 8
      },

      { 
        name: 'yAxis_interval',
        label: '轴刻度',
        type: 'number',
        value: undefined
      },

      { 
        name: 'yAxis_max',
        // label: '最大值',
        label: intl.formatMessage({ id: 'max', defaultMessage: '最大值' }),
        type: 'number',
        value: undefined
      },

      { 
        name: 'yAxis_min',
        // label: '最小值',
        label: intl.formatMessage({ id: 'min', defaultMessage: '最小值' }),
        type: 'number',
        value: undefined
      },
      { 
        name: 'yAxis_splitLine_show',
        label: intl.formatMessage({ id: 'auxiliary line', defaultMessage: '辅助线' }),
        type: 'checkbox',
        value: true
      }]
  },

  {
  title: intl.formatMessage({ id: 'show legend', defaultMessage: '图例' }),
  fields: [
    {
      name: 'legend_show',
      label: intl.formatMessage({ id: 'show legend', defaultMessage: '图例' }),
      type: 'checkbox',
      value: true,
      action: 'toggle'
    },
    
    {
      type: 'compose',
      label: intl.formatMessage({ id: 'font', defaultMessage: '字体' }),
      rel: 'toggle:legend_show',
      fields: [
        {
          name: 'legend_textStyle_fontSize',
          type: 'fontSizeSelect',
          value: 12
        },
        {
          name: 'legend_textStyle_color',
          type: 'color',
          value: '#fff'
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
    }]
},

  //系列
  {
    title: '系列',
    fields: [{
        name: 'color',
        label: intl.formatMessage({ id: 'category color', defaultMessage: '系列颜色' }),
        type: 'colorGroup',
        props: {
          type: 'group'
        },
        value: ['#03a9f4']
      },
      {
        name: 'series_symbol',
        label: intl.formatMessage({ id: 'mark dot shape', defaultMessage: '标记点形状' }),
        type: 'radioGroup',
        props: {
          options: [
            {name: intl.formatMessage({ id: 'circle', defaultMessage: '圆形' }), value: 'circle'},
            {name: intl.formatMessage({ id: 'pin', defaultMessage: '气泡' }), value: 'pin'},
            {name: intl.formatMessage({ id: 'diamond', defaultMessage: '菱形' }), value: 'diamond'},
            {name: intl.formatMessage({ id: 'triangle', defaultMessage: '等边三角' }), value: 'triangle'},
          ]
        },
        value: 'circle'
      }]
  }
]
/* eslint-enable */
