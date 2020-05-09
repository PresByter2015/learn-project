import * as types from './types.js'
import OptionsModel from 'models/options'

export function fetchOptionsData() {
  return dispatch => {
    return OptionsModel.find().then(res => {
      const { data } = res

      dispatch({
        type: types.HUISHE_OPTIONS_TYPE_DATA_FETCH,
        payload: data
      })
      return data
    })
  }
}

export function updateOptions(id, data) {
  return dispatch => {
    return OptionsModel.update(id, data).then(() => {
      return dispatch({
        type: types.HUISHE_OPTIONS_TYPE_UPDATE,
        id: id,
        data: data
      })
    })
  }
}

// 刷新周期
export function optionsRefresh() {
  return dispatch => {
    return OptionsModel.optionsRefresh().then((res) => {
      const { data } = res
      dispatch({
        type: types.HUISHE_OPTIONS_TYPE_REFRESH,
        payload: data
      })
      return data
    })
  }
}

// 数据类型
export function optionsDataType() {
  return dispatch => {
    return OptionsModel.optionsDataType().then((res) => {
      const { data } = res
      dispatch({
        type: types.HUISHE_OPTIONS_TYPE_DATATYPE,
        payload: data
      })
      return data
    })
  }
}

// 最近时间
export function optionsRecent() {
  return dispatch => {
    return OptionsModel.optionsRecent().then((res) => {
      const { data } = res
      dispatch({
        type: types.HUISHE_OPTIONS_TYPE_RECENT,
        payload: data
      })
      return data
    })
  }
}

// 数据源类型
export function optionsDataSource() {
  return dispatch => {
    return OptionsModel.optionsDataSource().then((res) => {
      const { data } = res

      dispatch({
        type: types.HUISHE_OPTIONS_TYPE_DATASOURCE,
        payload: data
      })
      return data
    })
  }
}
