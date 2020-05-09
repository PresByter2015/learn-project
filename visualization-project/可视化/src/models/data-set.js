import Model from 'modules/model';
import urls from 'config/urls';

class DataSet extends Model {
  constructor() {
    super(urls.get('dataSet'));
  }

  // 获取数据集
  dataSetGet(id) {
    let url = `${this.url}/${id}`;

    return super.get(url);
  }

  // 新建-测试数据集
  dataSetTest(dataSet) {
    let url = `${this.url}/test`;

    return super.post(url, dataSet);
  }

  // 编辑-测试数据集
  dataSetTestEdit(dataSet, id) {
    let url = `${this.url}/test/${id}`;

    return super.put(url, dataSet);
  }

  // 新建-测试数据集后下一步获取字段
  dataSetGetField(dataSet) {
    let url = `${this.url}/field`;

    return super.post(url, dataSet);
  }

  // 编辑-测试数据集后下一步获取字段
  dataSetGetFieldEdit(dataSet, id) {
    let url = `${this.url}/field/${id}`;

    return super.put(url, dataSet);
  }

  // 新建-获取字段后下一步获取table数据
  dataSetGetTable(datas) {
    let url = `${this.url}/data`;

    return super.post(url, datas);
  }

  // 编辑-获取字段后下一步获取table数据
  dataSetGetTableEdit(datas, id) {
    let url = `${this.url}/data/${id}?page=All`;

    return super.put(url, datas);
  }

  // 新建-保存
  dataSetSave(data) {
    let url = `${this.url}/save`;

    return super.post(url, data);
  }

  // 编辑-保存
  dataSetSaveEdit(data, id) {
    let url = `${this.url}/update/${id}`;

    return super.put(url, data);
  }

  // 删除数据集
  deleteDataSet(id) {
    let url = `${this.url}/${id}`;

    return super.del(url);
  }

  // 查看数据集
  findBy(condition, id) {
    let url = `${this.url}/data/${id}`;

    return super.findBy(condition, url);
  }

  findByKey(id) {
    let url = `${this.url}/options/xAxis/${id}`;

    return super.get(url);
  }

  // 根据数据源id获取数据集
  findByDataSource(id) {
    let url = `${this.url}/options/names/${id}`;

    return super.get(url);
  }

  // 保存openApi
  saveOpenApi(data, id) {
    let url = `${this.url}/updateField/${id}`;

    return super.put(url, data);
  }

}

export default new DataSet;
