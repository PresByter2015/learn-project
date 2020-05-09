import style from '../../style'
import utils from '../../utils'
import intl from 'src/intl'

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
      rel: 'toggle:xAxis_axisLabel_show',
      name: 'xAxis_axisLabel_rotate',
      label: intl.formatMessage({ id: 'rotation angle', defaultMessage: '旋转角度' }),
      suffix: intl.formatMessage({ id: 'degree', defaultMessage: '度' }),
      type: 'number',
      value: 0
    },

    { 
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
      value: true
    },
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
    }]
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
  title: intl.formatMessage({ id: 'series', defaultMessage: '系列' }),
  fields: [
    utils.colorGroup({ label: `${ intl.formatMessage({ id: 'polyline color', defaultMessage: '折线颜色' }) }` }),
    {
      name: 'series_areaStyle_show',
      label: intl.formatMessage({ id: 'filled', defaultMessage: '填充' }),
      type: 'checkbox',
      value: true,
      action: 'toggle'
    },

    {
      name: 'series_gradient_type',
      label: intl.formatMessage({ id: 'fill style', defaultMessage: '填充样式' }),
      rel: 'toggle:series_areaStyle_show',
      type: 'radioGroup',
      props: {
        type: 'colorType'
      },
      value: 'single',
      action: 'toggle'
    },
      
    { 
      rel: 'toggle:series_areaStyle_show,series_gradient_type=single',
      name: 'series_areaStyle_opacity',
      label: intl.formatMessage({ id: 'transparency', defaultMessage: '面积透明度' }),
      type: 'slider',
      value: 0.2
    },

    { 
      name: 'series_showSymbol',
      label: intl.formatMessage({ id: 'mark points', defaultMessage: '标记点' }),
      type: 'checkbox',
      value: true,
      action: 'toggle'
    },

    { 
      rel: 'toggle:series_showSymbol',
      name: 'series_symbolSize',
      label: intl.formatMessage({ id: 'mark dot size', defaultMessage: '标记点大小' }),
      type: 'number',
      props: {
        min: 0,
        max: 20
      },
      value: 5
    },

    {
      name: 'animation',
      label: intl.formatMessage({ id: 'show animation', defaultMessage: '开启动画' }),
      type: 'checkbox',
      value: false,
    },

    { 
      name: 'series_lineMode',
      type: 'radioGroup',
      props: {
        type: 'lineMode'
      },
      value: 'curve'
      /**
         * straight: 直线
         * curve: 曲线
         * ladder: 阶梯线
         */
    }]
}]
