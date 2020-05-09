import * as types from './types'
import DataSourceModel from 'models/data-source'

export function emptyDataSource() {
  return {
    type: types.HUISHE_DATA_SOURCE_TYPE__NULL,
  }
}

/*
 * 数据源+数据集连接状态
 */
export function checkConnect() {
  return dispatch => {
    return DataSourceModel.checkConnect()
      .then(res => {
        const { data } = res
        dispatch({
          type: 'DATA_STATE',
          payload: data
        })
        return data
      })
  }
}


/*
 * 获取数据源+数据集
 */
export function getDataSources() {
  return dispatch => {
    return DataSourceModel.getDataSources()
      .then(res => {
        const { data } = res
        dispatch({
          type: types.HUISHE_DATA_SOURCE_TYPE_GET,
          payload: data
        })
        return data
      })
  }
}

/*
 * 获取单个数据源填充表单
 */
export function getDataSource(id) {
  return dispatch => {
    return DataSourceModel.getDataSource(id)
      .then(res => {
        const { data } = res

        dispatch({
          type: types.HUISHE_DATA_SOURCE_TYPE__GET,
          payload: data
        })
        return data
      })
  }
}

/*
 * 测试连接-数据源
 */
export function dataSourceTest(dataSource) {
  return dispatch => {
    return DataSourceModel.dataSourceTest(dataSource)
      .then(res => {
        const { data } = res
        dispatch({
          type: types.HUISHE_DATA_SOURCE_TYPE__TEST,
          payload: data
        })
        return res
      })
  }
}


/*
 * 获取数据源
 */
export function fetchDataSources() {
  return dispatch => {
    return DataSourceModel.fetchDataSources()
      .then(res => {
        const { data } = res

        dispatch({
          type: types.FETCH_HUISHE_DATA_SOURCE_TYPE_S,
          payload: data
        })
        return data
      })
  }
}

/*
 * 添加数据源
 */
export function createDataSource(dataSource) {
  return dispatch => {
    return DataSourceModel.createDataSource(dataSource)
      .then(res => {
        const { data } = res
        dispatch({
          type: types.HUISHE_DATA_SOURCE_TYPE__CREATE,
          payload: data
        })
        return data
      })
  }
}

/*
* 修改数据源
 */
export function changeDataSource(sourceId, dataSource) {
  return dispatch => {
    return DataSourceModel.changeDataSource(sourceId, dataSource)
      .then(res => {
        const { data } = res
        dispatch({
          type: types.HUISHE_DATA_SOURCE_TYPE__CHANGE,
          payload: data
        })
        return data
      })
  }
}

/*
* 删除数据源
 */
export function deleteDataSource(id) {
  return dispatch => {
    return DataSourceModel.deleteDataSource(id)
      .then(res => {
        const { data } = res
        dispatch({
          type: types.HUISHE_DATA_SOURCE_TYPE__DELETE,
          payload: data
        })
        return data
      })
  }
}
