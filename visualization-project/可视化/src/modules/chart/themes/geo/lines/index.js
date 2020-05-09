import intl from 'src/intl'
import option from './option'
import config from './config'
import data from './data'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'fly line map', defaultMessage: '飞线地图' }),
  imgClassName: 'geo-lines',
  option
}
