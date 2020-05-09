import intl from 'src/intl'
import data from './data'
import config from './config'
import option from './option'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'time', defaultMessage: '时间' }),
  imgClassName: 'time-basic',
  option
}
