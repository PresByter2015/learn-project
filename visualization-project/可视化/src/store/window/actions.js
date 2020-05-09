import WindowModel from 'models/window';
import WidgetModel from 'models/widget';
import Chart from 'modules/chart';
import * as types from './types';

import DataPoller from 'modules/data-poller';
import { generateUUID } from 'utils/generate-uuid';
import RecordManager from 'modules/records-change';
import MoldModel from 'models/mold';

export function fetchDashboard(id) {
  return dispatch => {
    return WindowModel.find(id).then(res => {

      const { data } = res;
      dispatch({
        type: types.HUISHE_WINDOW_TYPE_DATA_FETCH,
        data
      });

      return data;
    });
  };
}

/**
 * 更新窗口信息
 */
export function updateWindow(id, data) {
  return dispatch => {
    return WindowModel.update(id, data)
      .then(res => {
        dispatch({
          type: types.HUISHE_WINDOW_TYPE_UPDATE,
          payload: { ...data }
        });
        return res;
      });
  };
}

/**
 * 删除组件
 */
export function destroyWidget(id) {
  return (dispatch) => {

    return new Promise(resolve => {
      resolve();
      return dispatch({
        type: types.HUISHE_WINDOW_TYPE_WIDGET_DESTROY,
        payload: { id: id }
      });
    });
  };
}

/**
 * 清空组件
 */
export function destroyWidgets() {
  return (dispatch) => {

    return new Promise(resolve => {
      resolve();
      return dispatch({
        type: types.HUISHE_WINDOW_TYPE_WIDGETS_DESTROY,
        payload: {}
      });
    });
  };
}

/**
 * 更新组件信息 data configuration
 */
export function updateWidget(id, data) {
  let windowRecord = RecordManager.get('window');//获取窗口实例

  // 记录变动
  if (data.setting) {
    windowRecord.update(id, 'widgetSetting');//记录部件配置有更改
  }
  if (data.col && data.row) {
    windowRecord.update(id, 'widgetPosition');//记录部件位置(拖拽)有更改
  }
  if (data.sizex && data.sizey) {
    windowRecord.update(id, 'widgetSize');//记录部件大小(变形)有更改
  }
  if (data.dataSetting) {
    windowRecord.update(id, 'dataSetting');//记录数据配置有更改
  }

  return (dispatch, getState) => {
    // 处理数据配置
    if (data.dataSetting) {
      let state = getState();
      let widget = state.window.widgets[id];

      if (widget.dataSetting && data.dataSetting.id !== widget.dataSetting.id) {
        DataPoller.removeSubscriber(widget.dataSetting.id, id);
      }

      if (data.dataSetting.id) {
        DataPoller.handleDataSet(data.dataSetting, id);
      }
      // 如果字段映射修改过
      DataPoller.updateFieldsMap(data.dataSetting.id, state.dataSet.fieldEdit);
    }

    return new Promise(resolve => {
      dispatch({
        type: types.HUISHE_WINDOW_TYPE_WIDGET_UPDATE,
        id,
        data
      });
      resolve();
    });
  };
}

/**
 * 添加或更新连线
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function updateEdge(data) {
  let chunkData = data;
  let styleSetting = {};
  if (data.styleSetting) {
    styleSetting = data.styleSetting;
  } else {
    styleSetting = Chart.getFlattenConfig(chunkData.chart.type, chunkData.chart.theme);
  }

  //在拉线过程中这里会走很多次，但终究只是同一根线并且对后端来说只是添加
  let windowRecord = RecordManager.get('window');//获取窗口实例
  windowRecord.add(chunkData.id); //记录新增了部件

  return {
    type: types.HUISHE_WINDOW_TYPE_WIDGET_ADD,
    payload: Object.assign({}, chunkData, {
      styleSetting
    })
  };
}

/**
 * 添加或更新连线
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function updateEdges(data) {
  let windowRecord = RecordManager.get('window');//获取窗口实例

  for (let id in data) {

    if (data[id].points) {
      windowRecord.update(id, 'edgeSetting');//记录线X、Y、宽、高、路径变化
    }
  }

  return {
    type: types.HUISHE_WINDOW_TYPE_EDGES_UPDATE,
    payload: { ...data }
  };
}

/**
 * 添加组件
 */
export function addWidget(windowId, data) {
  return (dispatch, getState) => {
    if (typeof windowId === 'object') {
      data = windowId;
      windowId = getState().window.window.id;
    }

    let chunkData = WidgetModel.parseData(data);
    let styleSetting = {};

    if (typeof chunkData.chart.zIndex !== 'undefined') {
      chunkData.setting.zIndex = chunkData.chart.zIndex;
    }

    if (data.styleSetting) {
      styleSetting = data.styleSetting;
    } else {
      styleSetting = Chart.getFlattenConfig(chunkData.chart.type, chunkData.chart.theme);
    }

    // col/row至少为1，fix: 拖放widgets时，有可能col或row为0/undefined/NaN
    chunkData.col = chunkData.col ? chunkData.col : 1;
    chunkData.row = chunkData.row ? chunkData.row : 1;

    let fuuid = generateUUID(); //前端创建uuid
    let windowRecord = RecordManager.get('window');//获取窗口实例
    windowRecord.add(fuuid); //记录新增了部件
    console.log('6978');
    return new Promise(resolve => {
      resolve({ id: fuuid });
      return dispatch({
        type: types.HUISHE_WINDOW_TYPE_WIDGET_ADD,
        payload: Object.assign({}, chunkData, {
          id: fuuid,
          styleSetting
        })
      });
    });
  };
}

/**
 * 添加组件保存成功后更新后端buuid
 */
export function updateWidgetBuuid(data) {
  return (dispatch) => {
    return dispatch({
      type: types.HUISHE_WINDOW_TYPE_UPDATE_WIDGET_BUUID,
      payload: data
    });
  };
}

export function setCloneWidgetId(id) {
  return dispatch => {
    return new Promise(resolve => {
      resolve();
      return dispatch({
        type: types.HUISHE_WINDOW_TYPE_SET_CLONE_WIDGET_ID,
        payload: { id }
      });
    });
  };
}

export function updateWidgetsZIndex(zIndexs) {
  return dispatch => {
    return dispatch({
      type: types.HUISHE_WINDOW_TYPE_WIDGETS_UPDATE,
      payload: { zIndexs }
    });
  };
}

export function updateChartStyleSetting(id, name, value) {
  return dispatch => {
    let windowRecord = RecordManager.get('window');//获取窗口实例
    windowRecord.update(id, 'styleSetting', name);
    return dispatch({
      type: types.WIDGET_CHART_STYLE_SETTING_UPDATE,
      payload: {
        id,
        data: {
          name,
          value
        }
      }
    });
  };
}

export function updateChartSetting(id, data) {
  return dispatch => {
    let windowRecord = RecordManager.get('window');//获取窗口实例

    Object.keys(data).forEach(type => {
      windowRecord.update(id, 'grapherSetting', type); //记录图形配置有更改
    });

    return dispatch({
      type: types.WIDGET_CHART_SETTING_UPDATE,
      payload: { id, data }
    });
  };
}

export function fetchMold() {
  return new Promise((reslove) => {
    MoldModel.get(MoldModel.url).then(res => {
      reslove(res);
    });
  });
}

export function updateChartOption(id, option) {
  return dispatch => {
    return dispatch({
      type: types.WIDGET_CHART_OPTION_UPDATE,
      payload: { id, option }
    });
  };
}
