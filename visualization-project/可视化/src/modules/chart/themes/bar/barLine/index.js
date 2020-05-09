import option from './option';
import config from './config';
import data from './data';
import intl from 'src/intl';

export { option, config, data };

export default {
  title: intl.formatMessage({ id: 'bar & line chart', defaultMessage: '柱状折线图' }),
  option,
  imgClassName: 'bar-barline'
};
