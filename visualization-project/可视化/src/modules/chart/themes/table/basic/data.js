import intl from 'src/intl'
/**
 * 默认数据
 */
export default {
  series: [
    {
      name: intl.formatMessage({ id: 'date', defaultMessage: '时间' }),
      data: ['2016-10-30', '2016-10-30', '2016-10-30', '2016-10-30', '2016-10-30']
    }, {
      name: intl.formatMessage({ id: 'source location', defaultMessage: '源位置' }),
      data: [
        intl.formatMessage({ id: 'beijing', defaultMessage: '北京' }), 
        intl.formatMessage({ id: 'beijing', defaultMessage: '北京' }), 
        intl.formatMessage({ id: 'guangzhou', defaultMessage: '广州' }), 
        intl.formatMessage({ id: 'guangzhou', defaultMessage: '广州' }), 
        intl.formatMessage({ id: 'shanghai', defaultMessage: '上海' })
      ]
    }, {
      name: intl.formatMessage({ id: 'attack IP', defaultMessage: '攻击IP' }),
      data: ['10.1.300.45', '10.1.300.67', '34.62.13.66', '34.78.12.124', '62.29.43.67']
    }, {
      name: intl.formatMessage({ id: 'target location', defaultMessage: '目标位置' }),
      data: [
        intl.formatMessage({ id: 'beijing', defaultMessage: '北京' }), 
        intl.formatMessage({ id: 'beijing', defaultMessage: '北京' }), 
        intl.formatMessage({ id: 'hangzhou', defaultMessage: '杭州' }), 
        intl.formatMessage({ id: 'shanghai', defaultMessage: '上海' }), 
        intl.formatMessage({ id: 'chengdu', defaultMessage: '成都' })
      ]
    }, {
      name: intl.formatMessage({ id: 'target IP', defaultMessage: '目标IP' }),
      data: ['10.4.8.98', '54.32.54.65', '64.28.53.12', '62.99.32.65', '56.19.52.68']
    }, {
      name: intl.formatMessage({ id: 'attack type', defaultMessage: '攻击类型' }),
      data: [
        'DDOS', 
        'DDOS', 
        intl.formatMessage({ id: 'violent crack', defaultMessage: '暴力破解' }), 
        intl.formatMessage({ id: 'trojan', defaultMessage: '木马' }), 
        'DDOS'
      ]
    }, {
      name: intl.formatMessage({ id: 'attack number', defaultMessage: '攻击次数' }),
      data: ['1323', '764', '764', '764', '267']
    }
  ]
}
