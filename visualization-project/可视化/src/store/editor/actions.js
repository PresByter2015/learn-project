import * as types from './types.js';

export function changeActiveWidget(id, type) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_EDITOR_TYPE_ACTIVE_WIDGET_CHANGE,
      payload: {
        id: id || null,
        type
      }
    });
  };
}

export function setCoords(type, data) {
  return dispatch => {
    dispatch({
      type: types.HUISHE_EDITOR_TYPE_SET_COORDS,
      payload: {
        type,
        data
      }
    });
  };
}

export function showSettingModal() {
  return toggleSettingModal(true);
}

export function hideSettingModal() {
  return toggleSettingModal(false);
}

function toggleSettingModal(bool) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_EDITOR_TYPE_SETTING_MODAL_VISIBLE,
      payload: bool
    });
  };
}

export function ChangeNavPanel(obj) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_EDITOR_TYPE_NAV_PANEL_CHANGE,
      payload: obj
    });
  };
}

//更新工具栏中选中及拖拽按钮、连接线的状态切换
export function toggleToolSelect(type) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_EDITOR_TYPE_TOOL_SELECT_TOGGLE,
      payload: type
    });
  };
}

export function updateIframeModal(data) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_EDITOR_TYPE_IFRAME_MODAL_UPDATE,
      payload: data
    });
  };
}
