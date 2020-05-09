import React, { Component } from 'react'

/**
 * CellList Component
 */
class CellList extends Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    cols: React.PropTypes.number.isRequired,
    rows: React.PropTypes.number.isRequired,
    style: React.PropTypes.object,
    visible: React.PropTypes.bool
  }

  constructor() {
    super()

    // 放到这里的目的是缓存上次生成的 cols 和 rows，防止重复计算生成
    this.uid = 1

    this.initialize = false
    this.state = {
      redraw: false
    }
  }

  redrawCell() {
    this.uid = 1
    let cols = []
    let rows = []

    let cellWidth = this.props.width / this.props.cols
    let cellHeight = this.props.height / this.props.rows

    for (let i = 0; i < this.props.cols; i++) {
      cols.push(
        <div key={this.uid++} style={{
          left: cellWidth * i,
          height: this.props.height,
          position: 'absolute'
        }} />
      )

      if (i < this.props.rows) {
        rows.push(
          <div key={this.uid++} style={{
            top: cellHeight * i,
            width: this.props.width,
            position: 'absolute'
          }} />
        )
      }
    }
    return { cols, rows }
  }

  componentDidMount() {
    this.initialize = true
  }

  shouldComponentUpdate(nextProps) {
    // cols 和 rows 改变之后，需要重新绘制参考线
    if (nextProps.cols !== this.props.cols || nextProps.rows !== this.props.rows) {
      return true
    }

    // 宽度和高度存在的渲染
    if (nextProps.width > 0 && nextProps.height > 0) {
      return true
    }

    return false
  }

  componentWillReceiveProps(nextProps) {
    let { cols, rows, width, height } = this.props

    // 某个值发生变化的时候，需要重写计算生成 cols rows
    if ((nextProps.width > 0 && nextProps.height > 0)
      && (cols !== nextProps.cols || rows !== nextProps.rows
      || width !== nextProps.width || height !== nextProps.height
      )) {
      this.setState({
        redraw: true
      })
    } else {
      this.setState({
        redraw: false
      })
    }
  }

  render() {
    let style = Object.assign({
      width: '100%',
      height: '100%'
    }, this.props.style || {})
    let rows = null
    let cols = null

    if (this.props.visible) {
      let ret = this.redrawCell()
      cols = ret.cols
      rows = ret.rows
    }

    return (
      <div className="grid-cell-list" style={ style } data-cols={cols.length} data-rows={rows.length}>
        {rows} {cols}
      </div>
    )
  }
}

export default CellList
