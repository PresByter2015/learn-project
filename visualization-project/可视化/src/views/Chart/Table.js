import React, { Component } from 'react'
import Table from 'modules/chart/charts/table'
import { data, option, config } from 'modules/chart/themes/table/basic'
import Form from 'components/form/form'

import ChartContainer from './ChartContainer'

class Table extends Component {
  componentDidMount() {
    this.chart = new Table(option, this.refs.chart)

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

export default Table
