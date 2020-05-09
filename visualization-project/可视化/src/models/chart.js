import Model from 'modules/model';
import urls from 'config/urls';

class Chart extends Model {
  constructor() {
    super(urls.get('chart'));
  }
}

export default new Chart;
