import intl from 'src/intl'
/**
 * 默认数据
 */
export default {
  xAxis: [
    intl.formatMessage({ id: 'event', defaultMessage: '事件' }),
    intl.formatMessage({ id: 'problem', defaultMessage: '问题' }),
    intl.formatMessage({ id: 'change', defaultMessage: '变更' }),
    intl.formatMessage({ id: 'inspection', defaultMessage: '巡检' }),
    intl.formatMessage({ id: 'second-line process', defaultMessage: '二线流程' })
  ],
  series: [
    {
      name: intl.formatMessage({ id: 'last month', defaultMessage: '上月' }),
      data: [40, 20, 10, 10, 20]
    },
    {
      name: intl.formatMessage({ id: 'this month', defaultMessage: '本月' }),
      data: [42, 30, 15, 10, 15]
    }
  ]
}
