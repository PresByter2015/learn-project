import intl from 'src/intl'
/**
 * 默认数据
 */
export default {
  xAxis: ['14:20', '14:40', '15:00', '15:20', '15:40', '15:53'],
  series: [
    {
      name: intl.formatMessage({
        id: 'server a',
        defaultMessage: '服务器A'
      }),
      data: [30, 40, 15, 5, 15, 25]
    },
    {
      name: intl.formatMessage({
        id: 'server b',
        defaultMessage: '服务器B'
      }),
      data: [40, 45, 60, 30, 20, 10]
    }
  ]
}
