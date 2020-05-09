import intl from 'src/intl'
/**
 * 默认数据
 */
export default {
  series:[
    { 
      value: 100, 
      name: intl.formatMessage({ id: 'access', defaultMessage: '访问' })
    },
    { 
      value: 80, 
      name: intl.formatMessage({ id: 'registered', defaultMessage: '注册' }) 
    },
    { 
      value: 60, 
      name: intl.formatMessage({ id: 'use', defaultMessage: '使用' })
    },
    { 
      value: 40, 
      name: intl.formatMessage({ id: 'advisory', defaultMessage: '咨询' }) 
    },
    { 
      value: 20, 
      name: intl.formatMessage({ id: 'pay', defaultMessage: '付费' })
    }
  ]
}
