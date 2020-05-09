import createReducer from 'utils/create-reducer'
import * as types from './types'

const initState = {
  loadingVisible: false,
  colorPicker: {
    visible: false,
    top: 0,
    left: 0
  },
  isPreview: false,
  isFullScreen: false
}

const actionHandlers = {
  [types.HUISHE_GLOBAL_TYPE_LOADING_VISIBLE]: (state, action) => {
    return { loadingVisible: action.payload }
  },

  [types.HUISHE_GLOBAL_TYPE_SWITCH]: (state, action) => {
    let { type, bool } = action.payload
    return { [type]: bool }
  },

  [types.HUISHE_GLOBAL_TYPE_COLOR_PICKER_MODAL_VISIBLE]: (state, action) => {
    let { colorPicker } = state
    let data = { ...colorPicker, ...action.payload }
    return { colorPicker: data }
  },

  [types.HUISHE_GLOBAL_TYPE_COLOR_PICKER_UPDATE]: (state, action) => {
    let { colorPicker } = state
    let data = { ...colorPicker, ...action.payload }
    return { colorPicker: data }
  }

}

export default createReducer(initState, actionHandlers)
