import Task from './task'

/**
 * 任务管理类
 */
const TaskManager = {
  tasks: {},

  add(id, data) {
    let task = null
    if (!id) {
      return task
    }

    if (id in this.tasks) {
      task = this.tasks[id]
      task.update(data)
    } else {
      task = this.tasks[id] = new Task(id, data)
    }

    task.start()

    return task
  },

  start(id) {
    let task = this.tasks[id]

    if (task) {
      task.start()
    }
  },

  has(id) {
    return typeof this.tasks[id] !== 'undefined'
  },

  stop(id) {
    let task = this.tasks[id]

    if (task) {
      task.stop()
    }
  },

  remove(id) {
    if (id && this.tasks.hasOwnProperty(id)) {
      this.tasks[id].destroy()
      delete this.tasks[id]
    } else {
      Object.keys(this.tasks).forEach(id => this.remove(id))
    }
  },

  get(id) {
    return this.tasks[id]
  }
}

window.taskManager = TaskManager
export default TaskManager
