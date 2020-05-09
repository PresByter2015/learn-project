import Model from 'modules/model';
import urls from 'config/urls';

class DataSource extends Model {
  constructor() {
    super(urls.get('dataSource'));
  }

  // 获取连接状态
  checkConnect() {
    let url = `${this.url}/checkConnect`;

    return super.get(url);
  }

  // 单个数据源填充表单
  getDataSource(id) {
    let url = `${this.url}/${id}`;

    return super.get(url);
  }

  // 获取数据源+数据集
  getDataSources() {
    let url = `${this.url}`;

    return super.get(url);
  }

  // 获取数据源
  fetchDataSources() {
    let url = `${this.url}/names`;

    return super.get(url);
  }

  // 添加数据源
  createDataSource(dataSource) {
    let url = `${this.url}`;

    return super.post(url, dataSource);
  }

  // 删除数据源
  deleteDataSource(id) {
    let url = `${this.url}/${id}`;

    return super.del(url);
  }

  // 修改数据源
  changeDataSource(id, dataSource) {
    let url = `${this.url}/${id}`;

    return super.put(url, dataSource);
  }

  // 测试数据源
  dataSourceTest(dataSource) {
    let url = `${this.url}/test`;

    return super.post(url, dataSource);
  }
}

export default new DataSource;
