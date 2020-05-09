import 'es6-shim';
import 'utils/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

// 加载所有文件 ，兼容 ie浏览器 国际化翻译问题
function runApp() {
  const appRoot = document.getElementById('app');
  const customStore = require('./store/customStore').default();
  const customRoutes = require('./routes/createRoutes').default;
  const newHistory = syncHistoryWithStore(hashHistory, customStore);
  const RouteContainer = require('./routecontainer').default;
  const Provider = require('./intl').RouteProvider;

  render(
    <Provider>
      <RouteContainer history={newHistory} store={customStore} routes={customRoutes}/>
    </Provider>,
    appRoot
  );
}

if (window.Intl) {
  runApp();
} else {
  require.ensure(['intl'], (require) => {
    window.Intl = require('intl');
    runApp();
  });
}
