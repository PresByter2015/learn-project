import createReducer from 'utils/create-reducer'
import { arrayToObject, nullToUndefined } from 'utils'
import * as types from './types'
import DataPoller from 'modules/data-poller'
import RecordManager from 'modules/records-change'
import _ from 'lodash'
import { unPackEdge } from 'modules/records-change/dealEdge'

const initState = {
  cloneWidgetId: null,

  // 窗口的默认配置
  window: {
    width: 'auto',
    height: 'auto',
    style: {
      fontSize: '12px',
      color: '#fff'
    },
    window: { bgColor: '#666666', bgType: 1 },
    widget: {
      marginLeft: 10,
      marginTop: 10
    }
  },

  widgets: {},
  edges: {}
}

const actionHandlers = {
  [types.HUISHE_WINDOW_TYPE_DATA_FETCH]: (state, action) => {
    let { window, widgets } = action.data

    //处理后端返回来的数据结构
    widgets = arrayToObject(widgets, 'fuuid', (item) => {
      item.id = item.fuuid // 映射 fuuid 到 id
      delete item.fuuid

      //处理保存到后端时被序列化成null的series值,还原回undefined
      if (item && item.dataSetting) {
        if (item.dataSetting.series) {
          nullToUndefined(item.dataSetting.series)
        }
        if (item.dataSetting.seriesSecond) {
          nullToUndefined(item.dataSetting.seriesSecond)
        }
      }

      item = unPackEdge(item)

      return item
    })
    return { widgets, window }
  },

  [types.HUISHE_WINDOW_TYPE_SET_CLONE_WIDGET_ID]: (state, action) => {
    let { id } = action.payload

    return { cloneWidgetId: id }
  },

  // 更新窗口
  [types.HUISHE_WINDOW_TYPE_UPDATE]: (state, action) => {
    let window = Object.assign({}, state.window, action.payload)
    return { window }
  },

  // 添加组件
  [types.HUISHE_WINDOW_TYPE_WIDGET_ADD]: (state, action) => {
    let widgets = Object.assign({}, state.widgets)
    widgets[action.payload.id] = action.payload

    return { widgets }
  },

  // 添加或更新连线
  [types.HUISHE_WINDOW_TYPE_EDGES_UPDATE]: (state, action) => {
    let widgets = Object.assign({}, state.widgets)
    let updateEdges = action.payload;
    for (let id in updateEdges) {
      Object.assign(widgets[id], updateEdges[id])
    }
    return { widgets }
  },
  
  //更新部件buuid
  [types.HUISHE_WINDOW_TYPE_UPDATE_WIDGET_BUUID]: (state, action) => {
    let widgets = Object.assign({}, state.widgets)
    action.payload.forEach((item) => {
      widgets[item.fuuid].buuid = item.buuid
    })

    return { widgets }
  },

  [types.HUISHE_WINDOW_TYPE_WIDGET_DESTROY]: (state, action) => {
    let { id } = action.payload
    let widgets = Object.assign({}, state.widgets)

    let { buuid } = widgets[id]
    const windowRecord = RecordManager.get('window')//获取窗口实例
    windowRecord.delete(id, buuid)//记录删除了部件

    if (widgets[id].dataSetting && widgets[id].dataSetting.id) {
      DataPoller.removeSubscriber(widgets[id].dataSetting.id, id)//移除订阅者
    }

    if (widgets.hasOwnProperty(id)) {
      //TODO: 删除mold前要先删除与之相连的edge
      if (widgets[id].chart.type === 'mold') {
        _.map(widgets, (widget, fuuid) => {
          if (widget && widget.chart.type === 'edge'
            && (widget.source.id === id || widget.target.id === id)) {
            windowRecord.delete(fuuid, widgets[fuuid].buuid)
            widgets[fuuid] = null
          }
        })
      }
      widgets[id] = null
    }

    return { widgets: widgets }
  },

  [types.HUISHE_WINDOW_TYPE_WIDGETS_DESTROY]: () => {
    return { widgets: {} }
  },

  [types.HUISHE_WINDOW_TYPE_WIDGET_UPDATE]: (state, action) => {
    let { id, data } = action
    let widgets = { ...state.widgets }
    let widget = null

    if (widgets.hasOwnProperty(id)) {
      widget = _.merge({}, { ...widgets[id] }, { ...data })
      
      //避免lodash不能覆盖undefined值(只有数据配置可能存在undefined)
      if (data.dataSetting) {
        widget.dataSetting = Object.assign(widget.dataSetting, data.dataSetting)
      }

      widgets[id] = widget
    }

    return { widgets }
  },

  [types.HUISHE_WINDOW_TYPE_WIDGETS_UPDATE]: (state, action) => {
    let widgets = { ...state.widgets }
    let { zIndexs } = action.payload

    for (let id in widgets) {
      widgets[id]['setting'] = widgets[id]['setting'] || {}
      Object.assign(widgets[id]['setting'], {
        zIndex: zIndexs[id]
      })
    }

    return { widgets }
  },

  //更新widget下的chart下的option
  [types.WIDGET_CHART_OPTION_UPDATE]: (state, action) => {
    let { id, option } = action.payload
    let widgets = { ...state.widgets }
    let widget = { ...widgets[id] }
    if (widget) {
      widget.chart.option = _.merge({}, widget.chart.option, option)

      widgets[id] = widget
    }
    return { widgets }
  },

  [types.WIDGET_CHART_SETTING_UPDATE]: (state, action) => {
    let { id, data } = action.payload
    let widgets = { ...state.widgets }

    let widget = widgets[id]

    if (widget) {
      widget.chart.setting = Object.assign({}, widget.chart.setting, data)
      widget.chart.option = Object.assign({}, widget.chart.option, data)
      widgets[id] = widget
    }

    return { widgets }
  },

  [types.WIDGET_CHART_STYLE_SETTING_UPDATE]: (state, action) => {
    let { id, data } = action.payload

    let widgets = { ...state.widgets }
    let widget = widgets[id]

    if (widget) {
      widget.styleSetting = widget.styleSetting || {}
      widget.styleSetting[data.name] = data.value
      widgets[id] = widget
    }

    return { widgets }
  }
}

export default createReducer(initState, actionHandlers)
