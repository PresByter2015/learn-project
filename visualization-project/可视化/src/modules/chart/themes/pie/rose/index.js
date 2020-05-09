import intl from 'src/intl'
import option from './option'
import config from './config'
import data from './data'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'rose', defaultMessage: '玫瑰图' }),
  imgClassName: 'pie-rose',
  option
}
