import Echarts from '../echarts'

export default class extends Echarts {
  constructor() {
    super(...arguments)
    this.style.set('series_gap', 10)
  }

  parseSeriesItemStyle(item, seriesStyle) {
    let minSize = this.addUnit(seriesStyle.minSize, '%')
    let maxSize = this.addUnit(seriesStyle.maxSize, '%')

    return {
      minSize,
      maxSize
    }
  }

  setSeriesData(data) {
    if (Array.isArray(data) && data[0]) {
      let { series } = this.option
      this.option.series = data.map( (item,i) => {
        if (series[i]) {
          return Object.assign({}, series[i], data[i])
        } else {
          return Object.assign({}, series[0], data[i])
        }
      })
    }
    return this.option.series
  }


  /**
   * 添加单位
   */
  addUnit(str, unit = '') {
    if (Array.isArray(str)) {
      return str.map(item => unitParser(item))
    }

    if (typeof str === 'object') {
      return Object.values(str).map(item => unitParser(item))
    }

    if (typeof str === 'number') {
      return str = unitParser(str)
    }

    return str

    function unitParser(item) {
      if (('' + item).lastIndexOf('%') > -1) {
        return item
      }
      return item + unit
    }
  }


  // setOption(option) {
  //   if (option.series) {
  //     let config = option.series

  //     // 设置分类颜色
  //     if (config.color && Array(config.color)) {
  //       config.color.map((color, i) => {
  //         option.color[i] = color
  //       })
  //     }
  //   }

  //   // 需要对系列数据进行排序，以实现数据与颜色显示对应的功能
  //   option.series = option.series.map(item => {
  //     item.data = item.data.sort((a, b) => {
  //       if (item.sort === 'ascending') {
  //         return +a.value > +b.value
  //       }
  //       return +a.value < +b.value
  //     })

  //     return item
  //   })

  //   super.setOption(option)
  // }

}
