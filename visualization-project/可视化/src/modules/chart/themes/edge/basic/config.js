import intl from 'src/intl'

export default [{
  title: intl.formatMessage({ id: 'edge', defaultMessage: '连线' }),
  fields: [
    {
      name: 'line_color',
      label: intl.formatMessage({ id: 'color', defaultMessage: '颜色' }),
      type: 'color',
      value: '#1368c8'
    },

    {
      name: 'line_style',
      label: intl.formatMessage({ id: 'edge style', defaultMessage: '线样式' }),
      type: 'lineStyleSelect',
      value: 'solid'
    },

    {
      name: 'line_width',
      label: intl.formatMessage({ id: 'edge width', defaultMessage: '线粗细' }),
      type: 'lineWidthSelect',
      value: 2
    },

    {
      name: 'line_effect',
      label: intl.formatMessage({ id: 'edge effect', defaultMessage: '流量效果' }),
      type: 'checkbox',
      value: false
    }

  ]
}]
