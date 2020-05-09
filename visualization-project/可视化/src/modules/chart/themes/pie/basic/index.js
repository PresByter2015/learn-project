import intl from 'src/intl'
import option from './option'
import config from './config'
import data from './data'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'pie', defaultMessage: '饼图' }),
  imgClassName: 'pie-basic',
  option
}
