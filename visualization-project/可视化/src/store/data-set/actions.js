import * as types from './types';
import DataSetModel from 'models/data-set';

// 清空数据集信息
export function emptyDataSet() {
  return {
    type: types.HUISHE_DATA_SET_TYPE_NULL
  };
}

// 获取数据集信息
export function dataSetGet(setId) {
  return dispatch => {
    return DataSetModel.dataSetGet(setId)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_GET,
          payload: data
        });
        return data;
      });
  };
}

// 新建-测试数据集
export function dataSetTest(dataSet) {
  return dispatch => {
    return DataSetModel.dataSetTest(dataSet)
      .then(res => {
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_TEST,
          payload: res
        });
        return res;
      });
  };
}

// 编辑-测试数据集
export function dataSetTestEdit(dataSet, id) {
  return dispatch => {
    return DataSetModel.dataSetTestEdit(dataSet, id)
      .then(res => {
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_TEST_EDIT,
          payload: res
        });
        return res;
      });
  };
}

/**
 * 新建-测试后下一步获取字段
 */
export function dataSetGetField(dataSet) {
  return dispatch => {
    return DataSetModel.dataSetGetField(dataSet)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_GET_FIELD,
          payload: data
        });
        return data;
      });
  };
}

/**
 * 编辑-测试后下一步获取字段
 */
export function dataSetGetFieldEdit(dataSet, id) {
  return dispatch => {
    return DataSetModel.dataSetGetFieldEdit(dataSet, id)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_GET_FIELD_EDIT,
          payload: data
        });
        return data;
      });
  };
}

/**
 * 新建-获取字段后下一步获取table表
 */
export function dataSetGetTable(dataSet) {
  return dispatch => {
    return DataSetModel.dataSetGetTable(dataSet)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_GET_TABLE,
          payload: data
        });
        return data;
      });
  };
}

/**
 * 编辑-获取字段后下一步获取table表
 */
export function dataSetGetTableEdit(dataSet, id) {
  return dispatch => {
    return DataSetModel.dataSetGetTableEdit(dataSet, id)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_GET_TABLE_EDIT,
          payload: data
        });
        return data;
      });
  };
}

// 新建-保存
export function dataSetSave(dataSet) {
  return dispatch => {
    return DataSetModel.dataSetSave(dataSet)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_SAVE,
          payload: data
        });
        return data;
      });
  };
}

// 编辑-保存
export function dataSetSaveEdit(dataSet, id) {
  return dispatch => {
    return DataSetModel.dataSetSaveEdit(dataSet, id)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_SAVE_EDIT,
          payload: data
        });
        return data;
      });
  };
}

// 删除数据集
export function deleteDataSet(setId) {
  return dispatch => {
    return DataSetModel.deleteDataSet(setId)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_DELETE,
          payload: data
        });
        return data;
      });
  };
}

// 查看数据
// export function viewData(setId) {
//   return dispatch => {
//     return DataSetModel.viewData(setId)
//       .then(res => {
//         console.log(res)
//         dispatch({
//           type: types.HUISHE_DATA_SET_TYPE_VIEW,
//           payload: res
//         })
//       })
//   }
// }

/**
 * 获取数据集列表
 */
export function fetchDataSetByKey(id) {
  if (!id) {
    return;
  }

  return dispatch => {
    return DataSetModel.findByKey(id)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_LIST,
          payload: data
        });
        return data;
      });
  };
}

/**
 * 查看数据时获取数据集字段
 */
export function fetchDataSetKeysList(id, params) {
  if (!id) {
    return;
  }
  return dispatch => {
    return DataSetModel.findBy(params, id)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_DATA_LIST_FETCH,
          payload: data
        });
        return res;
      });
  };
}

/**
 * 根据数据源id获取数据集
 */
export function fetchDataSetByDataSource(id) {
  return dispatch => {
    return DataSetModel.findByDataSource(id)
      .then(res => {
        const { data } = res;

        dispatch({
          type: 'DATA_SOURCE_HUISHE_DATA_SET_TYPE_FETCH',
          payload: {
            dataSourceId: id,
            data
          }
        });

        return data;
      });
  };
}

// 保存openApi
export function saveOpenApi(data, id) {
  return dispatch => {
    return DataSetModel.saveOpenApi(data, id)
      .then(res => {
        const { data } = res;
        dispatch({
          type: types.HUISHE_DATA_SET_TYPE_SAVE_OPENAPI,
          payload: data
        });
        return data;
      });
  };
}
