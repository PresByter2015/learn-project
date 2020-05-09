class Parser {
  static ParseMethodPrefix = 'parse_'

  constructor(option) {
    this.originOption = option
    this.option = Object.assign({}, option)

    Object.getOwnPropertyNames(this.constructor.prototype).forEach(method => {
      if (this.isParseMethod(method)) {
        let field = this.getFieldWithMethod(method)
        this.option[field] = this[method].bind(this)(this.option[field])
      }
    })
  }

  getFieldWithMethod(method) {
    return method.substr(Parser.ParseMethodPrefix.length)
  }

  isParseMethod(method) {
    return method.substr(0, Parser.ParseMethodPrefix.length) === Parser.ParseMethodPrefix
  }

  get data() {
    return this.option
  }
}

export default Parser
