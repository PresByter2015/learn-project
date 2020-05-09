import style from '../../style'
import intl from 'src/intl'

/* eslint-disable */
export default [
   {
     title: intl.formatMessage({ id: 'radar', defaultMessage: '雷达图' }),
     fields: [
       {
         name: 'radar_center_0',
         label: intl.formatMessage({ id: 'horizontal', defaultMessage: '水平位置' }),
         type: 'number',
         suffix: '%',
         value: 50
      },
      {
         name: 'radar_center_1',
         label: intl.formatMessage({ id: 'vertical', defaultMessage: '垂直位置' }),
         type: 'number',
         suffix: '%',
         value: 50
      }
     ]
   }, {
     title: intl.formatMessage({ id: 'label', defaultMessage: '标签' }),
     fields: [
       {
        name: 'radar_name_show',
        label: intl.formatMessage({ id: 'show label', defaultMessage: '显示标签' }),
        type: 'checkbox',
        action: 'toggle',
        value: true
      },

      {
        type: 'compose',
        label: intl.formatMessage({ id: 'font', defaultMessage: '字体' }),
        rel: 'toggle:radar_name_show',
        className: 'font-combination',
        fields: [
          {
            name: 'radar_name_textStyle_fontSize',
            type: 'fontSizeSelect',
            value: style.fontSize
          },
          {
            name: 'radar_name_textStyle_fontWeight',
            type: 'bold',
            value: true
          },
          {
            name: 'radar_name_textStyle_color',
            type: 'color',
            value: style.labelColor
          }
      ]
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

  {
    title: intl.formatMessage({ id: 'series', defaultMessage: '系列' }),
    fields: [
      {
        type: 'computed',
        computed(props = {}) {

          let radioOptions = [
            { 
              name: intl.formatMessage({ id: 'solid line', defaultMessage: '实线' }), 
              value: 'solid' 
            },
            { 
              name: intl.formatMessage({ id: 'dashed line', defaultMessage: '虚线' }), 
              value: 'dashed' 
            }
          ]

          let result = []
          let count = [0, 1]
          let type = ['solid', 'dashed']
          if (props
            && props.series
            && Array.isArray(props.series)
            && props.series[0] !== 'undefined'
          ) {
            count = props.series.map((item, i) => {
              return i
            })
          }

          count.forEach( (item, index) => {
            result.push({
              label: intl.formatMessage({ id: 'category color', defaultMessage: '系列颜色' }),
              name: `series_color_${item}`,
              type: 'color',
              value: style.color[item]
            })

            result.push({
              label: intl.formatMessage({ id: 'connection', defaultMessage: '连线方式' }),
              name: `series_lineType_${item}`,
              type: 'radioGroup',
              value: `${type[index % (type.length)]}`,
              options: radioOptions
            })
          })

          return result
        }
      },
      {
        name: 'series_line_areaStyle_show',
        label: intl.formatMessage({ id: 'fill', defaultMessage: '是否填充' }),
        type: 'checkbox',
        value: true,
        action: 'toggle'
      },

      {
        rel: 'toggle:series_line_areaStyle_show',
        name: 'series_line_areaStyle_opacity',
        label: intl.formatMessage({ id: 'transparency', defaultMessage: '面积透明度' }),
        type: 'slider',
        value: 0.2
      }]
  }
]
