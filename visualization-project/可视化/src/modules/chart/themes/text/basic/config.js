import intl from 'src/intl'
/*
 * 表单配置
 */
export default [{
  title: intl.formatMessage({ id: 'text', defaultMessage: '文本' }),
  fields: [
    {
      name: 'text',
      label: intl.formatMessage({ id: 'text', defaultMessage: '文本' }),
      type: 'input',
      props: {
        type: 'textarea'
      },
      value: intl.formatMessage({ id: 'text content', defaultMessage: '文本内容' })
    },

    {
      name: 'textStyle_letterSpacing',
      label: intl.formatMessage({ id: 'spacing', defaultMessage: '文本间距' }),
      type: 'number',
      value: 1
    },

    {
      name: 'textStyle_textAlign',
      label: intl.formatMessage({ id: 'horizontal', defaultMessage: '水平对齐' }),
      type: 'radioGroup',
      props: {
        type: 'textAlign'
      },
      value: 'center'
    },

    {
      name: 'textStyle_verticalAlign',
      label: intl.formatMessage({ id: 'vertical', defaultMessage: '垂直对齐' }),
      type: 'radioGroup',
      props: {
        type: 'verticalAlign'
      },
      value: 'middle'
    },

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
          name: 'textStyle_fontBold',
          type: 'bold',
          value: false
        },

        {
          name: 'textStyle_color',
          type: 'color',
          value: '#fff'
        }
      ]
    }

  ]
}]
