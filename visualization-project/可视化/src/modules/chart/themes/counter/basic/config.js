import intl from 'src/intl'

export default [
  {
    title: intl.formatMessage({ id: 'counter', defaultMessage: '滚动计数器' }),
    fields: [
      {
        label: intl.formatMessage({ id: 'font style', defaultMessage: '字体样式' }),
        name: 'displayType', // 展示类型
        type: 'radioGroup',
        value: 'normal',
        props: {
          options: [
            {
              name: intl.formatMessage({ id: 'normal', defaultMessage: '正常' }),
              value: 'normal'
            },
            {
              name: intl.formatMessage({ id: 'led', defaultMessage: 'LED' }),
              value: 'led'
            }
          ]
        }
      },

      {
        label: intl.formatMessage({ id: 'font', defaultMessage: '字体' }),
        type: 'compose',
        className: 'font-combination',
        fields: [
          {
            name: 'textStyle_font_size',
            type: 'fontSizeSelect',
            value: 12
          },
          {
            name: 'textStyle_font_bold',
            type: 'bold',
            value: false
          },
          {
            name: 'textStyle_font_color',
            type: 'color',
            value: '#fff'
          }
        ]
      },

      {
        label: intl.formatMessage({ id: 'number space', defaultMessage: '数字间距' }),
        name: 'textStyle_letterSpacing',
        type: 'number',
        value: 2,
        min: 0
      },

      {
        type: 'radioGroup',
        label: intl.formatMessage({ id: 'horizontal', defaultMessage: '水平对齐' }),
        name: 'textStyle_textAlign',
        value: 'center',
        props: {
          type: 'textAlign'
        }
      },

      {
        type: 'radioGroup',
        label: intl.formatMessage({ id: 'vertical', defaultMessage: '垂直对齐' }),
        name: 'textStyle_verticalAlign',
        value: 'middle',
        props: {
          type: 'verticalAlign'
        }
      },

      {
        label: intl.formatMessage({ id: 'background color', defaultMessage: '数字背景色' }),
        name: 'textStyle_backgroundColor',
        type: 'color',
        value: '#45ACDB'
      },

      {
        label: intl.formatMessage({ id: 'rounded', defaultMessage: '四舍五入' }),
        name: 'formatter_round',
        type: 'checkbox',
        value: false
      },

      {
        label: intl.formatMessage({ id: 'number digits', defaultMessage: '小数点位数' }),
        name: 'formatter_decimals',
        type: 'number',
        value: 0,
        min: 0,
        max: 20
      },

      {
        label: intl.formatMessage({ id: 'default digits', defaultMessage: '默认位数' }),
        name: 'formatter_digits',
        type: 'number',
        value: 0,
        min: 0
      },

      {
        label: intl.formatMessage({ id: 'thousand separate', defaultMessage: '千位数字间隔' }),
        name: 'formatter_thousand',
        type: 'checkbox',
        value: false
      },


    ]
  }
]
