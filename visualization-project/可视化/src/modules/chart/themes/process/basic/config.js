import intl from 'src/intl'
//import utils from '../../utils'

export default [
  {
    title: intl.formatMessage({ id: 'ring', defaultMessage: '环形图' }),
    fields: [
      {
        name: 'process_center_0',
        label: intl.formatMessage({ id: 'horizontal', defaultMessage: '水平' }),
        type: 'number',
        value: 50,
        props: {
          max: 100,
          min: 0
        },
        suffix: '%'
      },

      {
        name: 'process_center_1',
        label: intl.formatMessage({ id: 'vertical', defaultMessage: '垂直' }),
        type: 'number',
        value: 50,
        props: {
          max: 100,
          min: 0
        },
        suffix: '%'
      },

      {
        name: 'process_radius_1',
        label: intl.formatMessage({ id: 'outer radius', defaultMessage: '外半径' }),
        type: 'number',
        value: 45,
        props: {
          max: 100,
          min: 0
        },
        suffix: '%'
      },

      {
        name: 'process_radius_0',
        label: intl.formatMessage({ id: 'inner radius', defaultMessage: '内半径' }),
        type: 'number',
        value: 40,
        props: {
          max: 100,
          min: 0
        },
        suffix: '%'
      }]
  },
  {
    title: intl.formatMessage({ id: 'value', defaultMessage: '值标签' }),
    fields: [
      {
        name: 'process_showPercent',
        label: intl.formatMessage({ id: 'value', defaultMessage: '值' }),
        type: 'checkbox',
        action: 'toggle',
        value: true
      },

      {
        type: 'compose',
        rel: 'toggle:process_showPercent',
        label: intl.formatMessage({ id: 'value', defaultMessage: '数值' }),
        fields: [
          {
            name: 'process_charFont',
            type: 'fontSizeSelect',
            value: 60
          },
          
          {
            name: 'process_charBold',
            type: 'Bold',
            value: false
          },
          {
            name: 'process_charColor',
            type: 'color',
            value: '#cae929'
          }
        ]
      },
      {
        rel: 'toggle:process_showPercent',
        label: '%',
        type: 'compose',
        fields: [
          {
            name: 'process_percentFont',
            type: 'select',
            props: {
              options: [
                {
                  label: intl.formatMessage({ id: 'show small', defaultMessage: '小' }),
                  value: 0.50
                },
                {
                  label: intl.formatMessage({ id: 'show middle', defaultMessage: '中' }),
                  value: 0.67
                },
                {
                  label: intl.formatMessage({ id: 'show big', defaultMessage: '大' }),
                  value: 1
                }
              ]
            },
            value: 0.50
          }
        ]
      }
    ]
  },

  {
    title: intl.formatMessage({ id: 'series', defaultMessage: '系列' }),
    fields: [
      /*{
        name: 'process_background',
        label: intl.formatMessage({ id: 'background fill', defaultMessage: '底图填充色' }),
        type: 'color',
        value: '#333a43'
      },*/

      {
        name: 'process_fill_color',
        label: intl.formatMessage({ id: 'fill color', defaultMessage: '填充' }),
        type: 'color',
        value: '#9edf03'
      }]
  }
]
