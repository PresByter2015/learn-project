import WindowModel from './window';
import WallModel from './wall';

class DashboardModel {
  find() {
    return new Promise(resolve => {
      return Promise.all([
        WallModel.find(),
        WindowModel.find()
      ]).then(res => {
        let [setting, list] = res;

        setting = setting || {};
        list = list || {};

        let result = {};

        if (setting.data) {
          Object.assign(result, setting.data);
        }

        if (list.data) {
          result.list = list.data;
        }

        resolve(result);
      });
    });
  }
}

export default new DashboardModel;
