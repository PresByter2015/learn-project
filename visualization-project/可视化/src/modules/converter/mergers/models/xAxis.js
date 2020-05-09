/**
 * 处理 xAxis
 */
export default function(partial, entire) {
  if (Array.isArray(partial) && partial.length > 0) {
    if (Array.isArray(entire)) {
      partial.forEach((item, index) => {
        entire[index].data = item.data
      })
    } else {
      if (partial[0]) {
        entire.data = partial[0].data
      }
    }
  }

  return entire
}
