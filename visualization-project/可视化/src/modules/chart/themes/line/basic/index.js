import intl from 'src/intl'
import option from './option'
import config from './config'
import data from './data'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'line', defaultMessage: '折线图' }),
  imgClassName: 'line-basic',
  option
}
