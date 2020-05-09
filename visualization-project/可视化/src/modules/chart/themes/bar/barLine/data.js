import intl from 'src/intl'
/**
 * 默认数据
 */
export default {
  xAxis: ['14:20', '14:40', '15:00', '15:20', '15:40', '15:53'],
  series: [
    {
      name: intl.formatMessage({ id: 'visits', defaultMessage: '访问量' }),
      data: [100, 50, 150, 250, 410, 300]
    },
    {
      name: intl.formatMessage({ id: 'response time', defaultMessage: '响应时间' }),
      data: [1, 0.8, 1.5, 2, 2.6, 2.3]
    }
  ]
}
