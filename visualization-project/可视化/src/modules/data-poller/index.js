import EventEmitter from 'eventemitter3'
import DataSetModel from 'models/data-set'

import toStruct from './struct'
import Tasks from './tasks'

import SocketModule from './socket'
import event from './event'

/**
 * 数据集任务通信管理
 */
class DataPoller extends EventEmitter {
  // 处理数据集
  handleDataSet(dataSet, subscriberId) {
    let task = Tasks.get(dataSet.id)
    
    // 任务存在
    if (task) {
      this.handleTaskExists(task, subscriberId, dataSet)
    } else { // 任务不存在
      this.addTask(task, dataSet, subscriberId)
    }
  }

  // 获取字段名字映射值
  getFieldsMap(ary) {
    let fieldsMap = {}

    if (Array.isArray(ary)) {
      ary.forEach(field => {
        fieldsMap[field.fieldName] = {
          name: field.displayName,
          type: field.dataType
        }
      })
    }

    return fieldsMap
  }

  fetch(id) {
    return (callback) => {
      this.receiveData = (data) => {
        if (data && data.collection) {
          callback(toStruct(data.collection))
        }
      }
      event.on(`receiveData.${id}`, this.receiveData)
    }
  }


  addTask(task, dataSet, subscriberId) {
    const self = this
    DataSetModel.find(dataSet.id).then(res => {
      const { data } = res
      let { keepField } = data
      let fields = this.getFieldsMap(keepField)
      
      task = Tasks.get(dataSet.id)

      if (!task) {
        task = Tasks.add(dataSet.id, {
          fields,
          callback: this.fetch(dataSet.id)
        })

        //触发后端监听添加数据集事件
        SocketModule.add(task.id)
      }

      // 添加订阅者
      task.addSubscriber(subscriberId, {
        dataSet, fields
      }, function(data) { // 不要用箭头函数
        self.emit(`pool.${subscriberId}`, this, data)
      }, true)

    })
  }

  // 处理任务存在
  handleTaskExists(task, subscriberId, dataSet) {
    const self = this
    let subscriber = task.getSubscriber(subscriberId)

    if (subscriber) {
      subscriber.setOption({ dataSet }).receive(task.lastData)
    } else {
      task.addSubscriber(subscriberId, {
        dataSet, fields: task.option.fields
      }, function (data) {
        self.emit(`pool.${subscriberId}`, this, data)
      }, true)
    }
  }

  updateFieldsMap(taskId, fields) {
    if (!taskId || !fields.length) {
      return
    }

    let task = Tasks.get(taskId)
    if (task) {
      task.setOption({ fields: this.getFieldsMap(fields) })
      task.flush(true)
    }
  }

  // 移除监听者
  removeSubscriber(taskId, subscriberId) {
    if (!taskId || !subscriberId) {
      return
    }

    let task = Tasks.get(taskId)
    if (task) {
      task.removeSubscriber(subscriberId)

      // 判断任务下是否还有订阅者
      if (!task.hasSubscribers()) {
        Tasks.remove(task.id)

        //触发后端监听删除数据集事件
        SocketModule.remove(task.id)
      }
    }
  }

  // 销毁数据轮询
  destroy() {
    Tasks.remove()
  }
}

export default new DataPoller
