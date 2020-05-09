import Records from './records'

/**
 * 记录实例管理
 */
const RecordManager = {
  records: {},

  register(id) {
    let record = null
    if (!id) {
      return record
    }

    record = this.records[id] = new Records()
    return record
  },

  get(id) {
    return this.records[id]
  },

  remove(id) {
    if (id && this.records.hasOwnProperty(id)) {
      delete this.records[id]
    } else {
      Object.keys(this.records).forEach(id => this.remove(id))
    }
  }
}

export default RecordManager
