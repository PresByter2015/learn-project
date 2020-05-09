import React, { PropTypes, Component } from 'react';
import { Checkbox } from 'antd';

export default class extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    initialValue: PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      value: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  componentWillMount() {
    this.setState({
      value: this.props.initialValue
    });
  }


  handleChange(e) {
    let value = e.target.checked;

    this.props.onChange(value);

    this.setState({ value });
  }

  render() {
    return (
      <Checkbox checked={this.state.value}
                onChange={this.handleChange.bind(this)}>
        {this.props.label}
      </Checkbox>
    );
  }
}
