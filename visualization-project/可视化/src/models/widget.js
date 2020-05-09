import Model from 'modules/model';
import urls from 'config/urls';
import Widget from 'config/widget';

class WidgetModel extends Model {
  constructor() {
    super(urls.get('widget'));
  }

  parseData(data) {
    let { chart } = data;

    // 根据图表的 type、theme 获取组件的默认配置
    let defaultSetting = Widget.getDefaultSetting(chart.type, chart.theme);
    data.setting = { ...defaultSetting, ...data.setting };

    return data;
  }
}

export default new WidgetModel;
