import option from './option'
import config from './config'
import data from './data'
import intl from 'src/intl'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'text', defaultMessage: '文本' }),
  imgClassName: 'text-basic',
  option
}
