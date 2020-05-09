import option from './option'
import config from './config'
import data from './data'
import intl from 'src/intl'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'counter', defaultMessage: '滚动计数器' }),
  imgClassName: 'counter-basic',
  option
}
