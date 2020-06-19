/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: fetch 请求函数 fetch 封装 
* @author: PresByter
* @date  : 2020/06/19 16:12:56
* @file  : reqest-fetch.js
*/
import {getCookies} from './cookies';

const controller = new AbortController ();
const {signal} = controller;

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
async function request({
  url = '',
  data = {},
  method = 'GET',
  headers = {},
  mode = 'json', // json, formdata, none.
}) {
  // Default options are marked with *
  const methods = method.toUpperCase ();
  const isBase = url.search (/(http:|https:)/);
  const reqUrl = isBase === -1 ? `${BASE_URL}${url}` : url;

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
      web_token: token, //设置token
      // 'content-type': 'application/json',
      ...header,
    },
    method: methods, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    signal, // 取消 请求
    ...body,
  };
  //   中止 请求
  controller.abort()
  
  const response = await fetch (reqUrl, payload);
  // checkStatus(response)
  const results = await response.json ();
  

  // 1:成功，0：失败，9：token失效
  if (Number (results.status) === 9) {
    // message.error (results.msg);

    console.error ("token 失效 myHistory.push ('/login');");

    setTimeout (() => {
      window.location.reload ();
    }, 1000);
    return {msg: '登录失效！！', data: {}, status: 500};
  }

  if (Number (results.status) !== 1) {
    // 请求失败
    // message.warning (results.msg);

    return {status: results.status || results.resultCode, ...results};
  }
  if (Number (results.status) === 1) {
    // 请求成功
    // message.warning (results.msg);
    return {status: results.status, ...results};
  }
}
export default request;
