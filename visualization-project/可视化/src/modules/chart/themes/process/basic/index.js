import intl from 'src/intl'
import option from './option'
import config from './config'
import data from './data'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'process', defaultMessage: '环状图' }),
  imgClassName: 'process-basic',
  option
}
