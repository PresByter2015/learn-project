/**
 * 解析时间
 */
export default function time(data, config = {}) {
  if (!data) {
    return 
  }

  let recieveData = new Date('2017-01-01 12:00:00').getTime()

  if (config && config.hasOwnProperty('seriesKey')) {
    let value = data[config.seriesKey]
    if (value && value.data) {
      recieveData = value.data[(value.data.length - 1)]
    }
  }

  return recieveData
  
}

