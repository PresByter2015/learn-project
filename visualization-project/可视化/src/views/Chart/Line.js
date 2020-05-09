import React, { Component } from 'react'
import Form from 'components/form/form'

import Line from 'modules/chart/charts/line'
import { option, config } from 'modules/chart/themes/line/basic'

import ChartContainer from './ChartContainer.js'

export default class extends Component {
  componentDidMount() {
    this.chart = new Line(option, this.refs.chart)
  }

  handleChange(name, value) {
    this.chart.setStyle(name, value)
    this.chart.flush()
  }

  render() {
    return (
      <ChartContainer
        left={<div ref="chart" style={{ width: '100%', height: 460 }} />}
        right={<Form fields={config} onChange={this.handleChange.bind(this)} />}
      />
    )
  }
}
