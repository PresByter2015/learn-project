import Model from 'modules/model';
import urls from 'config/urls';

class WindowModel extends Model {
  constructor() {
    super(urls.get('window'));
  }

  processUpdateData(data) {
    return { window: data };
  }

  // 保存窗口增删改部件
  saveWidgets(data) {
    let url = urls.get('widgets');

    return super.post(url, data);
  }

  getTemplateId(data) {
    let url = urls.get('window') + '/template';

    return super.post(url, data);
  }

  getTemplateToWindowId(id, data) {
    let url = urls.get('window') + '/baseOnTempl/' + id + '?title=' + data;

    return super.post(url, id);
  }
}

export default new WindowModel;
