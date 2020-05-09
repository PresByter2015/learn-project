import createReducer from 'utils/create-reducer'
import * as types from './types'
import { arrayToObject } from 'utils'

const initState = {
  dataSource: [], //数据源+数据集
  list: {}, //数据源
  oneSource: {},
  stats: []
}

const actionHandlers = {
  // 清空数据源表单信息
  [types.HUISHE_DATA_SOURCE_TYPE__NULL]: () => {
    return {
      oneSource: {}
    }
  },

  // 连接状态
  ['DATA_STATE']: (state, action) => {
    let data = [...state.dataSource]
    let oldData = [...action.payload]
    data.map(item => {
      oldData.map(stats => {
        if (item.id === stats.id) {
          item.stat = stats.stat
        }
      })
      item.children.map(children => {
        oldData.map(stats => {
          if (children.id === stats.id) {
            children.stat = stats.stat
          }
        })
      })
    })
    return {
      dataSource: data,
      stats: oldData
    }
  },

  // 获取数据源+数据集
  [types.HUISHE_DATA_SOURCE_TYPE_GET]: (state, action) => {
    let stats = [...state.stats]
    let data = action.payload

    let nextKey = 0

    data.map(item => {
      item.key = item.id
      item.stat = true

      if (item.id !== '9129f99351e64517a4e11562fa86cea3' && item.sourceName !== 'OpenAPI') {
        item.datasets.push({
          id: item.id,
          key: nextKey--,
          setName: '',
          sourceName: 'ADD',
          type: item.type,
        })
      }
      item.datasets.map(item => {
        item.stat = true
      })
      stats.map(stat => {
        if (item.id === stat.id) {
          item.stat = stat.stat
        }
      })

      item.datasets.map(set => {
        stats.map(stat => {
          if (set.id === stat.id) {
            set.stat = stat.stat
          }
        })
      })
      item.children = item.datasets
      delete item.datasets
    })

    return {
      dataSource: data
    }
  },

  //获取数据源
  [types.FETCH_HUISHE_DATA_SOURCE_TYPE_S]: (state, action) => {
    const dict = arrayToObject(action.payload)
    let dataSources = Object.assign({}, state.dict)

    for (let key in dict) {
      if (key in dataSources) {
        dataSources[key] = Object.assign({}, dataSources[key], dict[key])
      } else {
        dataSources[key] = dict[key]
      }
    }

    return {
      dict: dataSources,
      list: action.payload
    }
  },

  ['HUISHE_DATA_SOURCE_TYPE__DATA_SET_FETCH']: (state, action) => {
    let { dataSourceId, data } = action.payload
    let dict = Object.assign({}, state.dict)

    let dataSource = Object.assign({}, dict[dataSourceId])
    let dataSets = dataSource.dataSets || {}
    Object.assign(dataSets, arrayToObject(data))

    dataSource.dataSets = dataSets
    dict[dataSourceId] = dataSource

    return {
      dict
    }
  },

  //获取单个数据源填充表单
  [types.HUISHE_DATA_SOURCE_TYPE__GET]: (state, action) => {
    let data = action.payload
    data.userNameApi = data.userName
    data.passwordApi = data.password
    data.urlDb = data.url
    return {
      oneSource: data
    }
  },

}


export default createReducer(initState, actionHandlers)
