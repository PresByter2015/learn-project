import intl from 'src/intl'
/**
 * 默认数据
 */
export default {
  series: [
    {
      name: intl.formatMessage({ id: 'key', defaultMessage: 'Key' }),
      data: ['吞吐量','平均晌应','系统成功率','系统错误率','用户数量']
    },
    {
      name: intl.formatMessage({ id: 'value', defaultMessage: '值' }),
      data: ['1452234', '79ms', '100%', '0%', '232445']
    }
  ]
}
