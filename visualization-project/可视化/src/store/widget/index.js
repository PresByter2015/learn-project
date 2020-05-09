import createReducer from 'utils/create-reducer'
import * as types from './types'

const initState = { }

const actionHandlers = {
  [types.HUISHE_WIDGET_TYPE_UPDATE]: () => {
    return { }
  }
}

export default createReducer(initState, actionHandlers)
