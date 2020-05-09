import React, { Component } from 'react';
import Gauge from 'modules/chart/charts/gauge';
import { option, config } from 'modules/chart/themes/gauge/basic';
import StyleSettingForm from 'components/chart/StyleSettingForm';
import ChartContainer from './ChartContainer';

export default class extends Component {
  componentDidMount() {
    this.chart = new Gauge(option, this.refs.chart);
  }

  handleChange(name, value) {
    this.chart.setStyle(name, value);
    this.chart.flush();
  }

  render() {
    return (
      <ChartContainer
        left={<div ref="chart" style={{ width: '100%', height: 460 }}/>}
        right={<StyleSettingForm config={config} onChange={this.handleChange.bind(this)}/>}
      />
    );
  }
}
