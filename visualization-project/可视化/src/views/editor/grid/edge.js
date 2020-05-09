import React from 'react'
import { findDOMNode } from 'react-dom'
import Chart from 'components/chart'
import Charts from 'modules/chart/cache'

/**
 * Edge 连接线，在父级已计算好
 * type
 * x, y, width, height, points
 */
let Edge = React.createClass({
  propTypes: {
    id: React.PropTypes.oneOfType([
      React.PropTypes.number.isRequired,
      React.PropTypes.string.isRequired
    ]),
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    line: React.PropTypes.string,
    points: React.PropTypes.array,
    styleSetting: React.PropTypes.object,
    chart: React.PropTypes.object.isRequired,
    scale: React.PropTypes.number,
    active: React.PropTypes.bool.isRequired,

    canOperate: React.PropTypes.bool.isRequired,
    onClickEdge: React.PropTypes.func
  },

  // 注册图表
  register(id, chart) {
    Charts.add(id, chart)
  },

  componentDidMount() {
    this.el = findDOMNode(this)
  },

  handleClickEdge(e) {
    if (!this.props.canOperate) {
      return
    }
    this.props.onClickEdge(this.el, this.props, e);
  },

  render() {
    return (
      <div ref="edge"
        className="canvas-edge"
        data-id={this.props.id}
        onClick={this.handleClickEdge}
        style={{
          position: 'absolute',
          zIndex: 1,
          left: this.props.x * this.props.scale + 'px',
          top: this.props.y * this.props.scale + 'px',
          width: this.props.width * this.props.scale + 'px',
          height: this.props.height * this.props.scale + 'px'
        }}>
        { this.props.chart
          ? <Chart {...this.props.chart}
            widgetId={this.props.id}
            active={this.props.active}
            klass={this.props.chart.klass}
            type={this.props.chart.klass}
            theme={this.props.chart.theme}
            register={this.register}
            styleSetting={this.props.styleSetting}
            scale={this.props.scale}
            width={this.props.width * this.props.scale}
            height={this.props.height * this.props.scale}
            line={this.props.line}
            points={this.props.points}/>
          : null }
      </div>
    )
  }
})

export default Edge
