import createReducer from 'utils/create-reducer'
import * as types from './types'

const initState = {
  typeSource: [],
  recentTime: [],
  dataType: [],
  refreshTime: [],
}

const actionHandlers = {
  [types.HUISHE_OPTIONS_TYPE_DATA_FETCH]: (state, action) => {
    let data = action.payload

    return { ...data }
  },
  [types.HUISHE_OPTIONS_TYPE_UPDATE] : (state, action) => {
    return { ...action.data }
  },
  [types.HUISHE_OPTIONS_TYPE_REFRESH] : (state, action) => {
    return {
      refreshTime: [...action.payload.refreshTime]
    }
  },
  [types.HUISHE_OPTIONS_TYPE_DATATYPE] : (state, action) => {
    return {
      dataType: [...action.payload.dataType]
    }
  },
  [types.HUISHE_OPTIONS_TYPE_RECENT] : (state, action) => {
    return {
      recentTime: [...action.payload.recentTime]
    }
  },
  [types.HUISHE_OPTIONS_TYPE_DATASOURCE] : (state, action) => {
    let data = [...action.payload.datasource]
    return {
      typeSource: data
    }
  },
}

export default createReducer(initState, actionHandlers)
