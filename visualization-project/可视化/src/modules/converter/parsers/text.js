export default function(resData, config = {}) {
  let text = ''

  if ('seriesKey' in config) {
    let item = resData[config.seriesKey]

    if (item && item.data) {
      text = item.data[0]
    }

    return text
  } else {
    return ''
  }
}

