import * as types from './types'

export function toggleLoadingVisible(bool) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_GLOBAL_TYPE_LOADING_VISIBLE,
      payload: bool
    })
  }
}

/**
 * 切换开关，状态只有 true | false 两种状态
 */
export function toggleSwitch(type, bool) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_GLOBAL_TYPE_SWITCH,
      payload: {
        type, bool
      }
    })
  }
}

export function showColorPickerModal(position, which) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_GLOBAL_TYPE_COLOR_PICKER_MODAL_VISIBLE,
      payload: { ...position, visible: true, which }
    })
  }
}

export function hideColorPickerModal() {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_GLOBAL_TYPE_COLOR_PICKER_MODAL_VISIBLE,
      payload: { visible: false }
    })
  }
}

export function updateColorPicker(obj) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_GLOBAL_TYPE_COLOR_PICKER_UPDATE,
      payload: obj
    })
  }
}

export function togglePreview(bool) {
  return toggleSwitch('isPreview', bool)
}

export function toggleFullScreen(bool) {
  return toggleSwitch('isFullScreen', bool)
}
