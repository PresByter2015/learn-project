/**
 * 处理 series
 */
export default function(partial, entire) {
  // 数组
  if (Array.isArray(partial) && partial.length) {
    // 循环修改数据
    entire = partial.map((item, i) => {
      let sourceItem = entire[i] || entire[0]
      return Object.assign({}, sourceItem, item)
    })
  }

  return entire
}
