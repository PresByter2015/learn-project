export default function(partial, entire) {
  // 处理 xAxis
  if (Array.isArray(partial) && partial.length) {
    if (partial.length === 1) {
      entire.data = partial[0].data

      if (partial[0].type) {
        entire.type = partial[0].type
      } else {
        //避免之前选择过毫秒时间戳而选择其他数据时受到影响
        delete entire.type
      }

      if (partial[0].splitNumber) {
        entire.splitNumber = partial[0].splitNumber
      } else {
        //避免之前选择过毫秒时间戳而选择其他数据时受到影响
        delete entire.splitNumber
      }
    }
  } else {
    entire.data = partial.data
  }

  return entire
}
