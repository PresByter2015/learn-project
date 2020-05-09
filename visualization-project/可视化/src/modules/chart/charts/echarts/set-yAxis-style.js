import _ from 'lodash'

export default function(yAxisStyle, index = 0) {
  let { yAxis } = this.option

  this.option.yAxis[index] = _.merge(yAxis[index], yAxisStyle)
}
