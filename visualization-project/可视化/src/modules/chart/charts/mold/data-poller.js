import Mold from 'src/models/mold'

class DataPoller {
  constructor() {
    this._timer = null
  }

  fetchData(flag = false, id, cb) {
    const method = flag ? Mold.getStatusData : Mold.getIndexData
    clearInterval(this._timer);
    this._timer = setInterval( function () {
      method(id).then( function (res) {
        if (res && res.data && Array.isArray(res.data)) {
          cb(res.data)
        }
      }).catch(
        function (reason) {
          if (!reason.data) {
            cb(reason)
          }
        }
      )
    }, 5000)
  }

  destory() {
    this._timer = null
  }
}

export default DataPoller

