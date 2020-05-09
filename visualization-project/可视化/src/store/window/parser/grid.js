import _ from 'lodash'
import style from 'modules/chart/themes/style.js'

export default function Grid(option, optionType) {
  if (!option.grid || (optionType !== 'legend' && optionType !== 'xAxis'
    && optionType !== 'leftYAxis' && optionType !== 'rightYAxis') ) {
    //没有grid或者修改的东西不影响grid
    return
  }

  let grid = {
    top: style.gridPos.top,
    left: style.gridPos.left,
    right: style.gridPos.right,
    bottom: style.gridPos.bottom,
  }

  const legend = option.legend
  const xAxis = option.xAxis
  const leftYAxis = option.yAxis ? option.yAxis[0] : null
  const rightYAxis = option.yAxis ? option.yAxis[1] : null

  const show = legend.show

  if (show) {

    if (legend.left === 'left' && (legend.top === 'middle' || legend.top === 'center')) {
      //在左
      grid = _.merge({}, grid, offset(legend, 'left'))
    } else if (legend.left === 'right' && (legend.top === 'middle' || legend.top === 'center')) {
      grid = _.merge({}, grid, offset(legend, 'right'))
    } else if (legend.top === 'bottom') {
      grid = _.merge({}, grid, offset(legend, 'bottom'))
    } else {
      grid = _.merge({}, grid, offset(legend, 'top'))
    }
  }

  option.grid = _.merge({}, option.grid, grid)
  return


  function offset(legend, direct) {

    let grid = {}

    let fontSize = legend.textStyle.fontSize || 12

    if (direct === 'left') {

      let fontCount = 0
      _.map(legend.data, function(item) {
        fontCount = Math.max(getStrLen(item.name || item) / 2, fontCount)
      })
      let width = fontCount * fontSize + 35
      let leftYAxisWidth = getAxisLen(leftYAxis)
      grid[direct] = width + leftYAxisWidth

    } else if (direct === 'right') {

      let fontCount = 0
      _.map(legend.data, function(item) {
        fontCount = Math.max(getStrLen(item.name || item) / 2, fontCount)
      })
      let width = fontCount * fontSize + 35
      let rightYAxisWidth = getAxisLen(rightYAxis)
      grid[direct] = width + rightYAxisWidth

    } else if (direct === 'top') {

      let heigth = Math.max(16, fontSize) + 20
      grid[direct] = heigth

    } else {

      let heigth = Math.max(16, fontSize)
      let xAxisHeight = getAxisLen(xAxis)
      grid[direct] = heigth + xAxisHeight

    }

    return grid
  }

  function getAxisLen(axis) {
    let axisLen = 12 // 轴标签宽度或高度

    if (axis && axis.axisLabel) {
      if (axis.axisLabel.show === false) {
        axisLen = 0
      } else if (axis.axisLabel.textStyle && axis.axisLabel.textStyle.fontSize) {
        axisLen = axis.axisLabel.textStyle.fontSize
      }
    }
    return axisLen
  }

  /**
   * 统计字数，英文算1个，中文算2个
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  function getStrLen(str) {
    if (typeof str !== 'string') {
      return 0
    }
    let myLen = 0
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
        myLen++
      } else {
        myLen += 2
      }
    }
    return myLen
  }
}
