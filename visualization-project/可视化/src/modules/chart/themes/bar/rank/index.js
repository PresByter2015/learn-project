import option from './option'
import config from './config'
import data from './data'
import intl from 'src/intl'

export { option, config, data }

export default {
  //title: '条形图',
  title: intl.formatMessage({ id: 'basic bar', defaultMessage: '条形图' }),
  option,
  imgClassName: 'bar-rank'
}
