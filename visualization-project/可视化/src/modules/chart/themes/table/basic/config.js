import intl from 'src/intl'

export default [
  {
    title: intl.formatMessage({ id: 'header', defaultMessage: '表头' }),
    fields: [
      {
        name: 'thead_show',
        type: 'checkbox',
        label: intl.formatMessage({ id: 'header', defaultMessage: '表头' }),
        value: true,
        action: 'toggle'
      },

      {
        type: 'compose',
        label: intl.formatMessage({ id: 'font', defaultMessage: '字体' }),
        fields: [
          {
            name: 'thead_font_size',
            type: 'fontSizeSelect',
            value: 12
          },
          {
            name: 'thead_font_color',
            type: 'color',
            value: '#6AC5FE'
          }
        ],
        rel: 'toggle:thead_show'
      },

      {
        label: intl.formatMessage({ id: 'alignment', defaultMessage: '对齐方式' }),
        name: 'thead_textAlign',
        type: 'radioGroup',
        props: {
          type: 'textAlign'
        },
        value: 'left',
        rel: 'toggle:thead_show'
      },

      {
        label: intl.formatMessage({ id: 'background color', defaultMessage: '背景色' }),
        name: 'thead_backgroundColor',
        type: 'color',
        value: '#14304F',
        rel: 'toggle:thead_show'
      }
    ]
  },

  {
    title: intl.formatMessage({ id: 'table', defaultMessage: '表格' }),
    fields: [
      {
        type: 'compose',
        label: intl.formatMessage({ id: 'font', defaultMessage: '字体' }),
        fields: [
          {
            name: 'tbody_font_size',
            type: 'fontSizeSelect',
            value: 12
          },
          {
            name: 'tbody_font_color',
            type: 'color',
            value: '#fff'
          }
        ]
      },

      {
        label: intl.formatMessage({ id: 'alignment', defaultMessage: '对齐方式' }),
        name: 'tbody_textAlign',
        type: 'radioGroup',
        props: {
          type: 'textAlign'
        },
        value: 'left'
      },

      {
        label: intl.formatMessage({ id: 'odd line', defaultMessage: '奇数行' }),
        className: 'color-trigger-no-margin',
        name: 'tbody_oddBackgroundColor',
        type: 'color',
        value: '#1C4E7B'
      },

      {
        label: intl.formatMessage({ id: 'even line', defaultMessage: '偶数行' }),
        className: 'color-trigger-no-margin',
        name: 'tbody_evenBackgroundColor',
        type: 'color',
        value: '#235A87'
      }
    ]
  },

  {
    title: intl.formatMessage({ id: 'border', defaultMessage: '边框' }),
    fields: [
      {
        name: 'border_outer',
        label: intl.formatMessage({ id: 'outter border', defaultMessage: '外边框' }),
        type: 'borderSelect',
      },

      {
        name: 'border_inner',
        label: intl.formatMessage({ id: 'inner border', defaultMessage: '内边框' }),
        type: 'borderSelect',
      }
    ]
  }
]
