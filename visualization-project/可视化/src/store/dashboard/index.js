import createReducer from 'utils/create-reducer'
import * as types from './types'
import { arrayToObject } from 'utils'

const initialState = {
  // title: '',
  bg: '',
  show: false,
  list: false,
  add: false,

  template: false,
  templateList: [],
  templateId: {},
  nowId: null,

  previewAdd: false,
  layoutType: 'carousel'
}

const actionHandlers = {
  [types.HUISHE_DASHBOARD_TYPE_DATA_FETCH]: (state, action) => {

    return { ...action.payload, list: arrayToObject(action.payload.list) }
  },
  [types.HUISHE_DASHBOARD_TYPE_SHOW_SET_MODAL]: (state, action) => {
    return { show: action.payload }
  },
  [types.HUISHE_DASHBOARD_TYPE_SHOW_ADD_MODAL]: (state, action) => {
    return { add: action.payload }
  },


  [types.HUISHE_DASHBOARD_TYPE_TEMPLATE_FETCH]: (state, action) => {
    const listData = arrayToObject(action.payload)
    return { templateList: listData }
  },
  [types.HUISHE_DASHBOARD_TYPE_TEMPLATE_FETCH_TITLE]: (state, action) => {
    let data = { ...state.templateList }
    for (let key in data) {
      if (key === action.payload.id) {
        data[key].title = action.payload.title
      }
    }
    return { templateList: data }
  },
  [types.HUISHE_DASHBOARD_TYPE_TEMPLATE_SAVE_WINDOW]: (state, action) => {
    return { templateId: action.payload }
  },
  [types.HUISHE_DASHBOARD_TYPE_TEMPLATE_NOWID]: (state, action) => {
    return { nowId: action.payload }
  },
  [types.HUISHE_DASHBOARD_TYPE_SHOW_TEMPLATE_MODAL]: (state, action) => {
    return { template: action.payload }
  },


  [types.HUISHE_DASHBOARD_TYPE_PREVIEW_ADD_MODAL]: (state, action) => {
    return { previewAdd: action.payload }
  },
  [types.HUISHE_DASHBOARD_TYPE_ADD_WINDOW]: (state, action) => {
    // let list = Object.assign({}, state.list)  //将新创建的元素合并到原有的list
    // list[action.payload.id] = action.payload  //独有的id保证不会重复
    let listNew = {
      [action.payload.id]: action.payload
    }
    let list = Object.assign(listNew, state.list)
    return { list }
  },
  [types.HUISHE_DASHBOARD_TYPE_UPTADE_MODAL]: (state, action) => {
    let list = Object.assign({}, state.list)
    if (action.id) {
      let id = action.id
      let data = action.data
      list[id] = Object.assign(list[id], data)
    }
    return { list }
  },
  [types.HUISHE_DASHBOARD_TYPE_DESTROY_MODAL]: (state, action) => {
    let list = Object.assign({}, state.list)
    let templateList = Object.assign({}, state.templateList)
    if (action.id) {
      let id = action.id
      delete list[id]
      delete templateList[id]
    }
    return { list, templateList }
  },
  [types.HUISHE_DASHBOARD_TYPE_UPDATE_WALL]: (state, action) => {
    return {
      ...action.payload, ...action.payload.bgSetting, ...action.payload.wallSetting,
      ...action.payload.windowSetting
    }
  },
  [types.HUISHE_DASHBOARD_TYPE_SWITCH_LAYOUT]: (state, action) => {
    let { layoutType } = action.payload

    return { layoutType }
  }
}

export default createReducer(initialState, actionHandlers)
