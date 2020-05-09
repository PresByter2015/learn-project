import * as types from './types.js'
import UserModel from 'models/user'

export function fetchUserData() {
  return dispatch => {
    UserModel.find().then(res => {
      let { data } = res
      if (data) {
        return dispatch({
          type: types.HUISHE_USER_TYPEDATA_FETCH,
          payload: data
        })
      } else {
        return dispatch({
          type: types.HUISHE_USER_TYPENOT_LOGIN
        })
      }
    })
  }
}
