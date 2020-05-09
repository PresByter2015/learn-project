import intl from 'src/intl'
import option from './option'
import config from './config'
import data from './data'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'scatter map', defaultMessage: '散点热力图' }),
  imgClassName: 'geo-scatter',
  option
}
