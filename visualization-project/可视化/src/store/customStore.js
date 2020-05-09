import * as allReducer from './customreducers';
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { hashHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const reducerArr = combineReducers({
  ...allReducer,
  routing: routerReducer
});

export default function customStore() {
  let ware = [thunkMiddleware, routerMiddleware(hashHistory)];
  const customstore = createStore(
    reducerArr,
    compose(
      applyMiddleware(...ware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  if (process.env.NODE_ENV !== 'production') {
    module && module.hot && module.hot.accept('./customreducers', () => {
      const customReducer = require('./customreducers').default;
      customstore.replaceReducer(customReducer);
    });
  }
  return customstore;
}
