import intl from 'src/intl'
//import image from './basic.png'
import option from './option'
import config from './config'
import data from './data'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'circle', defaultMessage: '圆形' }),
  imgClassName: 'circle-basic',
  option
}
