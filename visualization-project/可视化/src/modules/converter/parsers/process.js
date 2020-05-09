// import getMapName from './getMapName'

export default function process(data, config = {}) {
  if (!data) {
    return 
  }

  if (!config) {
    return 
  }

  let currentValue = []

  if (config && config.value) {
    // const flag = getMapName(config.value, map)
    // let values = data[flag]
    let values = data[config.value]
    if (values && values.data) {
      currentValue.push(values.data && values.data[0])
    }
  }

  return { current: currentValue }

}
