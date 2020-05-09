import intl from 'src/intl'

export default [
  {
    title: intl.formatMessage({ id: 'circle', defaultMessage: '圆形' }),
    fields: [
      {
        type: 'compose',
        label: intl.formatMessage({ id: 'border', defaultMessage: '边框' }),
        className: 'edge-combination',
        fields: [
          {
            name: 'circle_lineWidth',
            type: 'number',
            props: {
              min: 0
            },
            value: 1
          },

          {
            name: 'circle_stroke',
            type: 'color',
            value: '#fceec5'
          }
        ]
      },
      {
        name: 'circle_fill',
        label: intl.formatMessage({ id: 'fill color', defaultMessage: '填充颜色' }),
        type: 'color',
        value: '#fceec5'
      },

      {
        name: 'shadow_show',
        label: intl.formatMessage({ id: 'show shadows', defaultMessage: '显示阴影' }),
        type: 'checkbox',
        value: false
      }
    ]
  }
]
