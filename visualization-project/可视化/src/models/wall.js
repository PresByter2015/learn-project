import Model from 'modules/model';
import urls from 'config/urls';

class Wall extends Model {
  constructor() {
    super(urls.get('wall'));
  }
}

export default new Wall;
