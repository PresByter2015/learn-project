import React, { PropTypes, Component } from 'react';
import { InputNumber } from 'antd';

const DefaultProps = {
  min: -Infinity,
  max: Infinity
};

class Control extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    initialValue: PropTypes.number,
    onChange: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  componentWillMount() {
    this.setState({
      value: this.props.initialValue || this.props.value
    });
  }

  handleChange(value) {
    this.props.onChange(value);

    this.setState({ value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  render() {
    let props = { ...this.props };
    let min = typeof this.props.min === 'number'
      ? this.props.min
      : DefaultProps.min;
    let max = typeof this.props.max === 'number'
      ? this.props.max
      : DefaultProps.max;

    let { value } = this.state;

    if (value === null) {
      value = undefined;
    }

    delete props.initialValue;

    return (
      <InputNumber min={min} max={max}
                   {...props}
                   value={value}
                   onChange={this.handleChange.bind(this)}
      />
    );
  }
}

export default Control;
