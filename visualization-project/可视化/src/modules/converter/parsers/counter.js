export default function(data, config = {}/*, map = {}*/) {
  let text = ''

  if ('seriesKey' in config) {
    let item = data[config.seriesKey]

    if (item && item.data) {
      text = item.data[0]
    }

    return { value: text }
  } else {
    return { value: '' }
  }
}
