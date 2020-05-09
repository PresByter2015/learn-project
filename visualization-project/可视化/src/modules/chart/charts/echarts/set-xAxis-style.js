import _ from 'lodash'

export default function(xAxisStyle) {
  let { xAxis } = this.option

  _.merge(xAxis, xAxisStyle)
}
