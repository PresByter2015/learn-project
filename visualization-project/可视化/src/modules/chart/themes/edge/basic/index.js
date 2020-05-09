import option from './option'
import config from './config'
import intl from 'src/intl'

export { option, config }

export default {
  title: intl.formatMessage({ id: 'edge', defaultMessage: '连线' }),
  imgClassName: 'edge-basic',
  option
}
