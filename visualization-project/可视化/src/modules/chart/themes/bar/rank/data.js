import intl from 'src/intl'
/**
 * 默认数据
 */
export default {
  yAxis: [
    intl.formatMessage({ id: 'jiangsu', defaultMessage: '江苏' }),
    intl.formatMessage({ id: 'zhejiang', defaultMessage: '浙江' }),
    intl.formatMessage({ id: 'shanghai', defaultMessage: '上海' }),
    intl.formatMessage({ id: 'beijing', defaultMessage: '北京' }),
    intl.formatMessage({ id: 'guangdong', defaultMessage: '广东' })],
  series: [
    {
      //name: '地区',
      name: intl.formatMessage({ id: 'area', defaultMessage: '地区' }),
      data: [410, 360, 329, 303, 267]
    }
  ]
}
