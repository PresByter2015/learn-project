export default function parseOption(option, config, handlers) {
  for (let key in config) {
    if (key in handlers) {
      option[key] = handlers[key](config[key], option[key])
    }
  }

  return option
}
