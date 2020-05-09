import React, { Component } from 'react';
import Bar from 'modules/chart/charts/bar';
import { data, option, config } from 'modules/chart/themes/bar/basic';
import Form from 'components/form/form';
import ChartContainer from './ChartContainer';

class Home extends Component {
  componentDidMount() {
    this.chart = new Bar(option, this.refs.chart);
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
