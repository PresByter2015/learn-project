export default function(partial, entire) {

  if (Array.isArray(partial) && partial.length > 0) {
    let seriesStyle = this.style.get('series')

    entire = partial.map((item, i) => {
      // 提供处理单项 series item 的回调方法
      if (typeof this.parseSeriesItemData === 'function') {
        return this.parseSeriesItemData(item, seriesStyle, i)
      } else {
        Object.assign(item, seriesStyle)
      }

      return item
    })
  }

  return entire
}
