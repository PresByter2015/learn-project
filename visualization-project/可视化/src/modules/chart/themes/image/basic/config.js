import intl from 'src/intl'
const defaultImage = require('./default.jpg')

export default [
  {
    title: intl.formatMessage({ id: 'image', defaultMessage: '图片' }),
    fields: [
      {
        label: intl.formatMessage({ id: 'image', defaultMessage: '图片' }),
        name: 'background',
        type: 'upload',
        value: defaultImage
      },
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
