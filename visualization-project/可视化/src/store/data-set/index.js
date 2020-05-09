import createReducer from 'utils/create-reducer'
import * as types from './types'

const initState = {
  field: [],
  fieldEdit: [],
  timeChange: null,
  detail: [],
  detailChange: {},
  keysList: {},
  setInfo: {},
  userInput: {},
  openApiField: []
}

const actionHandlers = {
  // 清空数据集信息
  [types.HUISHE_DATA_SET_TYPE_NULL]: () => {
    return {
      setInfo: {}
    }
  },

  // 获取数据集信息
  [types.HUISHE_DATA_SET_TYPE_GET]: (state, action) => {
    let data = { ...action.payload }
    data.apiSupportTime = data.supportTime
    if (data.recentTime === '') {
      data.recentTime = '1h'
    }
    return {
      setInfo: data
    }
  },


  // 新建-测试连接后下一步获取字段
  [types.HUISHE_DATA_SET_TYPE_GET_FIELD]: (state, action) => {
    let data = []
    let nextKey = 0
    action && action.payload && action.payload.map(item => {
      data.push(
        { key: nextKey++,
          fieldName: item,
          displayName: '',
          isCheck: true,
          dataType: 'text'
        }
      )
    })
    return {
      field: data,
    }
  },

  // 编辑-测试连接后下一步获取字段
  [types.HUISHE_DATA_SET_TYPE_GET_FIELD_EDIT]: (state, action) => {
    let data = [...action.payload.field]
    let refreshTime = action.payload.refreshTime

    data && data.map(item => {
      if (item.dataType === '') {
        item.dataType = 'text'
        refreshTime = '0s'
      }
    })
    return {
      fieldEdit: data,
      timeChange: refreshTime
    }
  },

  // 新建-获取字段后下一步获取表格
  [types.HUISHE_DATA_SET_TYPE_GET_TABLE]: (state, action) => {
    return {
      detail: action.payload
    }
  },

  // 编辑-获取字段后下一步获取表格
  [types.HUISHE_DATA_SET_TYPE_GET_TABLE_EDIT]: (state, action) => {
    return {
      detailChange: action.payload
    }
  },

  [types.HUISHE_DATA_SET_TYPE_DATA_LIST_FETCH]: (state, action) => {
    return {
      keysList: action.payload
    }
  },

  // 保存openApi
  [types.HUISHE_DATA_SET_TYPE_SAVE_OPENAPI]: (state, action) => {
    return {
      openApiField: action.payload
    }
  },

}


export default createReducer(initState, actionHandlers)
