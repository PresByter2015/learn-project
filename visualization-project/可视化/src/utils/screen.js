import { uncapitalize } from 'utils';
import vendorPrefix from 'utils/vendor-prefix';
import EventEmitter from 'eventemitter3';
import { Modal } from 'antd';
import browser from 'utils/browser';
import intl from 'src/intl';

/*
 * firefox 全屏API为window.fullScreen, 退出全屏为document.mozCancelFullScreen
 * 其他浏览器 全屏API为document[isFullScreen],  退出全屏为document[exitFullscreen]
 * IE11 判断全屏依据为document.msFullscreenElement, IE11 全屏事件为MSFullscreenChange
 * */
const event = new EventEmitter;

let { lowercase: prefix } = vendorPrefix;

let isFullScreen = uncapitalize(`${prefix}IsFullScreen`);
let exitFullscreen = uncapitalize(`${prefix}ExitFullscreen`);
let requestFullScreen = uncapitalize(`${prefix}RequestFullscreen`);

//监听全屏事件处理
let fullScreenChangeEvent = browser.msie ? 'MSFullscreenChange' : `${prefix}fullscreenchange`;

event.requestFull = () => {
  let element = document.documentElement;
  let elementRequestFullScreen = element[requestFullScreen];
  if (elementRequestFullScreen && typeof elementRequestFullScreen !== 'undefined') {
    elementRequestFullScreen.call(element);
    event.emit('fullScreen');

    if (document.body.classList) {
      document.body.classList.add('fullscreen');
    }
  } else if (typeof window.ActiveXObject !== 'undefined') {
    //for IE
    Modal.info({
      title: intl.formatMessage({
        id: 'to detect the browser version is too low',
        defaultMessage: '检测浏览器版本过低，请手动点击F11进行预览'
      }),
      onOk() {
      }
    });
  }
};

event.isFull = () => {
  return window.fullScreen || document[isFullScreen];
};

event.isFullScreen = () => {
  return window.fullScreen || document[isFullScreen];
};

event.exitFull = () => {
  if (document.mozCancelFullScreen) {
    //firefox
    document.mozCancelFullScreen.call(document);
  } else if (document[exitFullscreen]) {
    document[exitFullscreen].call(document);
  } else if (typeof window.ActiveXObject !== 'undefined') {
    //for IE
    Modal.info({
      title: '检测浏览器版本过低，请手动点击F11退出预览',
      onOk() {
      }
    });
  }

  event.emit('exitFullScreen');
};

document.addEventListener(fullScreenChangeEvent, function () {
  let isfullscreen = window.fullScreen || document[isFullScreen] || !!document.msFullscreenElement;

  if (!isfullscreen) {
    if (document.body.classList) {
      document.body.classList.remove('fullscreen');
    }
    event.emit('exitFullScreen');
  }
  event.emit('fullscreenchange', isfullscreen);
});

export default event;
