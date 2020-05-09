import intl from 'src/intl'
import option from './option'
import config from './config'
import data from './data'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'mold', defaultMessage: '模具' }),
  imgClassName: 'image-basic',
  option
}
