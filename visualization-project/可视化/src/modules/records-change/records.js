import _ from 'lodash'
/**
 * 记录模块
 */
class Records {
  constructor() {
    this.changeData = {}
  }

  //记录新增部件
  add(widgetId) {
    let addObj = {
      [`${widgetId}`]: {
        widgetAdd: true
      }
    }
    this.changeData =  _.merge(this.changeData, addObj)

    return this.changeData
  }

  //记录删除部件
  delete(widgetId, buuid) {
    let deleteObj = {
      [`${widgetId}`]: {
        widgetDelete: true,
        buuid: buuid
      }
    }
    this.changeData = _.merge(this.changeData, deleteObj)

    return this.changeData
  }

  //记录更新部件
  update(widgetId, recordsType, typeKey) {
    if (typeKey) {
      let updateObj = {
        [`${widgetId}`]: {
          [`${recordsType}`]: {
            [`${typeKey}`]: true
          }
        }
      }
      this.changeData = _.merge(this.changeData, updateObj)
    } else {
      let updateObj = {
        [`${widgetId}`]: {
          [`${recordsType}`]: true
        }
      }
      this.changeData = _.merge(this.changeData, updateObj)
    }

    return this.changeData
  }

  getRecords() {
    return this.changeData
  }

  //清除记录
  resetChange() {
    this.changeData = {}
    return this.changeData
  }
}

export default Records
