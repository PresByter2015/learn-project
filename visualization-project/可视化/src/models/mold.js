import Model from 'modules/model';
import urls from 'config/urls';

class Mold extends Model {
  constructor() {
    super(urls.get('molds'));
  }

  getType() {
    return super.get(urls.get('moldType'));
  }

  getConfigItem(code) {
    return super.get(urls.get('moldConfig') + code);
  }

  getSelectItem(id) {
    return super.get(urls.get('moldSelectItem') + id);
  }

  getIndexData(id) {
    return super.get(urls.get('moldGetIndex') + id);
  }

  getStatusData(id) {
    return super.get(urls.get('moldGetStatus') + id);
  }
}

export default new Mold;
