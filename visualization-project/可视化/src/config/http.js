import EventEmitter from 'eventemitter3';
import { configProcesser, configCallbacks } from 'modules/http';
import { redirectToSignIn } from 'utils/redirect-to-login';
import intl from 'src/intl';

const emitter = new EventEmitter();
const msg = intl.formatMessage({ id: 'system error', defaultMessage: '系统出错，请稍后重试' });
const StatusCodeMap = {
  500: {
    code: 500,
    msg
  }
};

/**
 * 处理服务器返回过来的数据
 */
configProcesser('processResponse', (res) => {
  return res;
});

/**
 * 请求开始
 */
configCallbacks('onRequestStart', () => {
  emitter.emit('req.start');
});

/**
 * 服务器返回数据
 */
configCallbacks('onResponse', (res) => {
  if (+res.errCode === 401) {
    redirectToSignIn();
  }
  emitter.emit('req.end');
});

/**
 * 服务器响应出错
 */
configCallbacks('onResponseError', (res) => {
  emitter.emit('res.error', StatusCodeMap[res.statusCode]);
  emitter.emit('req.end');
});

export const event = emitter;
