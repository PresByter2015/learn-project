import intl from 'src/intl'


export default [
  {
    title: intl.formatMessage({ id: 'media', defaultMessage: '视频' }),
    fields: [
      {
        label: intl.formatMessage({ id: 'media', defaultMessage: '视频' }),
        name: 'background',
        type: 'upload',
        
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
          },
          {
            name: 'borderStyle_color',
            type: 'color',
            value: '#fff'
          }]
      }]
  }
]
