import createReducer from 'utils/create-reducer';
import { PRODUCT_ID } from 'config';
import * as types from './types';

const initState = {
  // TODO - 默认false，当前开发为true
  canOperate: true
};

const actionHandlers = {
  [types.HUISHE_USER_TYPEDATA_FETCH]: (state, action) => {
    let product = {};

    if (action.payload) {
      product = action.payload.products.filter(product => {
        return +product.productNum === PRODUCT_ID;
      });
      if (Array.isArray(product)) {
        product = product[0];
      }
    }

    if (product.role === 1) {
      product.role = 'admin';
      product.canOperate = true;
    } else {
      product.role = 'general';
      product.canOperate = false;
    }

    return {
      ...product
    };
  }
};

export default createReducer(initState, actionHandlers);
