import * as types from './types'
import DashboardModel from 'models/dashboard'
import WindowModel from 'models/window'
import Wall from 'models/wall'

export function fetchDashboard() {
  return dispatch => {
    DashboardModel.find().then(data => {
      return dispatch({
        type: types.HUISHE_DASHBOARD_TYPE_DATA_FETCH,
        payload: data
      })
    })
  }
}

// 获取模版列表数据
export function fetchTemplate(params) {
  return dispatch => {
    WindowModel.findBy(params).then(res => {
      return dispatch({
        type: types.HUISHE_DASHBOARD_TYPE_TEMPLATE_FETCH,
        payload: res.data
      })
    })
  }
}

export function updateWindow(id, data) {
  return dispatch => {
    return WindowModel.update(id, data)
      .then(res => {
        dispatch({
          type: types.HUISHE_DASHBOARD_TYPE_TEMPLATE_FETCH_TITLE,
          payload: { id, ...data }
        })
        return res
      })
  }
}

// 获取模版id
export function getTemplateId(data) {
  return dispatch => {
    return WindowModel.getTemplateId(data).then(res => {
      dispatch({
        type: types.HUISHE_DASHBOARD_TYPE_TEMPLATE_SAVE_WINDOW,
        payload: res.data
      })
      return res
    })
  }
}

// 传递以此模版创建时的id
export function toogleGetNowWindowId(id) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_DASHBOARD_TYPE_TEMPLATE_NOWID,
      payload: id
    })
  }
}

export function getNowWindowId(id) {
  return toogleGetNowWindowId(id)
}

export function deleteNowWindowId() {
  return toogleGetNowWindowId()
}


function toggleShowTemplateModal(bool) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_DASHBOARD_TYPE_SHOW_TEMPLATE_MODAL,
      payload: bool
    })
  }
}

export function showTemplateModal() {
  return toggleShowTemplateModal(true)
}

export function hideTemplateModal() {
  return toggleShowTemplateModal(false)
}

function toggleShowSetModal(bool) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_DASHBOARD_TYPE_SHOW_SET_MODAL,
      payload: bool
    })
  }
}

export function showSetModal() {
  return toggleShowSetModal(true)
}

export function hideSetModal() {
  return toggleShowSetModal(false)
}


function toggleShowAddModal(bool) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_DASHBOARD_TYPE_SHOW_ADD_MODAL,
      payload: bool
    })
  }
}

export function showAddModal() {
  return toggleShowAddModal(true)
}

export function hideAddModal() {
  return toggleShowAddModal(false)
}

function togglePreviewAddModal(bool) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_DASHBOARD_TYPE_PREVIEW_ADD_MODAL,
      payload: bool
    })
  }
}

export function showPreviewAddModal() {
  return togglePreviewAddModal(true)
}

export function hidePreviewAddModal() {
  return togglePreviewAddModal(false)
}

export function addWindow(data, callback = () => {
}) {
  return dispatch => {
    WindowModel.create(data).then((res) => {
      let resData = res.data

      callback(resData.id)
      return dispatch({
        type: types.HUISHE_DASHBOARD_TYPE_ADD_WINDOW,
        payload: { ...data, ...resData }
      })
    })
  }
}

export function getTemplateToWindowId(id, data, callback = () => {
}) {
  return dispatch => {
    WindowModel.getTemplateToWindowId(id, data).then((res) => {
      let resData = res.data

      callback(resData.id)
      return dispatch({
        type: types.HUISHE_DASHBOARD_TYPE_ADD_WINDOW,
        payload: resData
      })
    })
  }
}

export function updateModal(id, data) {
  return dispatch => {
    return WindowModel.update(id, data).then(() => {
      return dispatch({
        type: types.HUISHE_DASHBOARD_TYPE_UPTADE_MODAL,
        id: id,
        data: data
      })
    })
  }
}

export function destroyModal(id) {
  return dispatch => {
    return WindowModel.destroy(id).then(() => {
      return dispatch({
        type: types.HUISHE_DASHBOARD_TYPE_DESTROY_MODAL,
        id: id
      })
    })
  }
}

export function updateWall(id, data) {
  return dispatch => {
    return Wall.update(id, data).then(() => {
      return dispatch({
        type: types.HUISHE_DASHBOARD_TYPE_UPDATE_WALL,
        payload: data
      })
    })
  }
}

export function toggleLayoutType(type) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_DASHBOARD_TYPE_SWITCH_LAYOUT,
      payload: {
        layoutType: type
      }
    })
  }
}
