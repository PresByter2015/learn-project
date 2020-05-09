import intl from 'src/intl'

/**
 * 默认数据
 */
export default {
  series: [
    {
      value: 30,
      name: intl.formatMessage({ id: 'warning', defaultMessage: '警告' })
    },{
      value: 50,
      name: intl.formatMessage({ id: 'remind', defaultMessage: '提醒' })
    }, {
      value: 60,
      name: intl.formatMessage({ id: 'main', defaultMessage: '主要' })
    },{
      value: 100,
      name: intl.formatMessage({ id: 'critical', defaultMessage: '严重' })
    }
  ]
}
