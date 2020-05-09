import intl from 'src/intl'

export default [
  {
    title: intl.formatMessage({ id: 'dynamic image', defaultMessage: '动态图片' }),
    fields: [
      {
        type: 'compose',
        label: intl.formatMessage({ id: 'border', defaultMessage: '边框' }),
        fields: [
          {
            name: 'borderStyle_width',
            type: 'number',
            props: {
              min: 0,
              max: 20
            },
            value: 0
          }, {
            name: 'borderStyle_color',
            type: 'color',
            value: '#fff'
          }]
      }]
  }
]
