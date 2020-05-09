export default function(seriesStyle) {
  /** 循环处理 series */
  this.option.series = this.option.series.map((item, i) => {
    if (this.parseSeriesItemStyle) {
      let parsedItem = this.parseSeriesItemStyle(item, seriesStyle, i)
      return Object.assign({}, item, seriesStyle, parsedItem)
    }

    return Object.assign({}, item, seriesStyle)
  })
}
