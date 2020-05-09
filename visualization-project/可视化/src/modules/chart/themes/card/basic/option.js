import intl from 'src/intl'
import { getChartDefaultOption } from '../../config'

export default Object.assign({}, getChartDefaultOption(), {
  border: {
    outer: {
      width: 0,
      style: 'solid',
      color: '#fff'
    },
    inner: {
      width: 0,
      style: 'solid',
      color: '#fff'
    }
  },
  card: {
    keyAlign: 'left',
    valueAlign: 'right',
    font: {
      size: 12,
      color: '#6AC5FE'
    },
    oddBackgroundColor: '#1C4E7B',
    evenBackgroundColor: '#235A87'
  },
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
})
