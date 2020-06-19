import axios from 'axios';

// 从localStorage中获取token
function getLocalToken () {
  const token = window.localStorage.getItem ('dj-token');
  return token;
}

// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在localStorage中
// instance.setToken = token => {
//   instance.defaults.headers['X-Token'] = token;
//   window.localStorage.setItem ('dj-token', token);
// };

function refreshToken () {
  // instance是当前request.js中已创建的axios实例
  return instance.post ('/refreshtoken').then (res => res.data);
}

// 创建一个axios实例
const instance = axios.create ({
  //   baseURL: 'http://192.168.2.253:3000/',
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
    'X-Token': getLocalToken (), // headers塞token
  },
});

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];

// 添加请求拦截器
instance.interceptors.request.use (
  config => {
    // 在发送请求之前做些什么
    // cancel the request
    let cancel = null;
    // 设置cancelToken对象
    config.cancelToken = new axios.CancelToken (c => {
      cancel = c;
    });
    //  当使用登陆接口时，不执行 abort
    //  当没有token时，执行 abort
    !config.url.includes ('login') &&
      !getLocalToken () &&
      cancel (`${config.url} 请求被中断`);
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject (error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use (
  response => {
    const {status} = response.data;
    if (status === -101) {
      window.localStorage.removeItem ('dj-token');
      const config = response.config;
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken ()
          .then (res => {
            const {token} = res.data;
            instance.setToken (token);
            config.headers['X-Token'] = token;
            config.baseURL = '';
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach (cb => cb (token));
            requests = [];
            return instance (config);
          })
          .catch (res => {
            console.error ('refreshtoken error =>', res);
            // window.location.href = '/';
          })
          .finally (() => {
            isRefreshing = false;
          });
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise (resolve => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push (token => {
            config.baseURL = '';
            config.headers['X-Token'] = token;
            resolve (instance (config));
          });
        });
      }
    }
    return response;
  },
  error => {
    return Promise.reject (error);
  }
);

export default instance;
