/**
 * 缓存图表引用
 */
let charts = {}

export default {
  add(id, chart) {
    if (!charts.hasOwnProperty(id)) {
      charts[id] = chart
    }
  },

  get(id) {
    return charts[id]
  },
  
  clear() {
    charts = {}
  }
}
