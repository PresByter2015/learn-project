// api base url
const API_PREFIX = process.env.API_PREFIX || '';

export const baseUrl = API_PREFIX + '/api';

// login url
export const loginUrl = '/tenant/#/login';

// url 前缀
export const prefix = API_PREFIX;

// other urls
const urls = {
  // user: 'http://192.168.31.147:3100/tenant/api/v1/user/details/view',
  
  user: 'http://192.168.1.105:7700/tenant/api/v1/user/details/view',

  wall: `${baseUrl}/wall`,

  widget: `${baseUrl}/widget`,

  // save all widgets
  widgets: `${baseUrl}/widgets`,

  window: `${baseUrl}/window`,

  // upload url
  upload: `${baseUrl}/upload/pic`,

  // 数据源
  dataSource: `${baseUrl}/datasource`,

  // 数据集
  dataSet: `${baseUrl}/dataset`,

  // 下拉
  options: `${baseUrl}/options`,

  // chart
  chart: `${baseUrl}/chart`,

  // socket
  socket: `${baseUrl}/ws/dataset`,

  // 时间组件专用接口
  time: `${baseUrl}/widget/getTime`,

  // 模具
  molds: `${baseUrl}/molds`,

  // 获取模具所有类型
  moldType: `${baseUrl}/molds/classes`,

  // 获取指定模具类型的所有配置项
  moldConfig: `${baseUrl}/resources/query?classCode=`,

  // 查询模具指标&状态模型
  moldSelectItem: `${baseUrl}/models/query?object=`,

  // 查询模具指标数据
  moldGetIndex: `${baseUrl}/models/datapoints/query_last?object=`,

  // 查询模具状态模型数据
  moldGetStatus: `${baseUrl}/models/checkperiods/query?object=`
};

export default {
  /**
   * get url with name
   */
  get(scope, name) {
    if (name) {
      return urls[scope][name];
    }

    return urls[scope];
  }
};
