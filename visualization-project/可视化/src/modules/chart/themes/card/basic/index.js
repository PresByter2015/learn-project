import option from './option'
import config from './config'
import data from './data'
import intl from 'src/intl'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'card', defaultMessage: '键值表' }),
  imgClassName: 'card-basic',
  option
}
