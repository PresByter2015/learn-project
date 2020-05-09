import intl from 'src/intl'
import config from './config'
import option from './option'
import data from './data'

export { config, option, data }

export default {
  title: intl.formatMessage({ id: 'gauge', defaultMessage: '仪表盘' }),
  imgClassName: 'gauge-basic',
  option
}
