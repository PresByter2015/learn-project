import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;
const defaults = {
  min: 12,
  max: 60,
  step: 2
};

class FontSizeSelect extends Component {
  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    style: React.PropTypes.object,
    value: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      value: 12
    };
  }


  componentWillMount() {
    this.setState({
      value: this.props.value
    });
  }

  handleChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  getStyle() {
    return this.props.style || {};
  }

  getOptions() {
    let min = this.props.min || defaults.min;
    let max = this.props.max || defaults.max;
    let step = this.props.step || defaults.step;

    let options = [];

    for (let i = min; i <= max; i += step) {
      let item = 36;
      if (i < 36) {
        item = i;
      }
      options.push(<Option value={`${i}`} style={{ fontSize: item }} key={i}>{i}</Option>);
    }

    return options;
  }

  render() {
    let style = this.getStyle();
    let optionsComponent = this.getOptions();

    return (
      <Select style={style}
              className="font-size-select"
              value={String(this.state.value)}
              onChange={this.handleChange.bind(this)}>
        {optionsComponent}
      </Select>
    );

  }
}

export default FontSizeSelect;
