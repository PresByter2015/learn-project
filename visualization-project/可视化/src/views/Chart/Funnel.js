import React, { Component } from 'react';
import Funnel from 'modules/chart/charts/funnel';
import { data, option, config } from 'modules/chart/themes/funnel/basic';
import Form from 'components/form/form';
import ChartContainer from './ChartContainer';

class Home extends Component {
  componentDidMount() {
    this.chart = new Funnel(option, this.refs.chart);
    this.chart.setData(data);
  }

  handleChange(name, value) {
    this.chart.setStyle(name, value);
    this.chart.flush();
  }

  render() {
    return (
      <ChartContainer
        left={<div ref="chart" style={{ width: '100%', height: 460 }}/>}
        right={<Form fields={config} onChange={this.handleChange.bind(this)}/>}
      />
    );
  }
}

export default Home;
