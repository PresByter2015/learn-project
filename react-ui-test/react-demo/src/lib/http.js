/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: fetch 请求第二版 
* @author: PresByter
* @date  : 2020/06/22 10:23:08
* @file  : http.js
* 参考：https://zhuanlan.zhihu.com/p/124265066
*/
import {getCookies} from './cookies';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  // TODO:自定义消息弹窗
  // notification.error ({
  //   message: `请求错误 ${response.status}: ${response.url}`,
  //   description: errortext,
  // });
  const error = new Error (errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

let abortController = null;
abortController = new AbortController ();

const config = {
  baseUrl: {
    dev: '',
    pro: '',
  },
};
const baseUrl = config['baseUrl'];
const BASE_URL = process.env.NODE_ENV === 'development'
  ? baseUrl.dev
  : baseUrl.pro;

/**
   * @description fetch的二次封装
   * @param {String} url  请求地址  http://192.168.137.1:3000/  or /admin/controller/order/order_info
   * @param {Object} data  携带的参数可以使 formdata，也可以是json  
   * @param {Object} headers 请求头headers  
   * @param {String} method  请求方法，大小写均可 GET|POST|PUT|DELETE  ...  
   * @param {String} mode  json:普通数据类型 formdata:上传文件 none：使用get时不能有body
   * @returns {Object} 异步返回的结果  
   */
const http = ({
  url = '',
  data = {},
  method = 'GET',
  headers = {},
  mode = 'json', // json, formdata, none.
}) => {
  // Default options are marked with *
  const methods = method.toUpperCase ();
  const isBase = url.search (/(http:|https:)/);
  const reqUrl = isBase === -1 ? `${BASE_URL}${url}` : url;
  // ------- 中止 reset----------
  reqUrl.includes ('login') && (abortController = new AbortController ());
  // ------- 中止 ----------
  // TODO:获取token
  const token = getCookies ('sxc_demo') || '';
  // warning :fetch使用get的时候，不能有body
  const body = mode === 'none' || methods === 'GET'
    ? {}
    : {
        body: mode === 'json' ? JSON.stringify (data) : data,
      };
  // warning :fetch使用form-data的时候，headers必须为空
  const header = mode === 'formdata'
    ? {...headers}
    : {'Content-type': 'application/json', ...headers};
  const payload = {
    cache: 'no-cache',
    headers: {
      web_token: token, //TODO:设置token
      ...header,
    },
    method: methods, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    signal: abortController.signal, // 取消 请求
    ...body,
  };
  return new Promise ((resolve, reject) => {
    fetch (reqUrl, payload)
      .then (checkStatus)
      .then (res => res.json ())
      .then (data => {
        const {status} = data;
        if (status === -101) {
          // 退出登陆 禁止以后的所有 非 login 的请求
          // TODO:删除token
          window.localStorage.removeItem ('dj-token');
          abortController.abort ();
        }
        resolve (data);
      })
      .catch (err => reject (err));
    // debugger;
    // !reqUrl.includes ('login') && abortController.abort ();
  });
};

export default http;
