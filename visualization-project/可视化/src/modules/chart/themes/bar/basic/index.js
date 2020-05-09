import option from './option'
import config from './config'
import data from './data'
import intl from 'src/intl'

export { option, config, data }

export default {
  //title: '柱状图',
  title: intl.formatMessage({ id: 'basic column', defaultMessage: '柱状图' }),
  option,
  imgClassName: 'bar-basic'
}
