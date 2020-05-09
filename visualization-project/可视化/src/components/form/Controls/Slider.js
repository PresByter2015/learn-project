import React, { Component } from 'react';
import { Slider } from 'antd';

export default class extends Component {
  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    value: React.PropTypes.number,
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      value: 0
    };
  }

  componentWillMount() {
    let { value = 0 } = this.props;
    value = value > 1 ? value : (value * 100);
    this.setState({ value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(value) {
    this.props.onChange(value / 100);
    this.setState({ value });
  }

  render() {
    let { min = 0, max = 100 } = this.props;
    return (
      <Slider defaultValue={this.state.value} min={min} max={max} onChange={this.handleChange.bind(this)}/>
    );
  }

}

