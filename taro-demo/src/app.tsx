import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import { Provider } from 'mobx-react'
import { OPEN_ID } from '@/config/index';
import { getOpenid } from '@/api/auth';
import counterStore from './store/counter'
// import store from './store/index';

import './app.scss'

// 监控-豫园
import "./utils/monitors/cct-wxa";

const store = {
  counterStore
}

class App extends Component {
  componentDidMount() { 
    Taro.login().then(res => {
      res.code && getOpenid({ code: res.code }).then(resl => {
        const app = Taro.getApp();
        app.yuyuan('set', 'user', 'openid', resl.res);
        resl.code === 0 ? Taro.setStorageSync(OPEN_ID, resl.res) : Taro.setStorageSync(OPEN_ID, '');
      });
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
