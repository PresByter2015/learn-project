import { getChartDefaultOption } from '../../config'
// import style from '../../style.js'
import intl from 'src/intl'

export default Object.assign({}, getChartDefaultOption(), {
  title: {
    text: intl.formatMessage({ id: 'text content', defaultMessage: '文本内容' }),
    textStyle: {
      textAlign: 'center',
      gap: 1,
      display: 'table-cell',
      verticalAlign: 'middle',
      fontSize: 14,
      color: '#fff',
      opacity: 100
    }
  }
})
