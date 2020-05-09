import createReducer from 'utils/create-reducer';
import * as types from './types';

const initState = {
  activeWidgetId: null,
  activeWidgetType: null,
  settingModalVisible: false,
  header: {},
  panel: {},
  navPanel: {
    visible: false,
    top: 0,
    themes: [],
    chartType: ''
  },
  tool: {
    operate: 'select'
  },
  iframeModal: {
    visible: false,
    url: null
  }
};

const actionHandlers = {
  [types.HUISHE_EDITOR_TYPE_SETTING_MODAL_VISIBLE]: (state, action) => {
    return { settingModalVisible: action.payload };
  },

  [types.HUISHE_EDITOR_TYPE_IFRAME_MODAL_UPDATE]: (state, action) => {
    let { iframeModal } = state;
    let data = { ...iframeModal, ...action.payload };

    return { iframeModal: data };
  },

  [types.HUISHE_EDITOR_TYPE_ACTIVE_WIDGET_CHANGE]: (state, action) => {
    return { activeWidgetId: action.payload.id, activeWidgetType: action.payload.type };
  },

  [types.HUISHE_EDITOR_TYPE_SET_COORDS]: (state, action) => {
    let { type, data } = action.payload;
    let coords = Object.assign({}, state[type]);

    return { [type]: Object.assign(coords, data) };
  },

  [types.HUISHE_EDITOR_TYPE_NAV_PANEL_CHANGE]: (state, action) => {
    let { navPanel } = state;

    let data = { ...navPanel, ...action.payload };

    return { navPanel: data };
  },

  [types.HUISHE_EDITOR_TYPE_TOOL_SELECT_TOGGLE]: (state, action) => {
    return {
      tool: {
        operate: action.payload
      }
    };
  }
};

export default createReducer(initState, actionHandlers);
