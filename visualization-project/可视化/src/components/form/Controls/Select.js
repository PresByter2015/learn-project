import React, { PropTypes, Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class Control extends Component {
  static propTypes = {
    value: PropTypes.string,
    initialValue: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      value: ''
    };
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
    let { options, placeholder } = this.props;
    return (
      <Select {...this.props}
              value={this.state.value}
              placeholder={placeholder}
              onChange={this.handleChange.bind(this)}>
        {
          options.map((option, index) => {
            return (
              <Option key={index} {...option} value={option.value}>
                {option.label}
              </Option>
            );
          })
        }
      </Select>
    );
  }
}

export default Control;
