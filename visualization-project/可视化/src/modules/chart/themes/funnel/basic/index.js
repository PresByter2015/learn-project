import option from './option'
import config from './config'
import data from './data'
import intl from 'src/intl'

export { option, config, data }

export default {
  //title: '漏斗图',
  title: intl.formatMessage({ id: 'funnel', defaultMessage: '漏斗图' }),
  imgClassName: 'funnel-basic',
  option
}
