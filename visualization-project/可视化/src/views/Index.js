import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import { event as httpEvent } from 'config/http';

import { toggleLoadingVisible, togglePreview, toggleFullScreen } from 'store/global/actions';
import { fetchUserData } from 'store/user/actions';
import { IEFullscreen } from 'utils/IEFullscreen';
import Screen from 'utils/screen';
import Loading from 'components/loading';
import User from 'models/user';

import 'assets/stylus/index.styl';
import 'assets/stylus/theme-dark.styl';

/**
 * App Component
 */
class Index extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    dispatch: React.PropTypes.func,
    global: React.PropTypes.object,
    children: React.PropTypes.object
  };

  componentWillMount() {
    //监听浏览器全屏
    this._handleFullScreenChange = (bool) => {
      this.props.dispatch(toggleFullScreen(bool));
      if (!bool) {
        this.props.dispatch(togglePreview(false));
        this.props.dispatch(toggleFullScreen(false));
      }
    };
    Screen.on('fullscreenchange', this._handleFullScreenChange);

    //非IE
    if (typeof Screen.isFullScreen() !== 'undefined') {
      this.props.dispatch(toggleFullScreen(Screen.isFullScreen()));
    }

    //监听IE
    IEFullscreen(() => {
      this.props.dispatch(togglePreview(true));
      this.props.dispatch(toggleFullScreen(true));
    }, () => {
      this.props.dispatch(togglePreview(false));
      this.props.dispatch(toggleFullScreen(false));
    });

    // 请求开始
    httpEvent.on('req.start', () => {
      this.props.dispatch(toggleLoadingVisible(true));
    });

    // 请求结束
    httpEvent.on('req.end', () => {
      this.props.dispatch(toggleLoadingVisible(false));
    });

    // 响应出错
    httpEvent.on('res.error', (res) => {
      if (res && res.msg) {
        message.error(res.msg);
      }
    });

    this.props.dispatch(fetchUserData());
  }

  // 轮询门户cookie
  componentDidMount() {
    this.timer = setInterval(() => {
      User.fetchCookies();
      // console.log('XXXXXXXXXXXXX1');
    }, 15 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    httpEvent.removeAllListeners();
    Screen.removeListener('fullscreenchange', this._handleFullScreenChange);
  }

  render() {
    return (
      <div>
        {this.props.global.loadingVisible ? <Loading type="global"/> : null}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { user, global } = state;

  return {
    user,
    global
  };
};

export default connect(mapStateToProps)(Index);
