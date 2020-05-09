import Theme from './theme'

const charts = new Map()

let _charts = window.charts = []

const Chart = Object.create({
  create(klass, type, elem, option, theme = 'basic', extra, scale) {
    if (typeof klass === 'object') {
      let chartObj = klass
      option = klass.option
      klass = chartObj.klass
      elem = type
      type = chartObj.type
      theme = chartObj.theme
    }

    let ChartConstructor = charts.get(klass)

    if (ChartConstructor) {
      if (typeof type === 'object' && 'nodeType' in type) {
        elem = type
        type = klass
      }

      if (type && theme && !option) {
        option = Theme.getOption(type, theme)
      }

      // 临时处理 counter
      // if (klass === 'counter') {
      //   setting = option
      //   option = Theme.getOption(type, theme)
      // }

      if (!option) {
        console.warn(`Chart constructor ${klass} ${type}, ${theme}, option not found`)
      }

      let chart = new ChartConstructor(option, elem, theme, extra, scale)
      // 这里需要
      chart.klass = klass
      chart.type = type
      chart.theme = theme
      _charts.push(chart)
      return chart
    } else {
      console.warn(`Can't found ${klass} class`)
    }

    return false
  },

  register(name, cons) {
    charts.set(name, cons)
  },

  get(klass) {
    return charts.get(klass)
  }
})

export default Chart
