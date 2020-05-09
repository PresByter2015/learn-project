import Model from 'modules/model';
import urls from 'config/urls';

class Options extends Model {
  constructor() {
    super(urls.get('options'));
  }

  optionsRefresh() {
    let url = `${this.url}/refreshTime`;

    return super.get(url);
  }

  optionsDataType() {
    let url = `${this.url}/dataType`;

    return super.get(url);
  }

  optionsDataSource() {
    let url = `${this.url}/datasource`;

    return super.get(url);
  }

  optionsRecent() {
    let url = `${this.url}/recentTime`;

    return super.get(url);
  }
}

export default new Options;
