import intl from 'src/intl'

export default [
  {
    title: intl.formatMessage({ id: 'card', defaultMessage: '键值表' }),
    fields: [
      {
        label: intl.formatMessage({ id: 'align4key', defaultMessage: 'KEY对齐方式' }),
        name: 'card_keyAlign',
        type: 'radioGroup',
        props: {
          type: 'textAlign'
        },
        value: 'left'
      },
      {
        label: intl.formatMessage({ id: 'align4value', defaultMessage: '值对齐方式' }),
        name: 'card_valueAlign',
        type: 'radioGroup',
        props: {
          type: 'textAlign'
        },
        value: 'right'
      },
      {
        type: 'compose',
        label: intl.formatMessage({ id: 'font', defaultMessage: '字体' }),
        fields: [
          {
            name: 'card_font_size',
            type: 'fontSizeSelect',
            value: 12
          },
          {
            name: 'card_font_color',
            type: 'color',
            value: '#6AC5FE'
          }
        ]
      },
      {
        label: intl.formatMessage({ id: 'odd line', defaultMessage: '奇数行' }),
        className: 'color-trigger-no-margin',
        name: 'card_oddBackgroundColor',
        type: 'color',
        value: '#1C4E7B'
      },

      {
        label: intl.formatMessage({ id: 'even line', defaultMessage: '偶数行' }),
        className: 'color-trigger-no-margin',
        name: 'card_evenBackgroundColor',
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
