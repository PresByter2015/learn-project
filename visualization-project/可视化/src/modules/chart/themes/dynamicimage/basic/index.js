import intl from 'src/intl'
import option from './option'
import config from './config'

export { option, config }

export default {
  title: intl.formatMessage({ id: 'dynamic image', defaultMessage: '动态图片' }),
  imgClassName: 'dynamic-basic',
  option
}
