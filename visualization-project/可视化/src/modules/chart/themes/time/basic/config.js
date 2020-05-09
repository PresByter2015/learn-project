import intl from 'src/intl'

export default [
  {
    title: intl.formatMessage({ id: 'time', defaultMessage: '时间' }),
    fields: [
      {
        type: 'compose',
        label: intl.formatMessage({ id: 'font', defaultMessage: '字体' }),
        className: 'font-combination',
        fields: [
          {
            name: 'textStyle_fontSize',
            type: 'fontSizeSelect',
            value: 14
          },

          {
            name: 'textStyle_fontWeight',
            type: 'bold',
            value: false
          },
          {
            name: 'textStyle_color',
            type: 'color',
            value: '#fff'
          }

        ]
      },

      {
        type: 'compose',
        label: intl.formatMessage({ id: 'border', defaultMessage: '边框' }),
        className: 'edge-combination',
        fields: [
          {
            name: 'borderStyle_width',
            type: 'number',
            props: {
              min: 0
            },
            value: 0
          },

          {
            name: 'borderStyle_color',
            type: 'color',
            value: '#fff'
          }
        ]
      },

      {
        name: 'formatter',
        label: intl.formatMessage({ id: 'format', defaultMessage: '格式' }),
        type: 'select',
        options: [{
          value: 'YYYY-MM-DD HH:mm:ss',
          label: 'YYYY-MM-dd hh:mm:ss',
        },{
          value: 'YYYY-MM-DD',
          label: 'YYYY-MM-dd'
        },
        {
          value: 'HH:mm:ss',
          label: 'hh:mm:ss'
        }, {
          value: 'week',
          label: intl.formatMessage({ id: 'week', defaultMessage: '星期' })
        }],
        value: 'YYYY-MM-DD HH:mm:ss'
      }
    ]
  }
]
