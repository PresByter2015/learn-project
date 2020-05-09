import React, { Component } from 'react'
import Form from 'components/form/form'

import Pie from 'modules/chart/charts/pie'
import { option, config, data } from 'modules/chart/themes/pie/basic'

import ChartContainer from './ChartContainer'

export default class extends Component {
  componentDidMount() {
    this.chart = new Pie(option, this.refs.chart)

    this.chart.setData(data)
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
